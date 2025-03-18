import { useEffect, useState } from "react";
import '../../css_files/update_user.css';
export default function UpdateUser() {

    const [user, setUser] = useState([]);
    const [errors , setErrors] = useState();
    const [data, setData] = useState({ name: '' , address: "", password: "", img: null, phone_number: "", checkbox: false, });

    //FETCH DATA AND PUT IN IN USER COMPONENT------------------------------------------------------------------------------------------------------------------
    useEffect(() => {
        const get_user = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/users/1');
                const data = await response.json();
                console.log(data.user.img)
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
            setData(oldparam => ({
                ...oldparam ,
                ...user ,
                checkbox : false
            }))
            // setData({ name: user.name || "", address: user.address || "", password: user.password || "", img: user.img || null, phone_number: user.phone_number || "", checkbox: false, });
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
            formData.append("remove_img", data.checkbox );
            if (data.img instanceof File ) {formData.append("img", data.img);}
            
        //SEND POST REQUEST WITH FORMDATA TO UPDATE USER ---------------------------------
            const response = await fetch('http://127.0.0.1:8000/api/users/1', {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                },
                body: formData,
            });
            const result = await response.json().catch(()=>null);

            if (!response.ok) {
                setErrors({});
                // If response is not OK, check if it has validation errors
                if (result && result.errors) {
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        ...result.errors, // This merges all error messages at once
                    }));
                }
                throw new Error(result?.message || "Failed to update user");
            }else{
                setErrors({message :result.message  });
            }


        } catch (error) {
            console.error('// ', error.message)
        }

        
        //-----------------------------------------------------------------
        
        
        const get_user = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/users/1');
                const data = await response.json();
                setUser(data.user);

                setData({
                    name: data.user.name || '',
                    adress: data.user.address || '',
                    password: '',
                    img: data.user.img,
                    phone_number: data.user.phone_number,
                    checkbox: false,
                });

            } catch (error) {
                console.error('error message : ', error.message);
            }
        }
        get_user();
    }
    const desepere = ()=>{
        setTimeout(() => {
            setErrors({message : ''})
        }, 2000);
    }


    return (
<>
        <div className="update_profail_message">
        {errors &&<>
        {errors.message && 
        <>
            <p className="update_profail_message_success">{errors.message}</p>
            {desepere()}
        </>}
        </>}

        </div>

        <div className="update_profail">
            <label htmlFor="img" className="update_img">
                <p> photo :</p>
                <img src={data.img || ''} />
                {errors && <>{errors.img &&<p className="update_profail_message_error"  >{errors.img}</p>}</>}
            </label>
            <form className="right_part" onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="file" name="img" id="img" onChange={handleChange} />

                <label htmlFor="name">name :</label>
                <input type='text' name='name' id="name" className="username" onChange={handleChange} value={data.name} />
                {errors && <>{errors.name &&<p className="update_profail_message_error"  >{errors.name}</p>}</>}

                <label htmlFor="password">password : </label>
                <input type='password' name='password' id='password' className="password" onChange={handleChange} value={data.password} />
                {errors && <>{errors.password &&<p className="update_profail_message_error"  >{errors.password}</p>}</>}

                <label htmlFor="address">adress : </label>
                <input type='text' name='address' id='address' className="address" onChange={handleChange} value={data.address} />
                {errors && <>{errors.address &&<p className="update_profail_message_error"  >{errors.address}</p>}</>}

                <label htmlFor="userphone_number"> phone number : </label>
                <input type='text' name='phone_number' className="userphone_number" id="userphone_number" onChange={handleChange} value={data.phone_number} />
                {errors && <>{errors.phone_number &&<p className="update_profail_message_error"  >{errors.phone_number}</p>}</>}

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