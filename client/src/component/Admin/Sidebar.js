import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/Sidebar.css';

const Sidebar = () => {
  const [showMenu, setMenu] = useState(false);
  const Admintok = localStorage.getItem('admintoken');
  const Adminname = localStorage.getItem('LoggedInAdmin');
  const navigate = useNavigate();
  const handleMenu = () => {
    setMenu(!showMenu);
  };

  const handleLogout = () => {
    localStorage.removeItem('admintoken');
    localStorage.removeItem('LoggedInAdmin');
    // console.log('Logged out');
    navigate('/AdminLogin');
  };

  useEffect(() => {
    if (!Admintok) {
      navigate('/AdminLogin');
    }
  }, [Admintok, navigate]); 

  return (
    <div className="sidebar">
      <div className="hamburger-menu">
        <div className="hamburger-icon" onClick={handleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <ul className={`side-nav ${showMenu? 'show-Menu' : ''}`}>
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