import { useContext, useEffect, useState } from "react";
import "../../css_files/addservice.css";
import { AppContext } from "../../App";
import { useNavigate, useParams } from "react-router-dom";

const UpdateService = () => {
  const { token } = useContext(AppContext)
  const [errors, setErrors] = useState();
  const Navigate = useNavigate();
  const {id} = useParams();
  
  const [formData, setFormData] = useState({
    service_name: "",
    available: true,
    description: "",
    img: null,
  });

  useEffect(()=>{
    const get_service = async ()=>{
      const response = await fetch(`http://127.0.0.1:8000/api/services/${id}`);
      const data = await response.json() ;
      console.log('effect' ,data.data)
      setFormData({...data.data})
    }
    get_service()
  },[])

  const createFormData =()=>{
    const formDataToSend = new FormData();
    formDataToSend.append('_method' , 'PUt') ;
    formDataToSend.append("service_name", formData.service_name.trim());
    formDataToSend.append("available", formData.available ? 1 : 0);
    formDataToSend.append("description", formData.description.trim());
    if (formData.img instanceof File) {
      formDataToSend.append("img", formData.img);
    }
    return formDataToSend ;

  };

  const handleChange = (e) => {
    const { name, value , checked } = e.target;
    if(name === 'available'){
      setFormData({ ...formData, [name]: checked });
    }else{
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, img: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const response = await fetch(`http://127.0.0.1:8000/api/services/${id}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: createFormData(),
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid response from server");
      }

      const data = await response.json();
      console.log('after update' , data)
      
      if (!response.ok) {
        setErrors({...data.errors})
        throw new Error(data.message || "Failed to update service");
      }else{
        sessionStorage.setItem('message' ,"Service updated successfully!")
        Navigate(`/services/show/${id}`) ;
      }
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };

  return (
    <div className="add-service-page">

      <div className="add-service-container">
        <h2>add service</h2>
        <hr />
        <form onSubmit={handleSubmit} className="service-form">
          <section className="inputs_section">
            <section className="left_part">

              <span>service name:</span>
              <input type="text" name="service_name" value={formData.service_name} onChange={handleChange} required />
              {errors && errors.service_name && (<p className="error_message">{errors.service_name}</p>)}

              <span>description:</span>
              <textarea name="description" value={formData.description} onChange={handleChange} />
              {errors && errors.description && (<p className="error_message">{errors.description}</p>)}

              <span>img</span>
              <label className="img" htmlFor="img_create_service"><span>+</span></label>
              <input className="img_file_input" type="file" name="image" id="img_create_service" accept="image/*" onChange={handleFileChange} />
              {errors && errors.img && (<p className="error_message">{errors.img}</p>)}

              <label htmlFor="checkbox" className="checkbox">
                <span>available:</span>
                <input type="checkbox" name='available' onChange={handleChange} checked={formData.available} />
              </label>

            </section>

          </section>


          <button type="submit">save</button>
        </form>
      </div>
    </div>

  );
};

export default UpdateService;
