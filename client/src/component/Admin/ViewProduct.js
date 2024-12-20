import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../style/ViewProduct.css";
import axios from 'axios'; 
// import '@fortawesome/fontawesome-free/css/all.min.css';
import {toast} from "react-toastify";
import Sidebar from "./Sidebar";
// import { FaTrash } from "react-icons/fa";

const ViewProduct = () => {

  const[products, setProducts] = useState([]);
  useEffect(()=>{
    const fetchData= async()=>
    {
      const response = await axios.get("http://localhost:8000/api/getAll")
      setProducts(response.data);
    }

    fetchData();

  },[])

  const deleteProduct = async(productID) =>
  {
    await axios.delete(`http://localhost:8000/api/deleteProduct/${productID}`)
    .then((response)=>{
      setProducts((preProduct)=>preProduct.filter((product)=>ViewProduct._id!==productID))
      toast.success("Product Deleted successfully!", { position: "top-left" });

    }).catch((error)=>
    {
      console.log(error);
      toast.error("Error Deleting product!", { position: "top-left" });

    })
  }

  return (
    <div className="main">

    <Sidebar/>
      <div className="ProductTable">
      {/* <Link className="ADDP" to={"/add"}>Add Product</Link> */}
      <h1>Products </h1>
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>S.NO.</th>
            <th>Product Name</th>
            <th>Price ($)</th>
            <th>Stock</th>
            <th>Description</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            products.map((product, index)=>
            {
              return(
                   <tr key={product._id}>
                      <td>{index+1}</td>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                       <td>{product.stock}</td>
                       <td>{product.description}</td>
                       <td><img src={`http://localhost:8000/${product.imageUrl}`} alt={product.name} /></td>
                        <td>
                         <Link to={`/edit/`+product._id} className="button-link">Update</Link>
                         <button  onClick={()=>deleteProduct(product._id)}>
                            Remove</button>
                        </td>
                  </tr>
              )
            }
          )}
          
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default ViewProduct;