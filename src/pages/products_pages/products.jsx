
import { useEffect, useState } from "react";
import ProductCard from "./productCard";
import '../../css_files/products.css' ;
// import { useNavigate } from "react-router-dom";


export default function Products() {
    const [products, setProducts] = useState([])
    // const navigate = useNavigate()
    // const token = localStorage.getItem('authToken')


    useEffect(() => {
        // if(!token){ navigate('/users/login');}
        const get_products = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/products');
                const data = await response.json();
                console.log(data)
                setProducts(data.data);
            }
            catch (error) {
                console.error('error fetching users : ', error)
            }
        };
        get_products();
    }, []);

    return (

        <div className="products">
            {products.map((product, index) => (
                <ProductCard key={index} product={product} />
            ))}
        </div>

    );
}