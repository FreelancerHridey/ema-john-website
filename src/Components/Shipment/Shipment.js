import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import { useForm } from 'react-hook-form';
import './Shipment.css'


const Shipment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const { register, handleSubmit, watch, errors } = useForm();
    
    const onSubmit = data => {
      const saveCart = getDatabaseCart();
      const orderDetails = {...loggedInUser, products: saveCart, shipment: data, orderTime: new Date()}
      
      fetch('http://localhost:5000/addOrder',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(orderDetails)
      })
      .then(res => res.json())
      .then(data => {

        if(data){
          processOrder();
          alert("your order is successfully");
        }
      })

    };
  
    console.log(watch("example")); 
  
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <input name="example" defaultValue={loggedInUser.name} ref={register} placeholder="Enter your name" /><br/>
        <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Enter your email" /><br/>
        <input name="address" ref={register({ required: true })} placeholder="Enter your address" /><br/>
        <input name="phone" ref={register({ required: true })} placeholder="Enter your phone" /><br/>
        {errors.exampleRequired && <span className="error" >This field is required</span>}
        
        <input type="submit" />
      </form>
    );
};

export default Shipment;