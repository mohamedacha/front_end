import { useEffect, useState } from "react";
// import { FaCheck, FaTimes, FaSearch } from "react-icons/fa";
import "../../css_files/ordersCard.css"; // Import the CSS file
import { Link } from "react-router-dom";
const OrdersCard = () => {
      const [orders, setOrders] = useState([])
  
      useEffect(() => {
          const get_Orders = async () => {
              try {
                  const response = await fetch('http://127.0.0.1:8000/api/orders');
                  const data = await response.json();
                  console.log(data)
                  setOrders(data.data);
              }
              catch (error) {
                  console.error('error fetching users : ', error)
              }
          };
          get_Orders();
      }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const handleUpdate = (id) => {
    // alert(Updating order with ID: ${id});
    // API call or navigate to an update form
  };
  
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
  
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/orders/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
  
      if (response.ok) {
        alert("Order deleted successfully!");
        setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
      } else {
        const errorMessage = await response.text();
        alert(`Failed to delete order: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };
  
  
  const handleConfirm = async (id) => {
    if (!window.confirm("Are you sure you want to confirm this order?")) return;
  
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/orders/${id}/confirm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
  
      if (response.ok) {
        alert("Order confirmed successfully!");
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === id ? { ...order, confirmed: true } : order
          )
        );
      } else {
        const errorMessage = await response.text();
        alert(`Failed to confirm order: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error confirming order:", error);
    }
  };
  
  
 
  
  // Render Component
  <OrdersCard orders={orders} handleUpdate={handleUpdate} handleDelete={handleDelete} handleConfirm={handleConfirm} />;
  

  // Sample order data
  // const orders = [
  //   {
  //     id: 1,
  //     product: "CPJ45",
  //     price: "200 DHS",
  //     quantity: 1000,
  //     totalPrice: "200000 DHS",
  //     orderDate: "25/2/2024",
  //     confirmed: true,
  //   },
  // ];

  // Filter orders based on search input
  // const filteredOrders = orders.filter((order) =>
  //   order.product.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <div className="orders-container">
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* <FaSearch className="search-icon" /> */}
      </div>

      {/* Orders Table */}
      <table className="orders-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Order Date</th>
            <th>Confirmation</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.product_name}</td>
              <td>{order.price}</td>
              <td>{order.quantity}</td>
              <td>{order.quantity * order.price}</td>
              <td>{order.updated_at}</td>
              <td className="actions">
                {/* <button className="update-btn" onClick={() => handleUpdate(order.id)}>Update</button> */}
                <Link to ='/orders/show' className="update-btn"  onClick={() => handleUpdate(order.id)} > update</Link>
                <button className="delete-btn" onClick={() => handleDelete(order.id)}>Delete</button>
                <button className="confirm-btn" onClick={() => handleConfirm(order.id)}>Confirmer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersCard;
