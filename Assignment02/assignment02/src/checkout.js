import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = location.state || { cart: [] };
  const [localCart, setLocalCart] = useState(cart);

  const removeFromCart = (productId) => {
    setLocalCart(currentCart => {
      const index = currentCart.findIndex(item => item.id === productId);
      if (index === -1) return;
      const newCart = [...currentCart];
      if (newCart[index].quantity > 1) {
        newCart[index].quantity -= 1;
      } else {
        newCart.splice(index, 1);
      }
      setLocalCart(newCart);
    });
  };

  return (
    <div>
      <h2>Checkout Page</h2>
      {localCart.length > 0 ? (
        <div className="column">
          {localCart.map((item) => (
            <div className="col-md-4 mb-4" key={item.id}>
              <div className="card">
                <img src={item.image} className="card-img-top" alt={item.title} />
                <div className="card-body">
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-text"><strong>Category:</strong> {item.category}</p>
                  <p className="card-text">{item.description}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-muted">Quantity: {item.quantity}</span>
                    <span className="text-muted price">${item.price.toFixed(2)}</span>
                    <button className="btn btn-danger" onClick={() => removeFromCart(item.id)}>-</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    <button className="btn btn-danger" onClick={() => navigate('/')}>Return to Shop</button>
      <Payment />
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
