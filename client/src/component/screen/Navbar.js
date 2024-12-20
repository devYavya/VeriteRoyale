import React, { useState } from 'react';
import '../style/Navbar.css';
// import logo from '../img/logom.png'
import perfume from '../img/perfume.png'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import user from '../img/user.png';
import { FaUserCheck } from "react-icons/fa";

const NavBar = () => {
  const [showNavLinks, setShowNavLinks] = useState(false);
  const tok = localStorage.getItem('token');
  const Uname = localStorage.getItem('LoggedInUser');
  const navigate = useNavigate();
  const handleToggleMenu = () => {
    setShowNavLinks(!showNavLinks);
  };
  const handleLogout = ()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("userId");

     //window.location.reload();
    navigate('/');
  }



  return (
    <nav className="nav-bar">
      <div className="hamburger-menu">
        <div className="hamburger-icon" onClick={handleToggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <ul className={`nav-links ${showNavLinks ? 'show-nav-links' : ''}`} id='left'>
        <li><Link to="/Fragrances">Fragnances</Link></li>
        <li><Link to="/NewArrivals">New Arrivals</Link></li> 
        <li><Link to="/OurWorld">Our World</Link></li>
      </ul>
      <div className="logo">
       <Link to={"/"}><h1>VÉRITÉ ROYALE</h1>  </Link>
      </div>
      <ul className={`nav-links ${showNavLinks ? 'show-nav-links' : ''}`} id='right'>
   
    <li><Link to="/Services">Custom</Link></li>
    <li><Link to="/Stories">Stories</Link></li>
    {/* <li>
        <Link to="/Fragrances">
            <img src={perfume} alt="Icon" style={{ width: '30px', height: '30px' }} />
        </Link>
    </li> */}
    <li>
      {tok == null ? (
        <Link to="/Login">
        <img src={user} alt="Icon" style={{ width: '30px', height: '30px' }} />
        </Link>
        ) : (
      <div className="dropdown">
      <button className="dropbtn">
      {Uname} <FaUserCheck/>
       </button>
       <div className="dropdown-content">
      <Link to="/Cart">Cart</Link>
       <Link onClick={handleLogout}>Logout</Link>
    </div>
    </div>
    )}
    </li>
</ul>
    </nav>
  );
};

export default NavBar;