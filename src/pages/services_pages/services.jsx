


import { useEffect, useState } from "react";
import ServiceCard from "./serviceCard";
import '../../css_files/products.css' ;


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

        <div className="services">

            {services.map((service, index) => (
                <ServiceCard key={index} service={service} />
            ))}
        </div>

    );
}