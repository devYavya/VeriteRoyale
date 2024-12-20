import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Sidebar from './Sidebar';
import '../style/ViewProduct.css';

const CustomeProduct = () => {
  const [customPerfumes, setCustomPerfumes] = useState([]);
  // const userid = localStorage.getItem('userId');
  useEffect(() => {
    fetchCustomPerfumes();
  }, []);

  const fetchCustomPerfumes = async () => {
    try {
      const response = await axios.get('https://veriteroyale.onrender.com/custom/customperfumes');
      console.log(response.data.data)
      setCustomPerfumes(response.data.data);
    } catch (error) {
      console.error('Error fetching custom perfumes:', error);
      toast.error("Error fetching custom perfumes!", { position: "top-left" });
    }
  };

  return (
    <div className="main">
      <Sidebar />
      <div className="ProductTable">
        <h1>Custom Perfume Orders</h1>
        <table border={1} cellPadding={10} cellSpacing={0}>
          <thead>
            <tr>
              <th>S.NO.</th>
              <th>User ID</th>
              <th>Name</th>
              <th>Base Scent</th>
              <th>Concentration</th>
              <th>Size</th>
              <th>Packaging</th>
              <th>Customization</th>
              <th>Total Price </th>
            </tr>
          </thead>
          <tbody>
            {customPerfumes.map((perfume, index) => (
              <tr key={perfume._id}>
                <td>{index + 1}</td>
                <td>{perfume.userId._id}</td>
                <td>{perfume.userId.name}</td>
                <td>{perfume.baseScent}</td>
                <td>{perfume.concentration}</td>
                <td>{perfume.size}</td>
                <td>{perfume.packaging}</td>
                <td>{perfume.customization}</td>
                <td>{perfume.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomeProduct;
