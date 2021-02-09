import React from 'react';
import {Link} from 'react-router-dom'
import './ReviewItem.css'
const ReviewItem = (props) => {
    const {img, name, price, quantity, key} = props.cart;

    return (
        <div className="product-container">
            <div style={{margin:"10px"}}>
                <img src={img} alt=""/>
            </div>
            <div className="reviewCart-details">
                <p><Link to= {"/product/"+ key}>{name}</Link></p>
                <p>price: {price}</p>
                <p>Quantity: {quantity}</p>
                <button
                 className="cartBtn"
                 onClick={()=>props.removeProduct(key)}
                 >Remove product</button>
            </div>
            
        </div>
    );
};

export default ReviewItem;