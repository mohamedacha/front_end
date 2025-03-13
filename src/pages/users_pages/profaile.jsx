import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../../css_files/profaile.css'

export default function Profaile(){
    
    const [user , setUser] = useState([]) ;

    const logOut=()=>{
        //log out
    }

    useEffect(()=>{
        const get_user = async()=>{
            try{
                const response = await fetch('http://127.0.0.1:8000/api/users/1');
                const data = await response.json();
                setUser(data); 
                console.log(data);
            }catch(error){
                console.error('error message : ' , error.message ); 
            }
        }
        get_user();
        }
    ,[]);

    return(
        <div className="profail">
            <img src={user.img} alt="profail" />
            <div className="right_part">
                <span className="username">{user.name}</span>
                <span className="useremail">{user.email}</span>
                <span className="userphone_number">{user.phone_number}</span>
                <Link to ='/users/update' className="update"> update</Link>
                <Link to ='/' className="logout" onClick={logOut()}> log out</Link>
            </div>
        </div>
    )

}