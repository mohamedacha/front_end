
import { useContext, useEffect, useState } from "react";
import ProductCard from "./productCard";
import '../../css_files/products.css';
import { Link } from "react-router-dom";
import { AppContext, AddButton } from '../../App'
import { click } from "@testing-library/user-event/dist/click";

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
        borderRadius: "8px",
        overflow: "hidden",

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: "white",
        cursor: "pointer",

        fontWeight: 600,
        transition: "all 0.15s ease-in-out",
        textAlign: "center",
        whiteSpace: "nowrap",
    };
    const handleClick = (e) => {
        e.stopPropagation();

        Object.assign(e.target.style, {
            height: "300px",
            width: "180px",
            position: 'absolute',
            top: 'calc(50% - 35px / 2)',
            justifyContent: 'center',
            alignItems: 'start',
            flexDirection: 'column',
            zIndex: '3',
            padding: '10px',


        })
        // e.removeEvent('click') ;

    }

    return (
        // <div className="filterForm" style={FormStyle}  >
         <div className="filterForm" style={FormStyle} onClick={handleClick} > 
            <p>f</p>
            {/* <span htmlFor="name">price :</span>
            <hr />
            <div className="price">
                <label htmlFor="price_min">min :</label>
                <input type='number' name='price_min' className="useremail" />
            </div>
            <div className="date">
                <label htmlFor="price_max">max :</label>
                <input type='number' name='price_max' className="useremail" />
            </div>

            <span htmlFor="name">date :</span>
            <hr />

            <label htmlFor="max_date">min :</label>
            <input type='date' name='max_date' className="useremail" />

            <label htmlFor="min_date">max :</label>
            <input type='date' name='min_date' className="useremail" />

            <button onclick={() => console.log('clicked')} > filter</button> */}
        </div>
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
                ) : ('')}
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