import React, { createContext, useState } from 'react'
import './App.css'
import Header from './Components/Header/Header'
import Shop from './Components/Shop/Shop'
import Review from './Components/Review/Review'
import Inventory from './Components/Inventory/Inventory'
import NotFound from './Components/NotFound/NotFound'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import ProductDetails from './Components/ProductDetails/ProductDetails'
import Login from './Components/Login/Login'
import Shipment from './Components/Shipment/Shipment'
import PrivateRouter from './Components/PrivateRouter/PrivateRouter'

export const UserContext = createContext();


function App() {
  const [loggedInUser, setLoggedInUser]= useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}> 
      <Router>
      <Header></Header>
        <Switch>
          <Route exact path="/"><Shop></Shop></Route>
          <Route path="/shop"><Shop></Shop></Route>
          <Route path="/review"><Review></Review></Route>
          <PrivateRouter path="/inventory"><Inventory></Inventory></PrivateRouter>
          <Route path="/login"><Login></Login></Route>
          <PrivateRouter path="/shipment"><Shipment></Shipment></PrivateRouter>
          <Route path="/product/:productKey"><ProductDetails></ProductDetails></Route>
          <Route path="*"><NotFound></NotFound></Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
