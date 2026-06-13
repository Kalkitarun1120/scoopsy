import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, user } = useApp();
  const navigate = useNavigate();

  const shipping = cartTotal >= 499 ? 0 : 49;

  if (cart.length === 0) {
    return (
      <div className="cart-empty page-enter">
        <div className="empty-emoji">🛒</div>
        <h2>Your cart is empty!</h2>
        <p>Add some cute things to make it happy 💕</p>
        <Link to="/products" className="btn-primary">Shop Now ✨</Link>
      </div>
    );
  }

  return (
    <div className="cart-page page-enter">
      <div className="container">
        <h1 className="cart-title">Your Cart 🛒</h1>
        <p className="cart-sub">{cart.length} item{cart.length !== 1 ? 's' : ''} of cuteness</p>

        <div className="cart-layout">
          {/* Items */}
          <div className="cart-items">
            {cart.map(item => (
              <div key={item._id} className="cart-item">
                <div className="cart-item-image">
                  <span>{item.emoji || '🎀'}</span>
                </div>
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>₹{item.price} each</p>
                </div>
                <div className="cart-item-controls">
                  <div className="cart-qty">
                    <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                  </div>
                  <span className="item-subtotal">₹{item.price * item.quantity}</span>
                  <button className="remove-btn" onClick={() => removeFromCart(item._id)}>🗑️</button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="cart-summary">
            <div className="summary-card">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{cartTotal}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? <span className="free-ship">FREE 🎉</span> : `₹${shipping}`}</span>
              </div>
              {shipping > 0 && (
                <div className="free-ship-note">Add ₹{499 - cartTotal} more for free shipping!</div>
              )}
              <div className="summary-divider" />
              <div className="summary-total">
                <span>Total</span>
                <span>₹{cartTotal + shipping}</span>
              </div>

              <button
                className="btn-primary checkout-btn"
                onClick={() => {
                  if (!user) { navigate('/login'); return; }
                  navigate('/checkout');
                }}
              >
                Proceed to Checkout 💕
              </button>
              <Link to="/products" className="continue-link">← Continue Shopping</Link>

              <div className="secure-note">
                🔒 Secure Checkout &nbsp; ✅ Quality Guaranteed
              </div>
            </div>

            <div className="scoop-promo">
              <div className="scoop-promo-icon">🎁</div>
              <div>
                <strong>Try a Scoop Gift Box!</strong>
                <p>Curated surprise gift boxes starting at ₹149</p>
                <a href="https://instagram.com/scoopsy.official" target="_blank" rel="noreferrer">DM us on Instagram 📩</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
