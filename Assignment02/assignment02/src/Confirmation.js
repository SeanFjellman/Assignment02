import React from 'react';
import { useState, useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import './Confirmation.css'; // Assuming you have a separate CSS file for styling

function Confirmation() {
  const { state } = useLocation();
  const { cart, userData } = state;
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the cart from localStorage
    localStorage.removeItem('cart');
  }, []);

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  const redactedCardNumber = userData.cardNumber.replace(/\d{12}(\d{4})/, '************$1');

  const handleReturnToShop = () => {
    navigate('/');
  };

  

  return (
    <div className="confirmation-container">
      <h2>Order Confirmation</h2>
      <div className="user-info">
        <h3>User Information</h3>
        <p>Name: {userData.fullName}</p>
        <p>Email: {userData.email}</p>
        <p>Card Number: {redactedCardNumber}</p>
        <p>Address: {userData.address1} {userData.address2 ? `, ${userData.address2}` : ''}</p>
        <p>City: {userData.city}</p>
        <p>State: {userData.state}</p>
        <p>Zip: {userData.zip}</p>
      </div>
      <div className="purchased-items">
        <h3>Purchased Items</h3>
        {cart.map((item) => (
          <div key={item.id} className="item">
            <img src={item.image} alt={item.title} className="item-image" />
            <div className="item-info">
              <h4>{item.title}</h4>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
        <div className="total-amount">
          <h4>Total Amount: ${totalAmount}</h4>
        </div>
      </div>
      <button className="btn btn-primary" onClick={handleReturnToShop}>Return to Shop</button>
    </div>
  );
}

export default Confirmation;
