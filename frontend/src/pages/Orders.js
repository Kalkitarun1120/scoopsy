import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config';
import './Orders.css';

const STATUS_COLORS = {
  placed: '#fff3cd',
  confirmed: '#d4f5e9',
  shipped: '#e6f0ff',
  delivered: '#d4f5e9',
  cancelled: '#fde8f0',
};

const STATUS_ICONS = {
  placed: '📋',
  confirmed: '✅',
  shipped: '🚚',
  delivered: '🎀',
  cancelled: '❌',
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_URL}/api/orders/my`)
      .then(({ data }) => setOrders(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading-spinner" style={{ minHeight: '60vh' }}>🎀</div>;

  return (
    <div className="orders-page page-enter">
      <div className="container">
        <h1 className="orders-title">My Orders 📦</h1>

        {orders.length === 0 ? (
          <div className="empty-state" style={{ textAlign: 'center', padding: '80px 20px' }}>
            <div className="empty-emoji">📦</div>
            <h3>No orders yet!</h3>
            <p>Time to add some cuteness to your life 💕</p>
            <Link to="/products" className="btn-primary" style={{ display: 'inline-block', marginTop: '16px' }}>
              Shop Now ✨
            </Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order._id} className="order-card">
                <div className="order-header">
                  <div>
                    <span className="order-id">Order #{order._id.slice(-8).toUpperCase()}</span>
                    <span className="order-date">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <div
                    className="order-status"
                    style={{ background: STATUS_COLORS[order.orderStatus] || '#fff3cd' }}
                  >
                    <span>{STATUS_ICONS[order.orderStatus]}</span>
                    <span style={{ textTransform: 'capitalize' }}>{order.orderStatus}</span>
                  </div>
                </div>

                <div className="order-items">
                  {order.items.map((item, i) => (
                    <div key={i} className="order-item">
                      <span className="oi-emoji">{item.emoji || '🎀'}</span>
                      <div className="oi-info">
                        <span>{item.name}</span>
                        <span>× {item.quantity}</span>
                      </div>
                      <span className="oi-price">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="order-footer">
                  <div className="order-meta">
                    <span>📍 {order.shippingAddress?.city}, {order.shippingAddress?.state}</span>
                    <span>💳 {order.paymentMethod}</span>
                  </div>
                  <div className="order-total">
                    Total: <strong>₹{order.totalAmount}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
