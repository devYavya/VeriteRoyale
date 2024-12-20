import React, { useState, useEffect } from "react";
import "../style/Product.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import Sidebar from "./Sidebar";
import { handleError, handleSuccess } from '../Utils';

const Edit = () => {
  const { id } = useParams();
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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://veriteroyale.onrender.com/api/getOne/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, [id]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImage = (e) => {
    setImagefile(e.target.files[0]);
    product.imageUrl = imagefile;
  }

  const submitForm = async (e) => {
    e.preventDefault();
    
    const form = new FormData();
    if(imagefile) {
      form.append("imageUrl", imagefile);
    }
    form.append("name", product.name);
    form.append("description", product.description);
    form.append("price", product.price);
    form.append("stock", product.stock);
    form.append("discount", product.discount);

    try {
      await axios.put(`https://veriteroyale.onrender.com/api/update/${id}`, product);
      handleSuccess({msg:"Product Updated Successfully!!.."});
      navigate("/ViewProduct");
    } catch (error) {
      handleError({msg:"Error updating product"});
      console.log(error);
    }
  };

  return (
    <div className="main">
      <Sidebar/>

    <div className="addProduct">
       
      <Link to={"/ViewProduct"}> <i className="fa-solid fa-angle-left"></i></Link>
      <h3>Update Product</h3>
      <form className="addproductform" onSubmit={submitForm} encType="multipart/form-data">
         <div className="inputGroupe">
          <label htmlFor="ProductName">ProductName</label>
          <input 
            type="text" 
            onChange={inputHandler} 
            value={product.name}
            id="ProductName" 
            name="name" 
            autoComplete="off" 
            placeholder="ProductName"
          />
        </div>
        <div className="inputGroupe">
          <label htmlFor="PricePerUnit">Price</label>
          <input 
            type="text" 
            onChange={inputHandler} 
            value={product.price}
            id="PricePerUnit" 
            name="price" 
            autoComplete="off" 
            placeholder="Price Per Unit in $"
          />
        </div>
        <div className="inputGroupe">
          <label htmlFor="Discount">Discount</label>
          <input 
            type="text" 
            onChange={inputHandler}
            value={product.discount} 
            id="Discount" 
            name="discount" 
            autoComplete="off" 
            placeholder="Discount"
          />
        </div>
        <div className="inputGroupe">
          <label htmlFor="Description">Description</label>
          <textarea 
            onChange={inputHandler}
            value={product.description} 
            id="Description" 
            name="description" 
            autoComplete="off" 
            placeholder="Product Description"
          ></textarea>
        </div>
        <div className="inputGroupe">
          <label htmlFor="Image">Image</label>
          <input 
            type="file" 
            onChange={handleImage} 
            id="Image" 
            name="imageUrl" 
            autoComplete="off" 
          />
        </div>
        <div className="inputGroupe">
          <label htmlFor="Stock">Stock</label>
          <input 
            type="number" 
            onChange={inputHandler}
            value={product.stock} 
            id="Stock" 
            name="stock" 
            autoComplete="off" 
            placeholder="Stock Quantity"
          />
        </div>
        <div className="inputGroupe" id="btn">
          <button type="submit">Update Product</button>
        </div>
      </form>
      <ToastContainer/>
    </div>
    </div>
  );
};

export default Edit;