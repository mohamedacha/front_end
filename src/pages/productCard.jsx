
import '../css_files/ProductCard.css'
// import { useState } from 'react'



export default function ProductCard(props){
    const product = props.product
    const key = props.key

    const handlClick = ()=>{
        // product show 
    }

    return(
        <div onClick={handlClick()} className="productCard" key={key}>
            <span className="productprice">{product.price} DH</span>
            <img src= {product.img} alt="productImg" />
            <span className="quantity"> {product.quantity}</span>
            <p className="productName">{product.product_name}</p>
        </div>
    )
}