import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/Fragrances.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../Utils';


const Fragrances = () => {
  const [cart, setCart] = useState([]);
  const [fragrances, setFragrances] = useState([]);
  const tok = localStorage.getItem('token'); 

  useEffect(() => {
    const fetchFragrances = async () => {
      try {

        const response = await axios.get('http://localhost:8000/api/getAll');
        setFragrances(response.data);
      } catch (error) {
        handleError('OOPS!! Something went Wrong....');
      }
    };
    fetchFragrances();
  }, []);


  const addToCart = async (product) => {
    try {
      if (!tok) {
        alert('Please login to add items to the cart.');
        return;
      }
  
      const userId = localStorage.getItem('userId'); 
      // console.log(userId);
       await axios.post(
        'http://localhost:8000/cart/addtocart',
        {
          userId, 
          productId: product._id,
        },
        {
          headers: {
            Authorization: `Bearer ${tok}`,
          },
        }
      );
      setCart([...cart, product]);
      handleSuccess(`${product.name} has been added to your cart!`);
      // alert(`${product.name} has been added to your cart!`);
    } catch (error) {
      // console.error('Error adding to cart:', error);
      // alert('Failed to add item to cart.');
      handleError('Failed to add item to cart....');

    }
  };

  return (
    <div className="fragrances-container">
      <div className="fragrances-grid">
        {fragrances.map((fragrance) => (
          <div key={fragrance.id} className="fragrance-card">
            <img
              src={`http://localhost:8000/${fragrance.imageUrl}`}
              alt={fragrance.name}
            />
            <h2>{fragrance.name}</h2>
            <p>{fragrance.description}</p>
            <br />
            {tok == null ? (
              ''
            ) : (
              <button
                onClick={() => addToCart(fragrance)}
                className="cart-icon-button"
              >
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  className="cart-icon"
                />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Optionally, display cart items */}
      {/* <div className="cart">
        <h3>Cart</h3>
        <ul>
          {cart.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      </div> */}
      <ToastContainer/>
    </div>
  );
};

export default Fragrances;
