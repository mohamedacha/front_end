import { useEffect, useState } from "react";
import '../../css_files/update-profaile.css';
export default function UpdateUser() {

    const [user, setUser] = useState([]);
    const [successMessage , setSuccessMessage] = useState() ;
    const [data, setData] = useState({ name: "", address: "", password: "", img: null, phone_number: "", checkbox: false, });

    //FETCH DATA AND PUT IN IN USER COMPONENT------------------------------------------------------------------------------------------------------------------
    useEffect(() => {
        const get_user = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/users/3');
                const data = await response.json();
                setUser(data.user); //
            } catch (error) {
                console.error('error message : ', error.message);
            }
        }
        get_user();
    }, []);


    //CLONE USER DATA INSIDE DATA COMPONENT THAT CONTROLE FORM DATA------------------------------------------------------------------------------------------------
    useEffect(() => {
        if (user && Object.keys(user).length > 0) { // Ensure `user` is not empty
            setData({ name: user.name || "", address: user.address || "", password: user.password || "", img: user.img || null, phone_number: user.phone_number || "", checkbox: false, });
        }
    }, [user])

    //----------------------------------------------------------------------------------------------------------------------------
    const handleChange = (e) => {
        console.log(e.target.name)
        const { name, type, value, checked, files } = e.target;

        if (type === "checkbox") {
            setData({ ...data, [name]: checked });
        } else if (type === "file") {
            setData({ ...data, img: files[0] });
        } else {
            setData({ ...data, [name]: value });
        }
    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            //CREATE A FORM DATA AND SEND IT IN POST REQUEST---------------------------------
            const formData = new FormData();
            formData.append("_method", "PUT");  // Laravel recognizes this as a PUT request
            formData.append("name", data.name);
            formData.append("address", data.address);
            formData.append("password", data.password);
            formData.append("phone_number", data.phone_number);
            
            //IF USER CHOSE TO REMOVE HIS PROFAIL IMG BY CHCKBOX------------------------------
            if (data.checkbox == true) {
                try{
                    const response = await fetch(data.default_img);
                    if (!response.ok) throw new Error("Failed to fetch default image")

                    const blob = await response.blob();
                    const defaultFile  = new File([blob], "default.png", { type: blob.type })

                    console.log(defaultFile);
                    formData.append("img", defaultFile);

                }catch(error){
                    console.error("Error fetching default image:", error);
                };
            //IF DATA.IMH IS A FILE IT CAN BE SENDED -----------------------------------------
            }else if (data.img instanceof File) {
                formData.append("img", data.img);
            }

            //SEND POST REQUEST WITH FORMDATA TO UPDATE USER ---------------------------------
            const response = await fetch('http://127.0.0.1:8000/api/users/3', {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                },
                body: formData,
            });
            const result = await response.json();
            setSuccessMessage(result.message) ;
            if (!response.ok) throw new Error('Failed to update user'); 

        } catch (error) {
            console.error('// ', error.message)
        }

        
        //-----------------------------------------------------------------
        
        
        const get_user = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/users/3');
                const data = await response.json();
                setUser(data.user);
            } catch (error) {
                console.error('error message : ', error.message);
            }
        }
        get_user();

        setData({
            name: user.name || '',
            adress: user.address || '',
            password: '',
            img: user.img,
            phone_number: user.phone_number,
            checkbox: false,
        });

    }



    return (
<>
        <div className="update_profail_message">
        {successMessage ? (
        successMessage === "User updated successfully" ? (
            <p className="update_profail_message_success">{successMessage}</p>
        ) : (
            <p className="update_profail_message_error">{successMessage}</p>
        )
        ) : null}
        </div>

        <div className="update_profail">
            <label htmlFor="img" className="update_img">
                <p> photo :</p>
                <img src={data.img || ''} />
            </label>
            <form className="right_part" onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="file" name="img" id="img" onChange={handleChange} />

                <label htmlFor="name">name :</label>
                <input type='text' name='name' id="name" className="username" onChange={handleChange} value={data.name} />

                <label htmlFor="password">password : </label>
                <input type='password' name='password' id='password' className="password" onChange={handleChange} value={data.password} />

                <label htmlFor="address">adress : </label>
                <input type='text' name='address' id='address' className="address" onChange={handleChange} value={data.address} />

                <label htmlFor="userphone_number"> phone number : </label>
                <input type='text' name='phone_number' className="userphone_number" id="userphone_number" onChange={handleChange} value={data.phone_number} />

                <label htmlFor="checkbox" className="checkbox">
                    <span>remove my profaile img :</span>
                    <input type="checkbox" id='checkbox' name='checkbox' onChange={handleChange} checked={data.checkbox} />
                </label>

                <button type="submit" >update</button>

            </form>
        </div>

        </>

    )

}