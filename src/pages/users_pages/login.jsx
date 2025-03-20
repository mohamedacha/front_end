import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import '../../css_files/login.css'

export default function Login() {

    const [errors, setErrors] = useState();
    const [user, setUser] = useState({email : "" , password : ""});
    const navigate = useNavigate() ;

    const handleChange = (e) => { 
        setUser({...user, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault() ;
        const getUser = async () => {
            
            try {
                const formData = new FormData();
                formData.append('email', user.email);
                formData.append('password', user.password);

                const response = await fetch('http://127.0.0.1:8000/api/users/login', {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                    },
                    body: formData,
                });

                const result = await response.json();
                if (!response.ok) {
                    setErrors({})
                    if (result && result.errors) {
                        setErrors(prevErrors => ({
                            ...prevErrors,
                            ...result.errors,
                        }));
                    }
                    throw new Error(result?.message || "Failed to create user");
                } else {
                    navigate(`/users/show/${result.user.id}`)
                }
            } catch (e) {
                console.error('error message ', e.message);
            }
        }
        getUser() ;
    }

    return (
        <form className="login_form" onSubmit={handleSubmit} encType="multipart/form-data">

            <label htmlFor="name">email :</label>
            <input type='text' name='email' id="email" className="useremail" onChange={handleChange} value={user.email} />
            {errors && <>{errors.email && <p className="message_error"  >{errors.email}</p>}</>}

            <label htmlFor="password">password : </label>
            <input type='password' name='password' id='password' className="password" onChange={handleChange} value={user.password} />
            {errors && <>{errors.password && <p className="message_error"  >{errors.password}</p>}</>}

            <button type="submit" >continue</button>

            <Link to={`/users/create`} className="create"> create an account</Link>


        </form>
    )
}