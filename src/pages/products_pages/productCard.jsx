
import '../../css_files/productCard.css'


export default function ProductCard(props){
    const product = props.product
    const key = props.key

    return(
        <div className="productCard" key={key}>
            <span className="productprice">{product.price} DH</span>
            <img src= {product.img} alt="" />
            <p className="productName">{product.product_name}</p>
        </div>
    )
}