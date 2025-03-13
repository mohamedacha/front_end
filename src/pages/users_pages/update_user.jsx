import { useEffect, useState } from "react";
import '../../css_files/update-profaile.css';
export default function UpdateUser(){
    
    const [user , setUser] = useState([]) ;
    const [data , setData] = useState({
        name : null ,
        password : null ,
        img : null ,
        phone_number: null ,
        checkbox : false ,
    }) ;

    const handleChange =(e)=>{
        console.log(e.target.name)
        e.target.name == 'checkbox' ? setData({ ...data , [e.target.name] : e.target.checked }) : setData({ ...data , [e.target.name] : e.target.value })
    }
    
    const handleSubmit =(e)=>{
        e.preventDefault();
        console.log(data)
        //not completed yet
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
        
        <div className="update_profail">
                <label htmlFor="img" className="update_img">
                    <img src={user.img} />
                </label>
            <form className="right_part" onSubmit={handleSubmit}>

                <input type="file"  name="img" id="img" onChange={handleChange} value={data.img}/>

                <label htmlFor="name">name :</label>
                <input type = 'text' name ='name' id="name" className="username" placeholder = {user.name} onChange={handleChange} value={data.name}/>
                
                <label htmlFor="password">password : </label>
                <input type = 'password' name ='password' id ='password' className="password" placeholder = {user.password} onChange={handleChange} value={data.password}/>
                
                <label htmlFor="userphone_number"> phone number : </label>
                <input type = 'text' name ='phone_number' className="userphone_number" id="userphone_number" placeholder = {user.phone_number} onChange={handleChange} value={data.phone_number}/>
                
                <label htmlFor="checkbox" className="checkbox">
                    <span>remove my profaile img :</span>
                    <input type="checkbox" id='checkbox' name ='checkbox' onChange={handleChange} value={data.checked}/>
                </label>

                <button type="submit" >update</button>

            </form>
        </div>
    )

}