import React, { useState, useEffect } from 'react';
import products from './products.json';
import './index.css';
import { Categories } from './Categories';
import { useNavigate } from 'react-router-dom';



const Shop = () => {
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All'); // New state for active category
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);
  
 
  // Function to add a product to the cart
  const addToCart = (productToAdd) => {
    setCart((currentCart) => {
      const found = currentCart.find((item) => item.id === productToAdd.id);
      if (found) {
        // Increase quantity if found
        return currentCart.map((item) =>
          item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Add new item with quantity=1 if not found
        return [...currentCart, { ...productToAdd, quantity: 1 }];
      }
    });
  };
  // Removes a product from the cart, decrementing quantity or removing if it hits 0
  const removeFromCart = (productToRemove) => {
    setCart((currentCart) => {
      const found = currentCart.find((item) => item.id === productToRemove.id);
      if (found && found.quantity === 1) {
        // Remove item if quantity is 1
        return currentCart.filter((item) => item.id !== productToRemove.id);
      } else {
        // Decrease quantity by 1
        return currentCart.map((item) =>
          item.id === productToRemove.id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
    });
  };

  // Calculates the total price of the cart
  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  };

  
  const [isDarkMode, setIsDarkMode] = useState(false); // State to manage dark mode

  const filteredProducts = products.filter((product) => {
    return (
      (activeCategory === 'All' || product.category === activeCategory) &&
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });


  Categories.map(function(name){return 'Hi '+name});

  // Toggle dark mode by setting a data-theme attribute on the body tag
  useEffect(() => {
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Map products to list items
  const listItems = products.map((product) => (
    <div className="col-md-4 mb-4" key={product.id}>
      <div className="card">
        <img src={product.image} className="card-img-top" alt={product.title} />
        <div className="card-body">
          <h3 className="card-title">{product.title}</h3>
          <p className="card-text"><strong>{product.category}</strong></p>
          <p className="card-text">{product.description}</p>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <button className="btn btn-info mr-2" onClick={() => addToCart(product)}>+</button>
              <button className="btn btn-danger" onClick={() => removeFromCart(product)}>-</button>
            </div>
            <span className="text-muted price">${product.price.toFixed(2)}</span>

          </div>
        </div>
      </div>
    </div>
  ));
  const updateQuantity = (item, newQuantity) => {


    

    const quantity = parseInt(newQuantity, 10);
  
    if (quantity === 0) {
      // Remove the item from the cart if the quantity is 0
      setCart((currentCart) => currentCart.filter((cartItem) => cartItem.id !== item.id));
    } else {
      // Update the quantity of the item in the cart
      setCart((currentCart) => {
        return currentCart.map((cartItem) => {
          if (cartItem.id === item.id) {
            return { ...cartItem, quantity: quantity };
          }
          return cartItem;
        });
      });
    }
  };
  
  
  return (
    <div className="container mt-5">
      <div className="mb-3">
        {/* Search Bar */}
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {/* Clear Search Button */}
        <button
          className="btn btn-secondary mb-3"
          onClick={() => setSearchQuery('')}
        >
          Clear Search
        </button>
        {/* Category buttons */}
        <div className="mb-3 buttons-container">
  <button className={`btn ${activeCategory === 'All' ? 'btn-primary' : 'btn-secondary'} full-width-button`} onClick={() => setActiveCategory('All')}>All Categories</button>
  {Categories.map(category => (
    <button
      key={category}
      className={`btn ${activeCategory === category ? 'btn-primary' : 'btn-secondary'} full-width-button`}
      onClick={() => setActiveCategory(category)}>
      {category}
    </button>
  ))}
</div>
  
      <h2>Game of the Year Store</h2>
  
      {/* Product Listing */}
      <div className="row">
        {filteredProducts.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <div className="card">
              <img src={product.image} className="card-img-top" alt={product.title} />
              <div className="card-body">
                <h3 className="card-title">{product.title}</h3>
                <p className="card-text"><strong>Category:</strong> {product.category}</p>
                <p className="card-text">{product.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <button className="btn btn-info mr-2" onClick={() => addToCart(product)}>+</button>
                    <button className="btn btn-danger" onClick={() => removeFromCart(product)}>-</button>
                  </div>
                  <span className="text-muted price">${product.price.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
  
          {/* Dark Mode Toggle */}
          <button className="btn btn-dark mr-2" onClick={() => setIsDarkMode(true)}>Dark Mode On</button>
        <button className="btn btn-light" onClick={() => setIsDarkMode(false)}>Dark Mode Off</button>
      </div>
      {/* Cart Summary */}
<div className="mt-5">
  <div className="card">
    <div className="card-header">Cart Summary</div>
    <div className="card-body">
      {cart.length > 0 ? (
        <ul className="list-unstyled">
        {cart.map((item) => (
          <li key={item.id} className="d-flex align-items-center">
            {item.title} - Quantity:
            <input
              type="number"
              className="form-control mx-2"
              value={item.quantity}
              onChange={(e) => updateQuantity(item, e.target.value)}
              min="0"
              style={{ width: `${Math.max(3, item.quantity.toString().length + 5)}ch` }}
            />
          </li>
        ))}
      </ul>
      
      ) : (
        <p>Your cart is empty.</p>
      )}
      <p>Total Items: {cart.reduce((acc, item) => acc + item.quantity, 0)}</p>
      <p>Total Price: ${calculateTotal()}</p>
      <button className="btn btn-primary" onClick={() => navigate('/checkout', { state: { cart: cart } })}>CHECKOUT</button>
    </div>
  </div>
</div>


    </div>
  );
  
};

export default Shop;
