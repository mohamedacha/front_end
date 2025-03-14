
// import '../../css_files/ProductCard.css'
// import { useState } from 'react'



export default function ServiceCard(props){
    const service = props.service
    const key = props.key

    const handlClick = ()=>{
        // product show 
    }

    return(
        <div onClick={handlClick()} className="serviceCard" key={key}>
            <span className="serviceTitle">{service.type}</span>
            <img src= {service.img} alt="" />
            <p className="serviceDescription">{service.description}</p>
            <hr />
        </div>
    )
}