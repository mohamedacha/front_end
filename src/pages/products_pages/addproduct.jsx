import { useState } from "react";
import "../../css_files/addproduct.css"; // Import the CSS file

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // Add API call or backend integration here
  };

  return (
    <div className="add-product-container">
      <h2>add product</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-left">
          <label>product name :</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />

          <label>product price :</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />

          <label>product quantity :</label>
          <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />

          <label>upload image :</label>
          <input type="file" name="image" accept="image/*" onChange={handleFileChange} />
        </div>

        <div className="form-right">
          <label>product description</label>
          <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
        </div>

        <button type="submit">add product</button>
      </form>
    </div>
  );
};

export default AddProduct;
