import { useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as AddIcon } from '../../svg/add.svg';


export default function CreateUser() {


    const [user, setUser] = useState({ name: '', address: "", password: "", img: null, phone_number: "", email: '', });

    const [errors, setErrors] = useState();


    const handleChange = (e) => {
        console.log(e.target.name)
        const { name, type, value, files } = e.target;

        if (type === "file") {
            setUser({ ...user, img: files[0] });
        } else {
            setUser({ ...user, [name]: value });
        }
    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            //CREATE A FORM DATA AND SEND IT IN POST REQUEST---------------------------------
            const formData = new FormData();
            console.log(user)
            formData.append("name", user.name);
            formData.append("email", user.email);
            formData.append("password", user.password);
            formData.append("address", user.address);
            formData.append("phone_number", user.phone_number);
            console.log('f', formData)
            if (user.img instanceof File) { formData.append("img", user.img); }

            //SEND POST REQUEST WITH FORMDATA TO UPDATE USER ---------------------------------
            const response = await fetch('http://127.0.0.1:8000/api/users', {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                },
                body: formData,
            });
            const result = await response.json().catch(() => null);
            if (!response.ok) {
                console.log(result)
                setErrors({});
                // If response is not OK, check if it has validation errors
                if (result && result.errors) {
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        ...result.errors, // This merges all error messages at once
                    }));
                }
                throw new Error(result?.message || "Failed to create user");
            } else { setErrors({ message: result.message }); }


        } catch (error) { console.error('// ', error.message) }
    }

    const desepere =()=>{
        setTimeout(() => {
            setErrors({message : ''})
        }, 2000);
    }

    return (

        <>
            <div className="update_profail_message">
                {errors && <>
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
                    {<AddIcon className="img" />}
                    {errors && <>{errors.img && <p className="update_profail_message_error"  >{errors.img}</p>}</>}
                </label>
                <form className="right_part" onSubmit={handleSubmit} encType="multipart/form-data">
                    <input type="file" name="img" id="img" onChange={handleChange} />

                    <label htmlFor="name">name :</label>
                    <input type='text' name='name' id="name" className="username" onChange={handleChange} value={user.name || ''} />
                    {errors && <>{errors.name && <p className="update_profail_message_error"  >{errors.name}</p>}</>}

                    <label htmlFor="email">email :</label>
                    <input type='email' name='email' id="email" className="useremail" onChange={handleChange} value={user.email || ''} />
                    {errors && <>{errors.email && <p className="update_profail_message_error"  >{errors.email}</p>}</>}

                    <label htmlFor="password">password : </label>
                    <input type='password' name='password' id='password' className="password" onChange={handleChange} value={user.password || ''} />
                    {errors && <>{errors.password && <p className="update_profail_message_error"  >{errors.password}</p>}</>}

                    <label htmlFor="address">adress : </label>
                    <input type='text' name='address' id='address' className="address" onChange={handleChange} value={user.address || ''} />
                    {errors && <>{errors.address && <p className="update_profail_message_error"  >{errors.address}</p>}</>}

                    <label htmlFor="userphone_number"> phone number : </label>
                    <input type='text' name='phone_number' className="userphone_number" id="userphone_number" onChange={handleChange} value={user.phone_number || ''} />
                    {errors && <>{errors.phone_number && <p className="update_profail_message_error"  >{errors.phone_number}</p>}</>}


                    <button type="submit" >create</button>
                    <span><Link to=''>i alredy have an account</Link></span>
                </form>
            </div>
        </>
    )
}