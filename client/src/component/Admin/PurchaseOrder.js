import React, { useEffect, useState } from "react";
import axios from 'axios';
import "../style/PurchaseOrder.css";
import Sidebar from "./Sidebar";

const PurchaseOrder = () => {
  const [orders, setOrders] = useState([]);
  // const tok = localStorage.getItem('token');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8000/orders/getAllOrders");
        console.log(response.data);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="main">
      <Sidebar />
      <div className="PurchaseTable">
        <h1>Purchase Order</h1>
        <table border={1} cellPadding={10} cellSpacing={0}>
          <thead>
            <tr>
              <th>Order ID</th>
              {/* <th>User ID</th> */}
              <th>User Name</th>
              <th>Email</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price (₹)</th>
              <th>Total (₹)</th>
              <th>Order Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                {/* <td>{order.userId}</td> */}
                <td>{order.userName}</td>
                <td>{order.userEmail}</td>
                <td>{order.productName}</td>
                <td>{order.quantity}</td>
                <td>{order.price}</td>
                <td>{order.quantity * order.price}</td>
                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                <td>{<select 
                name="size" 
                value={order.status} 
                // onChange={handleChange}
                required
              >
                {/* <option value="">Select size</option> */}
                <option value="pending">Pending</option>
                <option value="">Dispatched</option>
                
              </select>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchaseOrder;

