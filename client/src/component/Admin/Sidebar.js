import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser ,Check } from "react-icons/fa";

import '../style/Sidebar.css'

const Sidebar = () => {
  const Admintok = localStorage.getItem('admintoken');
  const Adminname = localStorage.getItem('LoggedInAdmin');
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("admintoken"); 
    localStorage.removeItem("LoggedInAdmin");
    console.log("logout"); 
    window.location.reload();
    navigate('/AdminLogin');
  }

  useEffect(() => {
    if(Admintok == null ){
      navigate('/AdminLogin')
    }
  }, [])

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <div className="sidebar">
      <div className="toggle-button" onClick={handleToggleMenu}>
        <i className="fas fa-bars"></i>
      </div>
      <ul className={isMenuOpen ? "menu-open" : ""}>
        <li>
          {Admintok == null ? ""
            // navigate('/AdminLogin')
           
          : (
            <>
             {Adminname}
            </>
          )
          }
        </li>
        <li><Link to="/Dashboard">Dashboard</Link></li>
        <li><Link to="/ViewUsers">Users</Link></li>
        <li><Link to="/PurchaseOrder"> Orders </Link></li>
        <li><Link to="/ViewFeedback"> Feedbacks </Link></li>
        <li><Link to="/Product">Add Products</Link></li>
        <li><Link to="/ViewProduct">View Products</Link></li>
        <li><Link to="/Customeproduct"> Customized Orders </Link></li>
        <li><Link onClick={handleLogout}>Logout</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;