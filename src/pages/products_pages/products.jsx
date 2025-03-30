
import { useContext, useEffect, useState } from "react";
import ProductCard from "./productCard";
import '../../css_files/products.css';
import { Link } from "react-router-dom";
import { AppContext, AddButton } from '../../App'

const SearchBar = () => {
    return (
        <div className="search-bar-products">
            <input type="text" placeholder="Search" className="search-input-products" />
            <button className="search-button-products"><p>🔍</p></button>
        </div>
    );
};

const FilterForm = () => {
    const FormStyle = {   
        height: "35px",
        width: "50px",
        backgroundColor: "#2564eb",
        color: "white",
        borderRadius: "8px",
        fontWeight: 600,
        cursor: "pointer",
        border: "none",
        margin: "0",
        overflow: "hidden",
        transition: "all 0.125s ease-in-out",
        textAlign: "center",
        whiteSpace: "nowrap",
    };
    return (
        <button className="filterForm" style={FormStyle}>
            f
        </button>
    )
}

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
            <div className="top_product_page">

                <FilterForm />
                <SearchBar />
                {admin ? (
                    <AddButton added_element_name='product' navigate='/products/create' />
                ) : (
                    <div></div>
                )}
            </div>
            <div className="products_list">
                {products.map((product, index) => (

                    <Link to={`/products/show/${product.id}`}>
                        <ProductCard key={index} product={product} />
                    </Link>
                ))}
            </div>
        </div>

    );
}