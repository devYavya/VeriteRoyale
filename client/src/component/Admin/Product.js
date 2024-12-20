import React, { useState } from "react";
import "../style/Product.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import Sidebar from "./Sidebar";
import { handleSuccess } from '../Utils';

const Product = () => {
  const products = {
    name: "",
    price: "",
    discount: "",
    description: "",
    imageUrl: "",
    stock: ""
  };

  const [product, setProduct] = useState(products);
  const navigate = useNavigate();
  const [imagefile, setImagefile] = useState(null);
  const inputHandler = (e) => {
    const { name, value } = e.target;
    
    setProduct({ ...product, [name]: value });
    // console.log(product); 
  };

  const handleImage = (e) => {
    setImagefile(e.target.files[0]);
    product.imageUrl = imagefile;
  }

  const submitForm = async (e) => {
    const form = new FormData();
    form.append("imageUrl", imagefile);
    form.append("name", product.name);
    form.append("description", product.description);
    form.append("price", product.price);
    form.append("stock", product.stock);
    form.append("discount", product.discount);

    e.preventDefault();
    await axios.post("http://localhost:8000/api/create", form)
      .then((response) => {
        handleSuccess({msg:"Product Added Successfully!!.."});
        window.location.reload(true);
        navigate("/Product");
      }).catch(error => console.log(error));
  };

  return (
    <div className="main">
      <Sidebar/>

    <div className="addProduct">
       
      <Link to={"/"}> <i class="fa-solid fa-angle-left"></i></Link>
      <h3>Add New Product</h3>
      <form className="addproductform" onSubmit={submitForm} encType="multipart/form-data">
         <div className="inputGroupe">
          <label htmlFor="ProductName">ProductName</label>
          <input type="text" onChange={inputHandler} id="ProductName" name="name" autoComplete="off" placeholder="ProductName"/>
        </div>
        <div className="inputGroupe">
          <label htmlFor="PricePerUnit">Price</label>
          <input type="text" onChange={inputHandler} id="PricePerUnit" name="price" autoComplete="off" placeholder="Price Per Unit in $"/>
        </div>
        <div className="inputGroupe">
          <label htmlFor="Discount">Discount</label>
          <input type="text" onChange={inputHandler} id="Discount" name="discount" autoComplete="off" placeholder="Discount"/>
        </div>
        <div className="inputGroupe">
          <label htmlFor="Description">Description</label>
          <textarea onChange={inputHandler} id="Description" name="description" autoComplete="off" placeholder="Product Description"></textarea>
        </div>
        <div className="inputGroupe">
          <label htmlFor="Image">Image</label>
          <input type="file" onChange={handleImage} id="Image" name="imageUrl" autoComplete="off" />
        </div>
        <div className="inputGroupe">
          <label htmlFor="Stock">Stock</label>
          <input type="number" onChange={inputHandler} id="Stock" name="stock" autoComplete="off" placeholder="Stock Quantity"/>
        </div>
        <div className="inputGroupe" id="btn">
          <button type="submit"> Add Product</button>
        </div>
      </form>
      <ToastContainer/>
    </div>
    </div>
  );
};

export default Product;