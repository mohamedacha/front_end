import React from "react";
import "../../css_files/ServiceCards.css"; // Import the CSS file

const services = [
  {
    id: 1,
    title: "description",
    image: "https://via.placeholder.com/150", // Replace with your actual image
  },
  {
    id: 2,
    title: "carrelage",
    image: "", // Replace with your actual image
  },
  {
    id: 3,
    title: "electricite",
    image: "https://via.placeholder.com/150", // Replace with your actual image
  },
];

const ServiceCard = () => {
  return (
    <div className="services-container">
      {services.map((service) => (
        <div key={service.id} className="service-card">
          <img src={service.image} alt={service.title} className="service-image" />
          <p className="service-title">{service.title} :</p>
        </div>
      ))}
    </div>
  );
};

export default ServiceCard;
