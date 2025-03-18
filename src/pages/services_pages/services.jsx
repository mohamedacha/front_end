


import { useEffect, useState } from "react";
import ServiceCard from "./serviceCard";
import '../../css_files/services.css';
import { Link } from "react-router-dom";


export default function Services() {
    const [services, setServices] = useState([])

    useEffect(() => {
        const get_services = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/services');
                const data = await response.json();
                console.log(data)
                setServices(data.data);
            }
            catch (error) {
                console.error('error fetching services : ', error)
            }
        };
        get_services();
    }, []);

    return (

        <div className="services_index_page">
            {services.map((service, index) => (
                <Link className='service' key={index} to={`show/${service.id}`}>
                    <h2 className="service-title">{service.type}</h2>
                    <img className="product-img" src={service.img} alt="" />
                </Link>
            ))}
        </div>

    );
}