import { useState } from "react";
import "../css_files/ProductDetails.css";
import productImage from "../svg/instagram.svg"; // Make sure to place the image in the correct path

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(0);

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setQuantity(value >= 0 ? value : 0);
  };

  const addToCart = () => {
    alert(`Added ${quantity} items to cart!`);
  };

  return (
    <div className="product-container">
      <h2 className="product-title">novacim CPJ45</h2>
      <div className="product-content">
        <img src={productImage} alt="Novacim CPJ45" className="product-image" />
        <div className="product-info">
          <h3 className="section-title">Description:</h3>
          <p className="product-description">
            Le CPJ 45 (Ciment Portland composé 45) est un type de ciment utilisé principalement dans la construction...
          </p>

          <div className="cart-section">
            <input 
              type="number" 
              value={quantity} 
              onChange={handleQuantityChange} 
              className="quantity-input" 
            />
            <button 
              onClick={addToCart} 
              className="add-to-cart-button"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
