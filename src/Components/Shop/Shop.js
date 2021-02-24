import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import Product from '../Product/Product'
import Cart from '../Cart/Cart'
import './Shop.css'
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';

const Shop = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([]);


    useEffect(()=>{
        fetch('http://localhost:5000/products')
        .then(res => res.json())
        .then(result => setProducts(result))
    },[])

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
            if(products.length > 0) {
                const previewsKeys = productKeys.map(exitingKeys => {
                    const product = products.find(pd => pd.key === exitingKeys);
                    product.quantity = saveProduct[exitingKeys];
                    return product;
                })
            setCart(previewsKeys);
        }        
    }, [products])
    return (
        <div className="shop-container">
            <div className="shop">
                {
                    products.map(product => <Product 
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