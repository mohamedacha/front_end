import { useState, useEffect } from "react";
import "../../css_files/addservice.css"; // Import the CSS file

const AddService = ({ existingService, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Pre-fill form when updating
  useEffect(() => {
    if (existingService) {
      setFormData({
        name: existingService.name || "",
        description: existingService.description || "",
        image: existingService.image || null,
      });
    }
  }, [existingService]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (existingService) {
      await handleUpdate();
    } else {
      await handleAdd();
    }

    setLoading(false);
  };

  const handleAdd = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      const response = await fetch("http://127.0.0.1:8000/api/services", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) throw new Error("Failed to add service");

      const data = await response.json();
      setMessage("Service added successfully!");
      onSave(data);
    } catch (error) {
      setMessage("Error adding service.");
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }
      formDataToSend.append("_method", "PUT"); // Laravel requires this for PUT

      const response = await fetch(`http://127.0.0.1:8000/api/services/${existingService.id}`, {
        method: "POST", // Using POST with _method PUT for Laravel
        body: formDataToSend,
      });

      if (!response.ok) throw new Error("Failed to update service");

      const data = await response.json();
      setMessage("Service updated successfully!");
      onSave(data);
    } catch (error) {
      setMessage("Error updating service.");
      console.error(error);
    }
  };

  return (
    <div className="add-service-container">
      <h2>{existingService ? "Update Service" : "Add Service"}</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="service-form">
        <div className="form-row">
          <div className="form-group">
            <label>Service Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Upload Image:</label>
            <input type="file" name="image" accept="image/*" onChange={handleFileChange} />
          </div>
        </div>

        <div className="form-group">
          <label>Service Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : existingService ? "Update Service" : "Add Service"}
        </button>
      </form>
    </div>
  );
};

export default AddService;
