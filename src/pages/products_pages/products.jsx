
import { useContext, useEffect, useState } from "react";
import ProductCard from "./productCard";
import '../../css_files/products.css';
import { Link } from "react-router-dom";
import { AppContext , AddButton } from '../../App'


export default function Products() {
    const { admin } = useContext(AppContext)
    const [products, setProducts] = useState([])

    useEffect(() => {
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
            {admin ? (
                <AddButton added_element_name = 'product' navigate ='/products/create' />
            ) : ('')}
            {products.map((product, index) => (
                <Link to={`/products/show/${product.id}`}>
                    <ProductCard key={index} product={product} />                       
                </Link>
            ))}
        </div>

    );
}