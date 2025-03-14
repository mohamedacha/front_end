import { useState } from "react";
import { FaCheck, FaTimes, FaSearch } from "react-icons/fa";
import "../../css_files/ordersCard.css"; // Import the CSS file

const OrdersCard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Sample order data
  const orders = [
    {
      id: 1,
      product: "CPJ45",
      price: "200 DHS",
      quantity: 1000,
      totalPrice: "200000 DHS",
      orderDate: "25/2/2024",
      confirmed: true,
    },
  ];

  // Filter orders based on search input
  const filteredOrders = orders.filter((order) =>
    order.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="orders-container">
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FaSearch className="search-icon" />
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
          {filteredOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.product}</td>
              <td>{order.price}</td>
              <td>{order.quantity}</td>
              <td>{order.totalPrice}</td>
              <td>{order.orderDate}</td>
              <td className="confirmation-icons">
                {order.confirmed ? (
                  <FaCheck className="icon check" />
                ) : (
                  <FaTimes className="icon cross" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersCard;
