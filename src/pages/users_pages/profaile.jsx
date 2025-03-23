import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import '../../css_files/profaile.css'
import { AppContext } from "../../App";

export default function Profaile() {

    const [user, setUser] = useState([]);
    const navigate = useNavigate();
    const {token ,updateToken} = useContext(AppContext) ;

    const logOut = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/users/logout", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json",
                },
            });

            if (response.ok) {
                localStorage.removeItem("authToken");
                localStorage.removeItem("userId");
                updateToken('') ;
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
                // const response = await fetch(`http://127.0.0.1:8000/api/users/34}`, {
                const response = await fetch(`http://127.0.0.1:8000/api/users/${localStorage.getItem('userId')}`, {
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
                <Link to={`/users/update`} className="update"> update</Link>
                <a className="logout" onClick={logOut}> log out</a>
            </div>
        </div>
    )

}