import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetails = () => {
    const {productKey} = useParams();
    const [product, setProduct] = useState({})

    useEffect(()=>{
        fetch('http://localhost:5000/product/'+productKey)
        .then(res => res.json())
        .then(data => setProduct(data))
    },[product])

    return (
        <div>
            <h1 style={{textAlign: 'center'}}>product details here</h1>
            <Product product={product} showAddToCart={false}></Product>
        </div>
    );
};

export default ProductDetails;