import { useContext, useEffect, useState } from "react";
import '../../css_files/update_user.css';
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
export default function UpdateUser() {

    const [data, setData] = useState({ name: '', address: "", password: "", img: null, phone_number: "", checkbox: false, });
    const [errors, setErrors] = useState();
    const navigate = useNavigate();
    const { token, updateProfail } = useContext(AppContext);

    //CREATE DATA WITH TYPE FORM-DATA TO SEND IN REQUEST ------------------------------------------------------------------------------------------------------
    const create_form_data = () => {
        const formData = new FormData();
        formData.append("_method", "PUT");  // Laravel recognizes this as a PUT request
        formData.append("name", data.name);
        formData.append("address", data.address);
        formData.append("phone_number", data.phone_number);
        formData.append("remove_img", data.checkbox);
        if (data.password && data.password.trim().length >= 1) {
            formData.append("password", data.password.trim());
        } else {
            formData.delete("password"); // Ensures it's not sent if empty
        }
        console.log(data.password.trim())
        if (data.img instanceof File) { formData.append("img", data.img); }
        return formData

    }

    //FETCH USER INF AND PUT IT IN USER COMPONENT------------------------------------------------------------------------------------------------------------------
    useEffect(() => {
        const get_user = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/users/${JSON.parse(localStorage.getItem('authUser')).id}`, {
                    headers: {
                        'Accept': 'application/json',
                        'authorization': `Bearer ${token}`
                    }
                });
                const fetcheddata = await response.json();
                setData((prev) => ({ ...prev, ...fetcheddata.user }));

            } catch (error) {
                console.error('error message : ', error.message);
            }
        }
        get_user();
    }, []);

    const handleChange = (e) => {
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
            //SEND POST REQUEST WITH FORMDATA TO UPDATE USER ---------------------------------
            const response = await fetch(`http://127.0.0.1:8000/api/users/${JSON.parse(localStorage.getItem('authUser')).id}`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    'authorization': `Bearer ${token}`
                },
                body: create_form_data(),
            });
            const result = await response.json().catch(() => null);

            if (!response.ok) {
                setErrors({});

                if (result && result.errors) {
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        ...result.errors,
                    }));
                }
                throw new Error(result?.message || "Failed to update user");
            } else {
                localStorage.setItem('authUser', JSON.stringify(result.data))
                updateProfail(result.data.img)
                navigate(`/users/show`)
            }


        } catch (error) {
            console.error('// ', error.message)
        }


    }



    return (
        <div className="update_profail_container">
            <div className="update_profail">
                <label htmlFor="img" className="update_img">
                    <p> photo :</p>
                    <div className="img">
                        <img src={data.img || ''} />

                    </div>
                    {errors && <>{errors.img && <p className="update_profail_message_error"  >{errors.img}</p>}</>}
                </label>
                <form className="right_part" onSubmit={handleSubmit} encType="multipart/form-data">
                    <input type="file" name="img" id="img" onChange={handleChange} />

                    <label htmlFor="name">name :</label>
                    <input type='text' name='name' onChange={handleChange} value={data.name} />
                    {errors && <>{errors.name && <p className="update_profail_message_error"  >{errors.name}</p>}</>}

                    <label htmlFor="password">password : </label>
                    <input type='password' name='password' onChange={handleChange} value={data.password} />
                    {errors && <>{errors.password && <p className="update_profail_message_error"  >{errors.password}</p>}</>}

                    <label htmlFor="address">adress : </label>
                    <input type='text' name='address' onChange={handleChange} value={data.address} />
                    {errors && <>{errors.address && <p className="update_profail_message_error"  >{errors.address}</p>}</>}

                    <label htmlFor="userphone_number"> phone number : </label>
                    <input type='text' name='phone_number' onChange={handleChange} value={data.phone_number} />
                    {errors && <>{errors.phone_number && <p className="update_profail_message_error"  >{errors.phone_number}</p>}</>}

                    <label htmlFor="checkbox" className="checkbox">
                        <span>remove my profaile img :</span>
                        <input type="checkbox" name='checkbox' onChange={handleChange} checked={data.checkbox} />
                    </label>

                    <button type="submit" >update</button>

                </form>
            </div>

        </div>

    )

}