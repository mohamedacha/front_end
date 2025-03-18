import React, { useEffect, useState } from "react";
import "../../css_files/ServiceCards.css"; // Import the CSS file
import { useParams } from "react-router-dom";

const ServiceCard = () => {
  const [service, setService] = useState({ description: '' });
  const {id} = useParams();

  useEffect(() => {
    const get_service = async () => {

      try {
        const response = await fetch(`http://127.0.0.1:8000/api/services/${id}`);
        const data = await response.json();
        console.log(data.data);
        setService(prevData => ({ ...prevData, ...data.data }))
      } catch (e) {
        console.error('fail fetching : ', e.message)
      }
    }
    get_service()
  }, []);

  


  return (
    <div className="service_Container">

      <div className="service-info">
        <h2 className="service-title">{service.type}</h2>
        <span>Description:</span>
        <br />
        <h3 className="service-description">{service.description}</h3>
        <hr />
        <span>contact us:</span>
        <div className="contact">
          phone :
          <br />
          mail :
        </div>
      </div>
      <img className="product-img" src={service.img} alt="" />
      

    </div>
  );
};

export default ServiceCard;
