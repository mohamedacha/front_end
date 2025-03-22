import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../css_files/productDetails.css";
import { AppContext } from "../../App";

const ProductDetails = () => {

  const [product, setProduct] = useState({ product_name: "fetching name ...", quantity: 0 })
  const [OrderQuantity, setOrderQuantity] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { id } = useParams();
  const {token} = useContext(AppContext) 
  const Navigate = useNavigate()



  useEffect(() => {
    console.log(token)
    const get_product = async () => {
      try {
        const respons = await fetch(`http://127.0.0.1:8000/api/products/${id}`);
        const data = await respons.json();
        console.log(data.data)
        setProduct(data.data);
        console.log(data.data);
        if (!respons.ok) console.error(data.message)

      } catch (error) { console.error(error.message); }
    }
    get_product()
  }, [])

  const handlSubmit = async (e) => {
    e.preventDefault()

    if(!token){Navigate('/users/login')}
    try {
      const formData = new FormData();
      formData.append('confirmed', 0);
      formData.append('quantity', OrderQuantity);
      formData.append('user_id', 1);// authontification
      formData.append('product_id', product.id);

      const response = await fetch(`http://127.0.0.1:8000/api/orders`, {
        method: 'POST',
        headers: {
          "Accept": "application/json",
          "authorization" : `Bearer ${token}`
        },
        body: formData,
      })

      const data = await response.json();
      if (response.ok) {
        console.log(data)
        setSuccessMessage(data.message)
        setErrorMessage('');
        setProduct(oldData => ({
          ...oldData,
          ...data
        }))
      } else {
        console.log(data.errors)
      };

    } catch (e) {
      console.error('fail fetching : ', e.message)
    }
  }


  const handlChange = (e) => {
    setOrderQuantity(e.target.value)
  }


  return (
    <div className="Update_order">

      <div className="product-content">
        <h2 className="product-title">{product.product_name}</h2>
        <div className="product-info">
          <h3 className="section-title">Description: {product.description}</h3>
          <br />
          <h3 className="section-quantity">quantity left : {product.quantity}</h3>
          <h3 className="section-total-price">total price : {product.price * OrderQuantity} DHS</h3>

          <form className="cart-section" onSubmit={handlSubmit}>
            <input type="number" min={1} name="quantity" value={OrderQuantity} onChange={handlChange} className="quantity-input" />
            <button className="add-to-cart-button">order</button>
          </form>
          <p className="error_message">{errorMessage}</p>
          <p className="success_message">{successMessage}</p>
        </div>
      </div>
      <div className="right_part">
        <span className="product-price">{product.price} DHS</span>
        <img className="product-img" src={product.img} alt="" />
      </div>
    </div>
  );
};

export default ProductDetails;
