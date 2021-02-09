import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetails = () => {
    const {productKey} = useParams();
    const product = fakeData.find(product => product.key === productKey);

    return (
        <div>
            <h1 style={{textAlign: 'center'}}>product details here</h1>
            <Product product={product} showAddToCart={false}></Product>
        </div>
    );
};

export default ProductDetails;