import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import logo from '../../images/logo.png'
import './Header.css'
const Header = () => {
    return (
        <div className="header-container">
            <div className="logo">
                <img src={logo} alt=""/>
            </div>
            <nav>
                <a href="/shop">Shop</a>
                <a href="/review">Order Review</a>
                <a href="/inventory">Manage Inventory  </a>
            </nav>
            <div className="search-area">
                <form action="">
                    <input type="text" placeholder="Search your order"/>
                </form>
            </div>           
        </div>
    );
};

export default Header;