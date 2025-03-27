import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import '../../css_files/profaile.css'
import { AppContext } from "../../App";

export default function Profaile() {

    const [user, setUser] = useState([]);
    const navigate = useNavigate();
    const { updateProfail, token, updateToken } = useContext(AppContext);
    const delete_storage = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("authUser");
        updateToken('');
        updateProfail('');
        navigate(`/users/login`)

    }
    const logOut = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/users/logout", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json",
                },
            });

            if (response.ok) { delete_storage() }
            else {
                console.error("Logout failed", await response.json());
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    }

    useEffect(() => {
        if (!token) navigate('/users/login');
        const get_user = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/users/${JSON.parse(localStorage.getItem('authUser')).id}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Accept": "application/json",
                    },
                });

                const data = await response.json();
                if (response.ok) setUser(data.user)
                else if (data.message == 'User not found' || data.message == "Unauthenticated.") delete_storage()
            } catch (error) { console.error('error message : ', error.message) }
        }
        get_user();
    }, []);

    return (
        <div className="profail">
            <img src={user.img} alt="profail" />
            <div className="right_part">
                <span className="username">{user.name}</span>
                <span className="useremail">{user.email}</span>
                <span className="userphone_number">{user.phone_number}</span>
                <Link to={`/users/update`} className="update"> update</Link>
                <a className="logout" onClick={logOut}> log out</a>
            </div>
        </div>
    )

}