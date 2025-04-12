
import { useContext, useEffect, useState } from "react";
import ProductCard from "./productCard";
import '../../css_files/products.css';
import { Link } from "react-router-dom";
import { AppContext, AddButton } from '../../App'
import { ReactComponent as CloseFilterFormSvg } from '../../svg/OpenFilterFormSvg.svg'
import { ReactComponent as Filtericon } from '../../svg/filter-icon.svg'
// import { click } from "@testing-library/user-event/dist/click";

const SearchBar = () => {
    return (
        <div className="search-bar-products">
            <input type="text" placeholder="Search" className="search-input-products" />
            <button className="search-button-products"><p>🔍</p></button>
        </div>
    );
};


const FilterForm = () => {
    const [clicked, setClicked] = useState(false);
    const [filterData , setFilterData] = useState({minPrice : 0 , maxPrice : 0 , minDate : '' , maxDate : '' , category : "all"})

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFilterData({
            ...filterData,
            [name]: type === 'number' ? Number(value) : value
        });
    }

    const closedFormStyle = {
        transition: "all 0.25s ease-in-out",
        left: '-250px',

    };

    const overlay = {
        position: ' fixed ',
        top: ' 0 ',
        left: ' 0 ',
        width: ' 100%',
        height: ' 100%',
        backgroundColor: ' rgba(0, 0, 0, 0.5) ',
        zIndex: ' 1 ',
    }

    const openFormStyle = {
        borderImage: 'fill 1 gray',
        transition: "all 0.25s ease-in-out",
        height: 'fit-content',
        width: "250px",

        display: 'flex',
        flexDirection: 'column',

        left: '0',
        top: '0',

        zIndex: '3',
        position: 'absolute',

        backgroundColor: " #CBDCEB",
        borderRadius: " 0 8px 8px 8px ",
        overflow: "hidden",

        padding: '30px 10px 20px',


    };

    const filterFormButton = {
        height: "35px",
        // width: "50px",
        // backgroundColor: "#2564eb",
        margin: 'auto',
        color: "white",
        borderRadius: "800px",
        fontWeight: 600,
        cursor: "pointer",
    };

    const section = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '10px 0'
    };

    const hrStyle = {
        width: '80%',
        marginTop: '6px ',
        backgroundColor: "#002A71",
        border: 'none',

    };

    const inputStyle = {
        width: '100%',
        height: "35px",
        borderRadius: '100px',
        padding: "0 10px",
        color: ' #002A71',
        border: 'none',
        backgroundColor: 'white',
        margin: '5px 0 10px 0'
    };

    const inputFocus = {
        // backgroundColor:' #CBDCEB' ,
        outline: "none",
        border: '1px solid #2564eb'
    };

    const handleClick = (e) => {
        e.stopPropagation();
        if (!clicked) {
            setClicked(true)
        } else {
            setClicked(false)
        }
    };

    return (
        <>
            <Filtericon onClick={handleClick} style={{ cursor: "pointer" }} title='filter' />
            {clicked && (
                <div className="overlay" style={overlay} onClick={handleClick}></div>
            )}

            <div className="filterForm" style={clicked ? openFormStyle : { ...openFormStyle, ...closedFormStyle }}  >
                <CloseFilterFormSvg onClick={handleClick} style={{ cursor: "pointer", transform: 'rotate(180deg)', position: 'absolute', right: '10px', top: '7px' }} />
                <section style={section}>
                    <span style={{ color: "#002A71", fontWeight: '700' }} >price</span>
                    <hr style={hrStyle} />
                </section>
                <section>
                    <label htmlFor="minPrice" style={{ color: "#002A71" }} >min :</label>
                    <input type='number' name='minPrice' id="minPrice"  min={0} style={inputStyle} onFocus={(e) => Object.assign(e.target.style, inputFocus)} onBlur={(e) => Object.assign(e.target.style, { ...inputStyle })} value={filterData.minPrice}  onChange={handleChange}/>
                </section>
                <section>
                    <label htmlFor="maxPrice" style={{ color: "#002A71" }} >max :</label>
                    <input type='number' name='maxPrice' id="maxPrice"  min={0} style={inputStyle} onFocus={(e) => Object.assign(e.target.style, inputFocus)} onBlur={(e) => Object.assign(e.target.style, { ...inputStyle })} value={filterData.maxPrice} onChange={handleChange}/>
                </section>

                <section style={section}>
                    <span style={{ color: "#002A71", fontWeight: '700' }}  >date</span>
                    <hr style={hrStyle} />
                </section>

                <label htmlFor="minDate" style={{ color: "#002A71" }} >min :</label>
                <input type='date' name='minDate' id="minDate"  style={inputStyle} onFocus={(e) => Object.assign(e.target.style, inputFocus)} onBlur={(e) => Object.assign(e.target.style, { ...inputStyle })} value={filterData.minDate} onChange={handleChange} />

                <label htmlFor="maxDate" style={{ color: "#002A71" }} >max :</label>
                <input type='date' name='maxDate' id="maxDate" style={inputStyle} onFocus={(e) => Object.assign(e.target.style, inputFocus)} onBlur={(e) => Object.assign(e.target.style, { ...inputStyle })} value={filterData.maxDate} onChange={handleChange} />

                <section style={section}>
                    <span style={{ color: "#002A71", fontWeight: '700' }}  >category</span>
                    <hr style={hrStyle} />
                </section>

                <select name="category" style={inputStyle} onFocus={(e)=> Object.assign(e.target.style ,{...inputFocus})} onBlur={(e)=> Object.assign(e.target.style ,{...inputStyle})} value={filterData.category} onChange={handleChange}>
                    <option value="all" >all</option>
                    <option value="finition">finition</option>
                    <option value="lbnii">lbnii</option>
                    <option value="sba4a">sba4a</option>
                    <option value="other">chi 7aja akhra</option>
                </select>

                <button style={filterFormButton} onclick={() => console.log('clicked')} > filter</button>
            </div>
        </>

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