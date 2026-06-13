import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config';
import toast from 'react-hot-toast';
import { useApp } from '../context/AppContext';
import './Checkout.css';

const Checkout = () => {
  const { cart, cartTotal, clearCart, user } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: user?.name || '',
    phone: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'COD'
  });
  const [loading, setLoading] = useState(false);

  const shipping = cartTotal >= 499 ? 0 : 49;
  const total = cartTotal + shipping;

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.street || !form.city || !form.pincode) {
      toast.error('Please fill all required fields!');
      return;
    }
    setLoading(true);
    try {
      const orderData = {
        items: cart.map(i => ({ product: i._id, name: i.name, price: i.price, quantity: i.quantity, emoji: i.emoji })),
        shippingAddress: { name: form.name, phone: form.phone, street: form.street, city: form.city, state: form.state, pincode: form.pincode },
        totalAmount: total,
        paymentMethod: form.paymentMethod
      };
      const { data } = await axios.post(`${API_URL}/api/orders`, orderData);
       await clearCart();
      toast.success('Order placed successfully! 🎀');
      navigate(`/order-success/${data._id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page page-enter">
      <div className="container">
        <h1 className="checkout-title">Checkout 💕</h1>
        <div className="checkout-layout">
          <div className="checkout-form">
            <div className="form-section">
              <h3>Shipping Details 📦</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" />
                </div>
                <div className="form-group">
                  <label>Phone *</label>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="10-digit number" />
                </div>
                <div className="form-group full">
                  <label>Street Address *</label>
                  <input name="street" value={form.street} onChange={handleChange} placeholder="House no., Street, Area" />
                </div>
                <div className="form-group">
                  <label>City *</label>
                  <input name="city" value={form.city} onChange={handleChange} placeholder="City" />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <input name="state" value={form.state} onChange={handleChange} placeholder="State" />
                </div>
                <div className="form-group">
                  <label>Pincode *</label>
                  <input name="pincode" value={form.pincode} onChange={handleChange} placeholder="6-digit pincode" />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Payment Method 💳</h3>
              <div className="payment-options">
                {[
                  { value: 'COD', label: 'Cash on Delivery', emoji: '💵', desc: 'Pay when you receive' },
                  { value: 'UPI', label: 'UPI Payment', emoji: '📱', desc: 'PhonePe, GPay, Paytm' },
                ].map(opt => (
                  <label key={opt.value} className={`payment-option ${form.paymentMethod === opt.value ? 'selected' : ''}`}>
                    <input type="radio" name="paymentMethod" value={opt.value} checked={form.paymentMethod === opt.value} onChange={handleChange} />
                    <span className="pay-emoji">{opt.emoji}</span>
                    <div>
                      <strong>{opt.label}</strong>
                      <span>{opt.desc}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="checkout-summary">
            <h3>Order Items</h3>
            <div className="checkout-items">
              {cart.map(item => (
                <div key={item._id} className="checkout-item">
                  <span className="co-emoji">{item.emoji}</span>
                  <div className="co-info">
                    <span>{item.name}</span>
                    <span>× {item.quantity}</span>
                  </div>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="co-summary-rows">
              <div className="co-row"><span>Subtotal</span><span>₹{cartTotal}</span></div>
              <div className="co-row"><span>Shipping</span><span>{shipping === 0 ? 'FREE 🎉' : `₹${shipping}`}</span></div>
              <div className="co-row total"><span>Total</span><span>₹{total}</span></div>
            </div>
            <button className="btn-primary place-order-btn" onClick={handleSubmit} disabled={loading}>
              {loading ? '⏳ Placing...' : `Place Order ₹${total} 💕`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
