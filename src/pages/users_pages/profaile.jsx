import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import '../../css_files/profaile.css'

export default function Profaile(){
    
    const [user , setUser] = useState([]) ;
    const {id} = useParams();

    const logOut=()=>{
        //log out
    }

    useEffect(()=>{
        const get_user = async()=>{
            try{
                const response = await fetch(`http://127.0.0.1:8000/api/users/${id}`);
                const data = await response.json();
                setUser(data.user); 
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
                <Link to ={`/users/update/${id}`} className="update"> update</Link>
                <Link to ='/users/create' className="logout" onClick={logOut()}> log out</Link>
            </div>
        </div>
    )

}