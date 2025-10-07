import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { HashLink as Link } from "react-router-hash-link";
import "./Cart.css";

function Cart({ cartItems, removeFromCart, clearCart, setCartItems }) {
  const [notification, setNotification] = useState("");

  const increaseQty = (index) => {
    const newCart = [...cartItems];
    newCart[index].quantity++;
    setCartItems(newCart);
  };

  const decreaseQty = (index) => {
    const newCart = [...cartItems];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity--;
      setCartItems(newCart);
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    setNotification("Order placed successfully!");
    setTimeout(() => setNotification(""), 3000);
    clearCart();
  };

  const handleClearCart = () => {
    if (cartItems.length === 0) return;
    setNotification("Cart cleared!");
    setTimeout(() => setNotification(""), 3000);
    clearCart();
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const deliveryFee = subtotal > 0 ? 30 : 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      <p className="cart-subtitle">Review and checkout your items</p>

      {notification && <div className="cart-notification">{notification}</div>}

      {cartItems.length === 0 ? (
        <div>
          <p className="empty-text">Your cart is empty.</p>
          <Link to="/more-foods" className="browse-btn">
            Browse Foods
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items-container">
            <ul className="cart-items">
              {cartItems.map((item, index) => (
                <li key={index} className="cart-item">
                  <img src={item.img} alt={item.name} />
                  <div className="cart-item-info">
                    <h4>{item.name}</h4>
                    <p>₹{item.price.toFixed(2)}</p>
                    <div className="qty-controls">
                      <button onClick={() => decreaseQty(index)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => increaseQty(index)}>+</button>
                    </div>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(index)}
                  >
                    <FaTrash />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="order-summary-side">
            <h3>Order Summary</h3>
            <div className="summary-line">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-line">
              <span>Delivery Fee</span>
              <span>₹{deliveryFee.toFixed(2)}</span>
            </div>
            <hr />
            <div className="summary-line total">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            <div className="cart-buttons">
              <button className="checkout-btn" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
              <button className="clear-btn" onClick={handleClearCart}>
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
