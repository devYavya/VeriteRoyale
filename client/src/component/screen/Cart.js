import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/Cart.css';
import { handleSuccess, handleError } from '../Utils';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const tok = localStorage.getItem('token');
    const id = localStorage.getItem('userId');
    const navigate = useNavigate();

    const fetchCartItems = useCallback(async () => {
        try {
            const response = await axios.get(`https://veriteroyale.onrender.com/cart/getcart/${id}`, {
                headers: {
                    Authorization: `Bearer ${tok}`,
                },
            });
            setCartItems(response.data);
            calculateTotal(response.data);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    }, [id, tok]);

    useEffect(() => {
        fetchCartItems();
    }, [fetchCartItems]);

    const calculateTotal = (items) => {
        const sum = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotal(sum);
    };

    const removeItem = async (productId) => {
        try {
            await axios.delete(`https://veriteroyale.onrender.com/cart/removeitem/${productId}`, {
                headers: {
                    Authorization: `Bearer ${tok}`,
                },
            });
            fetchCartItems(); // Re-fetch cart items after removing an item
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    const handleCheckout = async () => {
        try {
            handleSuccess('Redirecting to payment gateway...');
            await new Promise((resolve) => setTimeout(resolve, 2000));
            navigate('/Checkout');
        } catch (error) {
            console.error('Checkout error:', error);
            handleError('An error occurred while processing your checkout. Please try again.');
        }
    };

    return (
        <div className="cart-container">
            <h1>Your Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <>
                    {cartItems.map((item) => (
                        <div key={item.productId} className="cart-item">
                            <img
                                src={`https://veriteroyale.onrender.com/${item.imageUrl}`}
                                alt={item.name}
                            />
                            <div className="item-details">
                                <h3>{item.name}</h3>
                                <p>Price: ₹{item.price}</p>
                                <div className="quantity-control">
                                    {/* <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} disabled={item.quantity === 1}>-</button> */}
                                    <span>{item.quantity}</span>
                                    {/* <button onClick={() => updateQuantity(item.productId, item.quantity + 1)}>+</button> */}
                                </div>
                                <button onClick={() => removeItem(item.productId)}>Remove</button>
                            </div>
                        </div>
                    ))}
                    <div className="cart-summary">
                        <h2>Total: ₹{total.toFixed(2)}</h2>
                        <button
                            onClick={handleCheckout}
                            className="checkout-button"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
