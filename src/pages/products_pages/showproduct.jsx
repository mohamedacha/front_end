import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../css_files/productDetails.css";
import {AdminUI, AddButton, AppContext } from "../../App";

const ProductDetails = () => {

  const [product, setProduct] = useState({ product_name: "fetching name ...", quantity: 0 })
  const [OrderQuantity, setOrderQuantity] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { id } = useParams();
  const { token, admin } = useContext(AppContext)
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
  }, []);

  const handlSubmit = async (e) => {
    e.preventDefault();

    if (!token) { Navigate('/users/login') }
    try {
      const formData = new FormData();
      formData.append('confirmed', 0);
      formData.append('quantity', OrderQuantity);
      formData.append('user_id', JSON.parse(localStorage.getItem('authUser')).id);// authontification
      formData.append('product_id', product.id);

      const response = await fetch(`http://127.0.0.1:8000/api/orders`, {
        method: 'POST',
        headers: {
          "Accept": "application/json",
          "authorization": `Bearer ${token}`
        },
        body: formData,
      })

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage(data.message);
        setErrorMessage('');
        setProduct(oldData => ({
          ...oldData,
          ...data
        }));
      } else {
        console.log(data.errors);
      };

    } catch (e) {
      console.error('fail fetching : ', e.message);
    };
    Navigate('/orders');
  };

  const handlChange = (e) => {
    setOrderQuantity(e.target.value);
  };


  return (
    <>
      {admin ? (
        <AddButton added_element_name='product' navigate='/products/create' />
      ) : ('')}

      <div className="product_details">

        <div className="product-info">
          <h2 className="product-title">{product.product_name}</h2>

          <span>Description :</span>
          <p className="product-description"> {product.description}</p>

          <hr />
          {!admin ? (
            <>
              <div className="product_section">
                <span>product price :</span>
                <p>{product.price} DHS</p>
              </div>
              <div className="quantity_section">
                <span>quantity left :</span>
                <p>{product.quantity}</p>
              </div>
              <div className="total_price_section">
                <span>total price :</span>
                <p>{OrderQuantity <= product.quantity && OrderQuantity > 0 ? product.price * OrderQuantity + ' DHS' : 'out of limit'}</p>
              </div>

              <form className="cart-section" onSubmit={handlSubmit}>
                <input type="number" min={1} max={product.quantity} name="quantity" value={OrderQuantity} onChange={handlChange} className="quantity-input" />
                <button className="add-to-cart-button" type="submit">order</button>
              </form>

              <p className="error_message">{errorMessage}</p>
            </>
          ) : (
            <AdminUI deleteAPI= {`products/${product.id}`} token={token} backToPreviousPage='/products' navigateUpdateItem={`/products/update/${product.id}`}  />
          )}
        </div>

        <div className="right_part">
          <span className="product_price">{product.price} DHS</span>
          <img className="product_img" src={product.img} alt="" />
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
