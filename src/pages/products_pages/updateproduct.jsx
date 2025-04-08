import { useContext, useEffect, useState } from "react";
import '../../css_files/addproduct.css';
import { AppContext } from "../../App";
import { useNavigate, useParams } from "react-router-dom";
export default function Updateproduct () {
  const Navigate = useNavigate();
  const {id} = useParams();
  const { token } = useContext(AppContext);
  const [errors, setErrors] = useState();

  const [formData, setFormData] = useState({
    product_name: "",
    price: "",
    category: "",
    description: "",
    quantity: "",
    image: null,
  });

  const creationForm = () => {
    const formDataToSend = new FormData();
    formDataToSend.append("_method", 'PUT');
    formDataToSend.append("product_name", formData.product_name);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("quantity", formData.quantity);
    formDataToSend.delete('img')
    if (formData.image instanceof File) {
      formDataToSend.append("img", formData.image);
    }
    return formDataToSend
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/products/${id}`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: creationForm(),
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid response from server");
      }

      const data = await response.json();

      if (!response.ok) {
        setErrors({ ...data.errors });
        console.log(errors)
        throw new Error(data.message || "Failed to add product");
      }

      sessionStorage.setItem('message', "Product added successfully!")
      Navigate(`/products/show/${id}`)
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product: " + error.message);
    }
  };

  useEffect(()=>{
    const get_product = async () => {
      const response = await fetch(`http://127.0.0.1:8000/api/products/${id}`);

      const data = await response.json();
      setFormData({ ...formData, ...data.data });
      console.log(data)

      if (!response.ok) {
        setErrors({ ...data.errors });
        console.log(errors)
        throw new Error(data.message || "Failed to add product");
      }
    }
    get_product()
  },[])

  return (
    <div className="add-product-page">

      <div className="add-product-container">
        <h2>update Product</h2>
        <hr />
        <form onSubmit={handleSubmit} className="product-form">
          <section className="inputs_section">
            <section className="left_part">
              <span>Product Name:</span>
              <input type="text" name="product_name" value={formData.product_name} onChange={handleChange} required />
              {errors && errors.product_name && (<p className="error_message">{errors.product_name}</p>)}

              <span>Price:</span>
              <input type="number" name="price" value={formData.price} onChange={handleChange} required />
              {errors && errors.price && (<p className="error_message">{errors.price}</p>)}

              <span>Category:</span>
              <input type="text" name="category" value={formData.category} onChange={handleChange} required />
              {errors && errors.category && (<p className="error_message">{errors.category}</p>)}


              <span>Quantity:</span>
              <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
              {errors && errors.quantity && (<p className="error_message">{errors.quantity}</p>)}


            </section>

            <section className="right_part">
              <span>img :</span>
              <label className="img" htmlFor="img_create_product"><span>Upload Image</span></label>
              <input className="img_file_input" type="file" name="image" id="img_create_product" accept="image/*" onChange={handleFileChange} />
              {errors && errors.img && (<p className="error_message">{errors.img}</p>)}

              <span>Description:</span>
              <textarea name="description" value={formData.description} onChange={handleChange} />
              {errors && errors.description && (<p className="error_message">{errors.description}</p>)}
            </section>
          </section>
          <button type="submit">update Product</button>
        </form>
      </div>
    </div>

  );
};

