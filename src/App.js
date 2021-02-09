import React from 'react'
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

function App() {
  return (
    <> 
    <Header></Header>
    <Router>
      <Switch>
        <Route exact path="/"><Shop></Shop></Route>
        <Route path="/shop"><Shop></Shop></Route>
        <Route path="/review"><Review></Review></Route>
        <Route path="/inventory"><Inventory></Inventory></Route>
        <Route path="/product/:productKey"><ProductDetails></ProductDetails></Route>
        <Route path="*"><NotFound></NotFound></Route>
      </Switch>
    </Router>
    </>
  );
}

export default App;
