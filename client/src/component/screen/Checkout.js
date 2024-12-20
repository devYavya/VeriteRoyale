import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../Utils';
import axios from 'axios';
import '../style/Checkout.css';
import { ToastContainer } from 'react-toastify';

const Checkout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const [cartItems, setCartItems] = useState([]);
  const [billingDetails, setBillingDetails] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [totalAmount, setTotalAmount] = useState(0);

  // Fetch cart items
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8000/cart/getcart/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(data);
        const sum = data.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotalAmount(sum);
      } catch (error) {
        handleError('Failed to load cart items. Please try again later.');
      }
    };

    fetchCartItems();
  }, [token, userId]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Handle order submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, email, address } = billingDetails;

    if (!fullName || !email || !address) {
      handleError('Please fill all required fields');
      return;
    }

    const orderData = {
      address: billingDetails.address,
      userId,
    };

    try {
      const { data } = await axios.post('http://localhost:8000/orders/create', orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        handleSuccess('Order placed successfully!');
        navigate('/');
      } else {
        handleError(data.message || 'Order placement failed. Please try again.');
      }
    } catch (error) {
      handleError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="checkout-content">
        <div className="billing-section">
          <h3>Billing Details</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={billingDetails.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={billingDetails.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Address *</label>
              <textarea
                name="address"
                value={billingDetails.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input type="text" name="city" value={billingDetails.city} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>State</label>
                <input type="text" name="state" value={billingDetails.state} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>ZIP Code</label>
                <input type="text" name="zipCode" value={billingDetails.zipCode} onChange={handleInputChange} />
              </div>
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input type="tel" name="phone" value={billingDetails.phone} onChange={handleInputChange} />
            </div>
            <div className="payment-section">
              <h3>Payment Method</h3>
              <div className="payment-options">
                {['credit', 'debit', 'upi'].map((method) => (
                  <label key={method}>
                    <input
                      type="radio"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    {method.charAt(0).toUpperCase() + method.slice(1)} Card
                  </label>
                ))}
              </div>
            </div>
            <button type="submit" className="place-order-btn">
              Place Order (₹{totalAmount.toFixed(2)})
            </button>
          </form>
        </div>
        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.productId} className="cart-item">
                <img src={`http://localhost:8000/${item.imageUrl}`} alt={item.name} />
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ₹{item.price * item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="total">
            <h4>Total Amount: ₹{totalAmount.toFixed(2)}</h4>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Checkout;
