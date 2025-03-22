import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import '../../css_files/profaile.css'

export default function Profaile() {
    const token = localStorage.getItem("authToken");
    console.log(token)
    const [user, setUser] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    if (!token) navigate('/users/login') ;

    const logOut = async () => {
        // const token = localStorage.getItem("authToken");

        if (!token) {
            console.error("No token found, user is not logged in");
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:8000/api/users/logout", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json",
                },
            });

            if (response.ok) {
                localStorage.removeItem("authToken"); // Clear token from storage
                console.log("Logged out successfully");
                navigate(`/users/login`)

            } else {
                console.error("Logout failed", await response.json());
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
        //log out
    }

    useEffect(() => {
        if (!token) navigate('/users/login') ;
        const get_user = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/users/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Accept": "application/json",
                    },
                });
                const data = await response.json();
                setUser(data.user);
                console.log(data);
            } catch (error) {
                console.error('error message : ', error.message);
            }
        }
        get_user();
    }
        , []);

    return (
        <div className="profail">
            <img src={user.img} alt="profail" />
            <div className="right_part">
                <span className="username">{user.name}</span>
                <span className="useremail">{user.email}</span>
                <span className="userphone_number">{user.phone_number}</span>
                <Link to={`/users/update/${id}`} className="update"> update</Link>
                <a className="logout" onClick={logOut}> log out</a>
            </div>
        </div>
    )

}