import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './Checkout.css';



function Checkout() {
  const navigate = useNavigate(); // Get the navigate function
  const location = useLocation();
  const { cart } = location.state || { cart: [] };
  const [localCart, setLocalCart] = useState(cart);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(localCart));
  }, [localCart]);


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

  



const Payment = () => {
  
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate(); // Get the navigate function

  const onSubmit = data => {
      console.log(data);
      navigate('/confirmation', { state: { cart: localCart, userData: data } });
    
  };

  return (
    <div className="payment-form">
      <h2>Payment Information</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input {...register("fullName", { required: true })} />
          {errors.fullName && <span>This field is required</span>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input {...register("email", {
            required: true,
            pattern: {
              value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
              message: "Invalid email address"
            }
          })} />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div>
          <label htmlFor="cardNumber">Card Number</label>
          <input {...register("cardNumber", {
            required: true,
            pattern: {
              value: /^\d{16}$/,
              message: "Invalid card number"
            }
          })} />
          {errors.cardNumber && <span>{errors.cardNumber.message}</span>}
        </div>
        <div>
          <label htmlFor="address1">Address 1</label>
          <input {...register("address1", { required: true })} />
          {errors.address1 && <span>This field is required</span>}
        </div>
        <div>
          <label htmlFor="address2">Address 2</label>
          <input {...register("address2")} />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input {...register("city", { required: true })} />
          {errors.city && <span>This field is required</span>}
        </div>
        <div>
          <label htmlFor="state">State</label>
          <input {...register("state", { required: true })} />
          {errors.state && <span>This field is required</span>}
        </div>
        <div>
          <label htmlFor="zip">Zip</label>
          <input {...register("zip", {
            required: true,
            pattern: {
              value: /^\d{5}$/,
              message: "Invalid zip code"
            }
          })} />
          {errors.zip && <span>{errors.zip.message}</span>}
        </div>
        <button type="submit" className="btn btn-primary">Submit Payment</button>
      </form>
    </div>
  );
}
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
export default Checkout;
