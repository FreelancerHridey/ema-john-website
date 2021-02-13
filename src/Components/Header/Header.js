import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import logo from '../../images/logo.png'
import './Header.css'
const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    return (
        <div className="header-container">
            <div className="logo">
                <img src={logo} alt=""/>
            </div>
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/inventory">Manage Inventory  </Link>
            </nav>
            <div className="search-area">
                <form action="">
                    <input type="text" placeholder="Search your order"/>
                    <button style={{float:"right"}} onClick={() =>setLoggedInUser({})}>LogOut</button> 
                </form>
            </div>           
        </div>
    );
};

export default Header;