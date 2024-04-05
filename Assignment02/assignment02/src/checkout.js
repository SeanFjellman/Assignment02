import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './Checkout.css';


function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = location.state || { cart: [] };
  const [localCart, setLocalCart] = useState(cart);

  const removeFromCart = (productId) => {
    setLocalCart((currentCart) => {
      const index = currentCart.findIndex((item) => item.id === productId);
      if (index === -1) return [...currentCart]; // Return a copy of the current cart if the product is not found
      const newCart = [...currentCart];
      if (newCart[index].quantity > 1) {
        newCart[index].quantity -= 1;
      } else {
        newCart.splice(index, 1);
      }
      return newCart; // Always return a new array
    });
  };
  

  const calculateTotal = () => {
    return localCart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <Payment />
        <div className="cart-summary">
          <h2>Cart Summary</h2>
          {localCart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} className="cart-item-image" />
              <div className="cart-item-info">
                <h4>{item.title}</h4>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <button className="btn btn-danger" onClick={() => removeFromCart(item.id)}>-</button>
              </div>
            </div>
          ))}
          <button className="btn btn-danger" onClick={() => navigate('/')}>Return to Shop</button>
          <div className="cart-total">
            <h3>Total: ${calculateTotal()}</h3>
          </div>
        </div>
      </div>
      
    </div>
  );
}



function Payment() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = data => {
    console.log(data);
    // Process payment information here
    alert('Payment submitted! Check console for data.');
  };

  return (
    <div className="checkout-container"> {/* Flex container */}
      <div className="cart-items-container"> {/* Cart items container */}
        {/* Cart items listing */}
      </div>
      <div className="payment-container"> {/* Payment form container */}
        <h2>Payment Information</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div>
            <label htmlFor="Fullname">Full Name</label>
            <input {...register("Fullname", { required: true })} />
            {errors.Fullname && <span>This field is required</span>}
          </div>
        
          <div>
            <label htmlFor="cardNumber">Card Number</label>
            <input {...register("cardNumber", { required: true })} />
            {errors.cardNumber && <span>This field is required</span>}
          </div>
          <div>
            <label htmlFor="Adress">Adress</label>
            <input {...register("Adress", { required: true })} />
            {errors.Adress && <span>This field is required</span>}
          </div>
          <div>
            <label htmlFor="Address2">Address 2</label>
            <input {...register("cvc", { required: true })} />
          </div>
          <div>
            <label htmlFor="City">City</label>
            <input {...register("City", { required: true })} />
            {errors.City && <span>This field is required</span>}
          </div>
          <div>
            <label htmlFor="State">State</label>
            <input {...register("State", { required: true })} />
            {errors.State && <span>This field is required</span>}
          </div>
          <div>
            <label htmlFor="Zip">Zip</label>
            <input {...register("Zip", { required: true })} />
            {errors.Zip && <span>This field is required</span>}
          </div>
          <button type="submit" className="btn btn-primary">Submit Payment</button>
        </form>
      </div>
    </div>
  );
  
}

export default Checkout;
