import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import '../style/Dashboard.css';


const Dashboard = () => {
  const [productsCount, setProductsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [totalprice,setTotalPrice] = useState(0);
  const [stock,setStock] = useState(0);
  const [sale,setSale] = useState(0);
  const [Order, setTotalOrders] = useState(0);

  useEffect(() => {
    axios.get("https://veriteroyale.onrender.com/api/productcount")
      .then(response => {
        setProductsCount(response.data.count);
        
      })
      .catch(error => {
        console.error(error);
      });

      axios.get("https://veriteroyale.onrender.com/api/totalprice")
      .then(response => {
        setTotalPrice(response.data.totalValue);
        
      })
      .catch(error => {
        console.error(error);
      });


      axios.get("https://veriteroyale.onrender.com/api/totalstocks")
      .then(response => {
        setStock(response.data.totalStocks);
        
      })
      .catch(error => {
        console.error(error);
      });
      

    axios.get("https://veriteroyale.onrender.com/auth/usersCount")
      .then(response => {
        setUsersCount(response.data.count);
      })
      .catch(error => {
        console.error(error);
      });


      axios.get("https://veriteroyale.onrender.com/orders/countOrders")
      .then(response => {
        setTotalOrders(response.data.count);
       
      })
      .catch(error => {
        console.error(error);
      });


      axios.get("https://veriteroyale.onrender.com/orders/getTotalOrdersPrice")
      .then(response => {
        setSale(response.data.totalPrice);
       
      })
      .catch(error => {
        console.error(error);
      });

     

  }, []);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <h1>VÉRITÉ ROYALE | c'est du luxe</h1>
        <div className="cards">
          <div className="card">
            <h2>Products</h2>
            <p>{productsCount}</p>
          </div>
          <div className="card">
            <h2>Users</h2>
            <p>{usersCount}</p>
          </div>
          <div className="card">
            <h2>Stock</h2>
            <p>{stock}</p>
          </div>
          <div className="card">
            <h2>Sale</h2>
            <p>₹ {sale}</p>
          </div>
          <div className="card">
            <h2>Total Value</h2>
            <p>₹ {totalprice}</p>
          </div>
          <div className="card">
            <h2>Orders</h2>
            <p>{Order}</p>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;