import React, { useCallback, useContext, useEffect, useState } from "react";
import "../../css_files/ServiceCards.css"; // Import the CSS file
import { useParams } from "react-router-dom";
import { ReactComponent as Mail } from "../../svg/maile.svg";
import { ReactComponent as CustomerService } from "../../svg/customer-service.svg";
import { AddButton, AdminUI, AppContext } from "../../App";

const ServiceCard = () => {
  const [service, setService] = useState({ description: '' });
  const { id } = useParams();
  const { admin, token } = useContext(AppContext)

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
    <div className="service_show_container">
      
      <div className="AddButton">
        {admin ? (
          <AddButton added_element_name='service' navigate='/services/create' />
        ) : ('')}
      </div>


      <div className="service_Container">

        <div className="service-info">
          <h2 className="service-title">{service.type}</h2>
          <span>Description:</span>
          <br />
          <p className="service-description">{service.description}</p>
          <hr />
          {!admin ? (
            <>
              <span>contact us:</span>
              <div className="contact">
                <div className="conta_CustomerService">
                  <CustomerService width={45} height={45} />
                  <p className="contact_info">+121655050249</p>
                </div>
                <div className="contact_mail">
                  <Mail width={47} height={40} />
                  <p className="contact_info">sufridis@gmail.com</p>
                </div>
              </div>
            </>
          ) : (
            <AdminUI deleteAPI={`services/${service.id}`} token={token} backToPreviousPage='/services' navigateUpdateItem={`/services/update/${service.id}`} />
          )}

        </div>
        <div className="img_container">
          <img className="service_img" src={service.img} alt="" />
        </div>


      </div>
    </div>

  );
};

export default ServiceCard;
