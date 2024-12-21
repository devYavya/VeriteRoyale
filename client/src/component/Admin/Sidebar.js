import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/Sidebar.css';

const Sidebar = () => {
  const [showMenu, setMenu] = useState(false);
  const Admintok = localStorage.getItem('admintoken');
  const Adminname = localStorage.getItem('LoggedInAdmin');
  const navigate = useNavigate();

  const handleMenu = () => {
    setMenu(prev => !prev);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem('admintoken');
      localStorage.removeItem('LoggedInAdmin');
      navigate('/AdminLogin');
    }
  };

  useEffect(() => {
    if (!Admintok) {
      navigate('/AdminLogin');
    }
  }, [Admintok, navigate]); 

  return (
    <nav className="sidebar">
      <div className="ham-menu">
        <div 
          className="ham-icon" 
          onClick={handleMenu} 
          aria-expanded={showMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <ul className={`side-nav ${showMenu ? 'show-Menu' : ''}`}>
      <li> {Admintok == null ? "" // navigate('/AdminLogin')



      : (
        <>
         {Adminname}
        </>
      ) }
    </li>
        <li><Link to="/Dashboard">Dashboard</Link></li>
        <li><Link to="/ViewUsers">Users</Link></li>
        <li><Link to="/PurchaseOrder">Orders</Link></li>
        <li><Link to="/ViewFeedback">Feedbacks</Link></li>
        <li><Link to="/Product">Add Products</Link></li>
        <li><Link to="/ViewProduct">View Products</Link></li>
        <li><Link to="/Customeproduct">Customized Orders</Link></li>
        <li><Link onClick={handleLogout}>Logout</Link></li>
      </ul>
    </nav>
  );
};

export default Sidebar;