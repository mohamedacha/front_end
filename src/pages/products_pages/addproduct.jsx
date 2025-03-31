import { useContext, useState } from "react";
import '../../css_files/addproduct.css';
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";
const AddProduct = () => {
  const { token } = useContext(AppContext)
  const [formData, setFormData] = useState({
    product_name: "",
    price: "",
    category: "",
    description: "",
    quantity: "",
    image: null,
  });
  const Navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("product_name", formData.product_name);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("quantity", formData.quantity);
    if (formData.image) {
      formDataToSend.append("img", formData.image);
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/products", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid response from server");
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add product");
      }

      alert("Product added successfully!");
      Navigate('/products')
      console.log("Success:", data);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product: " + error.message);
    }
  };

  return (
    <div className="add-product-page">

      <div className="add-product-container">
        <h2>Add Product</h2>
        <hr />
        <form onSubmit={handleSubmit} className="product-form">
          <section className="left_part">
            <span>Product Name:</span>
            <input type="text" name="product_name" value={formData.product_name} onChange={handleChange} required />

            <span>Price:</span>
            <input type="number" name="price" value={formData.price} onChange={handleChange} required />

            <span>Category:</span>
            <input type="text" name="category" value={formData.category} onChange={handleChange} required />


            <span>Quantity:</span>
            <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />

            
            <label className="img" htmlFor="img_create_product"><span>Upload Image</span></label>
            <input className="img_file_input" type="file" name="image" id="img_create_product" accept="image/*" onChange={handleFileChange} />
          </section>

          <section className="right_part">
            <span>Description:</span>
            <textarea name="description" value={formData.description} onChange={handleChange} />
          </section>
        <button type="submit">Add Product</button>
        </form>
      </div>
    </div>

  );
};

export default AddProduct;
