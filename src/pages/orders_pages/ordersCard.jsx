import { useContext, useEffect, useState } from "react";
import "../../css_files/ordersCard.css"; // Import the CSS file
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../App";

const SearchBar = () => {
  return (
    <div className="search-bar-orders">
      <input type="text" placeholder="Search" className="search-input-orders" />
      <button className="search-button-orders"><p>🔍</p></button>
    </div>
  );
};


export default function OrdersCard() {
  const [orders, setOrders] = useState([])
  const navigate = useNavigate()
  const { token, admin } = useContext(AppContext)


  useEffect(() => {

    if (!token) { navigate('/users/login') }
    const get_Orders = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/orders/${!admin ? `index/${JSON.parse(localStorage.getItem('authUser')).id}` : 'admin_index'}`, {
          headers: {
            'authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          }
        }

        );
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

    alert(`Updating order with ID: ${id}`);
    // API call or navigate to an update form
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/orders/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`,

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
          "Accept": "application/json",
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





  // Filter orders based on search input
  // const filteredOrders = orders.filter((order) =>
  //   order.product.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <div className="orders-container">
      <div className="top_orders_page">
        <SearchBar />
      </div>

      <table className="orders-table">
        <tbody>
          {orders.map((order) => (

            <tr key={order.id}>
              <td>
                <div className="img_container">
                <img src={order.img} alt="" />
                </div>
              </td>
              <td>
                <table className="info_table">
                  {order.client && (
                    <tr >
                      <td>client :</td>
                      <td>{order.client}</td>
                    </tr>
                  )}
                  <tr>
                    <td>product name :</td>
                    <td>{order.product_name}</td>
                  </tr>

                  <tr>
                    <td>price :</td>
                    <td>{order.price + ' DHS'}</td>
                  </tr>

                  <tr>
                    <td>quantity :</td>
                    <td>{order.quantity}</td>
                  </tr>

                  <tr>
                    <td>total price :</td>
                    <td>{order.quantity * order.price + ' DHS'}</td>
                  </tr>

                  <tr>
                    <td>ordered at :</td>
                    <td>{order.updated_at}</td>
                  </tr>

                </table>

              </td>
              <td className="actions">
                {admin ? (
                  <>
                    <button className="confirm-btn" onClick={() => handleConfirm(order.id)}>Confirme</button>
                    <button className="delete-btn" onClick={() => handleDelete(order.id)}>reject</button>
                  </>
                ) : (
                  <>
                    <Link to={`/orders/update/${order.id}`} className="update-btn"> update</Link>
                    <button className="delete-btn" onClick={() => handleDelete(order.id)}>Delete</button>
                  </>
                )}

              </td>
            </tr>
          ))
          }
        </tbody>
      </table >
    </div >
  );
};
