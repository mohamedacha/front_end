import { useContext, useState } from "react";
import "../../css_files/addservice.css";
import { AppContext } from "../../App";

const AddService = () => {
  const {token} = useContext(AppContext)
  const [formData, setFormData] = useState({
    type: "",
    available: false,
    description: "",
    img: null,
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, img: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const formDataToSend = new FormData();
  formDataToSend.append("type", formData.type);
  formDataToSend.append("available", formData.available === "yes" ? 1 : 0);
  formDataToSend.append("description", formData.description);
  if (formData.img instanceof File) {
    formDataToSend.append("img", formData.img);
  }

  try {
    const response = await fetch("http://127.0.0.1:8000/api/services", {
      method: "POST",
      headers:{
        "Authorization" : `Bearer ${token}` ,
      },
      body: formDataToSend,
    });

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Invalid response from server");
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to add service");
    }

    alert("Service added successfully!");
    console.log("Success:", data);
  } catch (error) {
    console.error("Error adding service:", error);
    alert("Error adding service: " + error.message);
  }
};

  return (
    <div className="add-service-container">
      <h2>add service</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} className="service-form">
        <div className="form-group">
          <label>Service Type:</label>
          <input type="text" name="type" value={formData.type} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Available:</label>
          <select name="available" value={formData.available} onChange={handleChange} required>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>

        <div className="form-group">
          <label>Service Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required></textarea>
        </div>

        <div className="form-group">
          <label>Upload Image:</label>
          <input type="file" name="img" accept="image/*" onChange={handleFileChange} />
        </div>

        <button type="submit">Add Service</button>
      </form>
    </div>
  );
};

export default AddService;
