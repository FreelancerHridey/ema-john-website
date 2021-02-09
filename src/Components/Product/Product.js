import React from 'react';
import { Link } from 'react-router-dom';
import './Product.css'

const Product = (props) => {
    const {img, name, seller, price, stock, key} = props.product ;
    return (
        <div className="product-container">
            <div className="product-img">
                <img src={img} alt=""/>
            </div>
            <div className="product-details">
                <p><Link to={"/product/"+ key}>{name}</Link></p>
                <p><small>By: {seller}</small></p>
                <h5>Price : ${price}</h5>
                <p><small>Stock {stock} left order soon</small></p>
                 {props.showAddToCart && <button className="cartBtn" 
                onClick={() =>props.clickHandler(props.product)}>Add to cart</button>}
            </div>
        </div>
    );
};

export default Product;