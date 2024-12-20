import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../Utils';
import axios from 'axios';
import '../style/Checkout.css';
import { ToastContainer } from 'react-toastify';

const Checkout = () => {
    const navigate = useNavigate();
    const tok = localStorage.getItem('token');
    const id = localStorage.getItem('userId');
    const [cartItems, setCartItems] = useState([]);
    const [billingDetails, setBillingDetails] = useState({
        fullName: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        phone: ''
    });
    const [paymentMethod, setPaymentMethod] = useState('credit');
    const [totalAmount, setTotalAmount] = useState(0);

    const calculateTotal = (items) => {
        const sum = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        setTotalAmount(sum);
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const response = await axios.get('http://localhost:8000/cart/getcart/'+id, {
                headers: {
                    Authorization: `Bearer ${tok}`
                }
            });
            setCartItems(response.data);
            calculateTotal(response.data);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBillingDetails(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate form
        if (!billingDetails.fullName || !billingDetails.email || !billingDetails.address) {
            handleError('Please fill all required fields');
            return;
        }

        try {
            // Create order object
            const orderData = {
                address:billingDetails.address,
                userId: id
            };

            
            const response = await fetch('http://localhost:8000/orders/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                
                body: JSON.stringify(orderData)
            });
            handleSuccess('Order placed successfully!');

            const result = await response.json();
            // console.log(result);
            if (result.sucess) {
               
                localStorage.removeItem('cartItems');
                
                navigate('/');
            } else {
                handleError(result.message);
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
                                <input
                                    type="text"
                                    name="city"
                                    value={billingDetails.city}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>State</label>
                                <input
                                    type="text"
                                    name="state"
                                    value={billingDetails.state}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>ZIP Code</label>
                                <input
                                    type="text"
                                    name="zipCode"
                                    value={billingDetails.zipCode}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={billingDetails.phone}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="payment-section">
                            <h3>Payment Method</h3>
                            <div className="payment-options">
                                <label>
                                    <input
                                        type="radio"
                                        value="credit"
                                        checked={paymentMethod === 'credit'}
                                        onChange={handlePaymentMethodChange}
                                    />
                                    Credit Card
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        value="debit"
                                        checked={paymentMethod === 'debit'}
                                        onChange={handlePaymentMethodChange}
                                    />
                                    Debit Card
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        value="upi"
                                        checked={paymentMethod === 'upi'}
                                        onChange={handlePaymentMethodChange}
                                    />
                                    UPI
                                </label>
                            </div>
                        </div>

                        <button type="submit" className="place-order-btn">
                            Place Order (₹{totalAmount})
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
                                <h3>{item.name}</h3>
                                    <p>Quantity: {item.quantity}</p>
                                    <p>Price: ₹{item.price * item.quantity}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="total">
                        <h4>Total Amount: ₹{totalAmount}</h4>
                    </div>
                </div>
            </div>
            <ToastContainer/>

        </div>
    );
};

export default Checkout;
