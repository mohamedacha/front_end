import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../App";
import "../../css_files/Update_order.css";

const Update_order = () => {

    const [order, setOrder] = useState({ product_name: "fetching name ...", quantity: 0 })
    const [errorMessage, setErrorMessage] = useState('');
    const Navigate = useNavigate()

    const { id } = useParams();
    const { token } = useContext(AppContext)

    useEffect(() => {
        const get_Order = async () => {
            try {

                const respons = await fetch(`http://127.0.0.1:8000/api/orders/${id}`, {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                });
                const data = await respons.json();
                setOrder(data);
                console.log(data);
                if (!respons.ok) console.error(data.message)

            } catch (error) { console.error(error.message); }
        }
        get_Order()
    }, [])

    const handlSubmit = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData();
            formData.append('quantity', order.quantity);
            formData.append('_method', 'PUT');

            const response = await fetch(`http://127.0.0.1:8000/api/orders/${id}`, {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: formData,
            })
            const data = await response.json();
            if (response.ok) {
                console.log(data)
                Navigate('/orders')

            } else {
                console.log(data.errors.quantity)
                setErrorMessage(data.errors.quantity);
            };

        } catch (e) {
            console.error('fail fetching : ', e.message)
        }
    }
    const handlChange = (e) => {
        console.log({ [e.target.name]: e.target.value })
        setOrder({ ...order, [e.target.name]: e.target.value })
    }


    return (

        <div className="Update_order_container">
            <div className="Update_order">

                <div className="order-info">
                    <h2 className="order-title">{order.product_name}</h2>
                    <span>Description :</span>
                    <p className="order-description"> {order.description}</p>

                    <hr />

                    <div className="order_section">
                        <span>product price :</span>
                        <p>{order.price} DHS</p>
                    </div>
                    <div className="quantity_section">
                        <span>quantity left :</span>
                        <p>{order.product_quantity - order.quantity >= 0 && order.quantity > 0 ? (order.product_quantity - order.quantity) : 'out of limit'}</p>
                    </div>
                    <div className="total_price_section">
                        <span>total price :</span>
                        <p>{order.quantity <= order.product_quantity && order.quantity > 0 ? order.price * order.quantity + ' DHS' : 'out of limit'}</p>
                    </div>

                    <form className="cart-section" onSubmit={handlSubmit}>
                        <input type="number" min={1} max={order.product_quantity} name="quantity" onChange={handlChange} value={order.quantity} className="quantity-input" />
                        <button className="add-to-cart-button" type="submit">update</button>
                    </form>

                    <p className="error_message">{errorMessage}</p>

                </div>

                <div className="right_part">
                    <img className="product_img" src={order.img} alt="" />
                </div>
            </div>


        </div>
        // </div>

    );
};

export default Update_order;
