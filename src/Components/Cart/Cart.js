import React from 'react';


const Cart = (props) => {
    const cart = props.cart ;
    const price = cart.reduce((price, product)=>price+(product.price) * product.quantity || 1,0)
    const tex = Number(price / 10)
    let shipping = 0;
    if(price > 35){
        shipping = 0;
    }else if(price > 15){
        shipping = 4.78
    }else if(price >0){
        shipping = 12
    }
    const total = price + tex + shipping
    const  fixedNumber=(num)=>{
        return num.toFixed(2)
    }
    return (
        <div>
            <h2>Order Summery </h2>
            <h3>Order Items: {props.cart.length} </h3>
            <p>Item price: {fixedNumber(price)}</p>
            <p>Shipping: {fixedNumber(shipping)}</p>
            <p>Tax+VAT: {fixedNumber(tex)}</p>
            <h5>Total price : {fixedNumber(total)}</h5>
            { props.children }
        </div>
    );
};

export default Cart;