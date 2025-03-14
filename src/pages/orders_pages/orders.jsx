
// export default function Orders(){
//     return(
//         <div>Orders</div>
//     )
// }

import { useEffect, useState } from "react";
import OrdersCard from "./ordersCard";
// import '../../css_files/orders.css' ;


export default function Orders() {
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

    return (

        <div className="orders">
            {orders.map((orders, index) => (
                <OrdersCard key={index} orders={orders} />
            ))}
        </div>

    );
}