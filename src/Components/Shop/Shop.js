import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import fakeData from '../../fakeData'
import Product from '../Product/Product'
import Cart from '../Cart/Cart'
import './Shop.css'
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';

const Shop = () => {
    const [product] = useState(fakeData.slice(0,10))
    const [cart, setCart] = useState([]);

    const clickHandler = (product) =>{

        const sameProduct = cart.find(pd=>pd.key === product.key)
            const count = 1;
            let newCart ;
            if(sameProduct){
                const count = sameProduct.quantity + 1;
                sameProduct.quantity = count;
                const other = cart.filter(pd => pd.key !==  product.key)
                newCart = [...other, sameProduct]
            }else{
                product.quantity = 1;
                newCart = [...cart,product]
            }
        setCart(newCart);
        addToDatabaseCart(product.key, count)
    }

    useEffect(()=>{
        const saveProduct =  getDatabaseCart();
        const productKeys = Object.keys(saveProduct);
        const previewsKeys = productKeys.map(exitingKeys => {
            const product = fakeData.find(pd => pd.key === exitingKeys);
            product.quantity = saveProduct[exitingKeys];
            return product;
        })
        setCart(previewsKeys);
    }, [])
    return (
        <div className="shop-container">
            <div className="shop">
                {
                    product.map(product => <Product 
                        showAddToCart={true}
                        key={product.key} 
                        product={product}
                        clickHandler={clickHandler}></Product>)
                }
            </div>
            <div className="shop-cart">
                <Cart cart={cart}>
                    <Link to='/review'><button className="cartBtn"
                    >Oder Review</button></Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;