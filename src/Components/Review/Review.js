import React, { useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import { Link, useHistory } from 'react-router-dom'
import placeOrderImg from '../../images/giphy.gif'

const Review = () => {
   const [cart, setCart] = useState([])
   const [placeOrder, setPlaceOrder] = useState(false);
   const history = useHistory();
   
   const proceedCheckHandler = () =>{
       history.push('/shipment')
   }
   useEffect( ()=>{
       const saveCart = getDatabaseCart()
       const productKey = Object.keys(saveCart);

    fetch('http://localhost:5000/productsByKeys',{
        method: 'POST',
        headers: {
            'Content-Type': "application/json",
        },
        body:  JSON.stringify(productKey)
    })
    .then(res => res.json())
    .then(data => setCart(data));
   },[])
   const removeProduct =(productKey)=>{
            const newCart = cart.filter(pd => pd.key !==productKey)
            setCart(newCart)
            removeFromDatabaseCart(productKey);
   }
   const thankYou =  <img src={placeOrderImg} />
    return (
        <div>
           <h1 style={{textAlign:"center"}}>Your Product Review here</h1>
           <div className="shop-container">
            <div className="placeOrder-img">
                    {
                        placeOrder && thankYou 
                    }
            </div>
                <div className="shop">
                {
                    cart.map(cart => <ReviewItem
                        key={cart.key}
                        cart={cart}
                        removeProduct={removeProduct}
                        ></ReviewItem>)
                }
                </div>
                <div className="cart-container">
                    <Cart cart={cart}>
                        <Link ><button onClick={proceedCheckHandler} className="cartBtn"
                         >Proceed Checkout</button></Link>     
                    </Cart>
                </div>
           </div>
        </div>
    );
};

export default Review;