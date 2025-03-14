import { useEffect, useState } from "react";
import '../../css_files/update-profaile.css';
export default function UpdateUser(){
    
    const [user , setUser] = useState([]) ;
    const [data , setData] = useState({name : "" ,adress : "" ,password : "" ,img : null ,phone_number: "" ,checkbox : false ,}) ;

    //----------------------------------------------------------------------------------------------------------------------------

    useEffect(()=>{
        const get_user = async()=>{
            try{
                const response = await fetch('http://127.0.0.1:8000/api/users/1');
                const data = await response.json();
                setUser(data); 
            }catch(error){
                console.error('error message : ' , error.message ); 
            }
        }
        get_user();
    }, []);

    //----------------------------------------------------------------------------------------------------------------------------

    useEffect(()=>{
        if(user && Object.keys(user).length > 0){ // Ensure `user` is not empty
            setData({name : user.name || "" ,adress : user.adress || "" ,password : user.password || "" ,img : user.img ||null ,phone_number: user.phone_number || "" ,checkbox : false ,}) ;
        }
    } ,[user])

    //----------------------------------------------------------------------------------------------------------------------------

    const handleChange =(e)=>{
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
    
    const handleSubmit = async (e)=>{

        e.preventDefault();
        try{

            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("adress", data.adress);
            formData.append("password", data.password);
            formData.append("phone_number", data.phone_number);
            if(!data.checkbox && data.img){
                formData.append("img", data.img);
            }
            console.log('formData : ' , formData)

            const response = await fetch('http://127.0.0.1:8000/api/users/1' ,{
                method : "PUT" ,
                body : formData ,
            }) ;

            if(!response.ok){throw new Error('Failed to update user') ;}

            const result = await response.json();
            alert(result.message) ;
            console.log(result.data)

        }catch(error){
            console.error( '// ' , error.message)
        }

        // setData({
        //     name : user.name ,
        //     adress : user.adress ,
        //     password : '' ,
        //     img : user.img ,
        //     phone_number: user.phone_number ,
        //     checkbox : false ,
        // }) ;
        
    }



    return(
        
        <div className="update_profail">
                <label htmlFor="img" className="update_img">
                    <img src={data.img || ''} />
                </label>
            <form className="right_part" onSubmit={handleSubmit}>

                <input type="file"  name="img" id="img" onChange={handleChange}/>

                <label htmlFor="name">name :</label>
                <input type = 'text' name ='name' id="name" className="username"  onChange={handleChange} value={data.name}/>
                
                <label htmlFor="password">password : </label>
                <input type = 'password' name ='password' id ='password' className="password"  onChange={handleChange} value={data.password}/>

                <label htmlFor="adress">adress : </label>
                <input type = 'text' name ='adress' id ='adress' className="adress"  onChange={handleChange} value={data.adress}/>
                
                <label htmlFor="userphone_number"> phone number : </label>
                <input type = 'text' name ='phone_number' className="userphone_number" id="userphone_number"  onChange={handleChange} value={data.phone_number}/>
                
                <label htmlFor="checkbox" className="checkbox">
                    <span>remove my profaile img :</span>
                    <input type="checkbox" id='checkbox' name ='checkbox' onChange={handleChange} checked={data.checked}/>
                </label>

                <button type="submit" >update</button>

            </form>
        </div>
    )

}