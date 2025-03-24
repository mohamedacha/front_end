import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../App";
// import "../../css_files/productDetails.css";

const Update_order = () => {

    const [order , setOrder] =  useState({product_name : "fetching name ..." , quantity: 0})
    const [errorMessage , setErrorMessage] =useState('') ;
    const [successMessage , setSuccessMessage] =useState('') ;
    const { id } = useParams();
    const token = useContext(AppContext)

    useEffect(()=>{
        const get_Order = async()=>{
            try{

                const respons = await fetch(`http://127.0.0.1:8000/api/orders/${id}` , {
                    headers:{
                        'Accept' : 'Application/json' ,
                        "Authorization" : `Bearer ${token}`
                    }
                });
                const data = await respons.json();
                setOrder(data);
                console.log(data);
                if(!respons.ok) console.error(data.message)
                
            }catch(error){console.error(error.message) ;}
        }
        get_Order()
    },[])

    const handlSubmit =async(e)=>{
        e.preventDefault()
        try{
            const formData = new FormData() ;
            formData.append('quantity', order.quantity) ;
            formData.append('_method', 'PUT') ;

            const response = await fetch(`http://127.0.0.1:8000/api/orders/${id}`, {
                method : 'POST' ,
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body : formData ,
            })
            const data = await response.json() ;
            if(response.ok){
                console.log(data)
                setSuccessMessage(data.message)
                setErrorMessage('');
                setOrder(oldData =>({
                    ...oldData,
                    ...data
                }))
            }else {
                console.log(data.errors.quantity)
                setSuccessMessage('')
                setErrorMessage(data.errors.quantity);
            };

        }catch(e){
            console.error('fail fetching : ' , e.message)
        }
    }
    const handlChange = (e)=>{
        console.log({ [e.target.name] : e.target.value})
        setOrder({...order, [e.target.name] : e.target.value})
    }


    return (
        <div className="Update_order">
            
            <div className="product-content">
                <h2 className="product-title">{order.product_name}</h2>
                <div className="product-info">
                    <h3 className="section-title">Description: {order.description}</h3>
                    <form className="cart-section" onSubmit={handlSubmit}>
                        <input type="number" name="quantity" value={order.quantity} onChange={handlChange} className="quantity-input"/>
                        <button className="add-to-cart-button">confirm</button>
                    </form>
                    <p className="error_message">{errorMessage}</p>
                    <p className="success_message">{successMessage}</p>
                </div>
            </div>
            <img className="product-img" src={order.img} alt="" />
        </div>
    );
};

export default Update_order;
