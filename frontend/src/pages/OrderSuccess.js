import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './OrderSuccess.css';

const OrderSuccess = () => {
  const { id } = useParams();

  return (
    <div className="success-page page-enter">
      <div className="success-card">
        <div className="success-animation">
          <span className="success-emoji">🎀</span>
          <div className="success-confetti">
            {['🌸','💕','✨','⭐','🎉','💖','🌟','🎀'].map((e, i) => (
              <span key={i} style={{ animationDelay: `${i * 0.2}s` }}>{e}</span>
            ))}
          </div>
        </div>

        <h1>Order Placed! 🎉</h1>
        <p className="success-msg">
          Yay! Your cute things are on their way! We'll deliver your order with lots of love 💕
        </p>

        <div className="order-id-box">
          <span>Order ID</span>
          <strong>#{id?.slice(-8).toUpperCase()}</strong>
        </div>

        <div className="success-steps">
          <div className="step active">
            <span>✅</span>
            <div>
              <strong>Order Placed</strong>
              <p>We've received your order!</p>
            </div>
          </div>
          <div className="step-line" />
          <div className="step">
            <span>📦</span>
            <div>
              <strong>Packing</strong>
              <p>Getting your cute items ready</p>
            </div>
          </div>
          <div className="step-line" />
          <div className="step">
            <span>🚚</span>
            <div>
              <strong>Shipped</strong>
              <p>On its way to you!</p>
            </div>
          </div>
          <div className="step-line" />
          <div className="step">
            <span>🎀</span>
            <div>
              <strong>Delivered</strong>
              <p>Big joy unlocked!</p>
            </div>
          </div>
        </div>

        <div className="success-actions">
          <Link to="/orders" className="btn-primary">Track Order 📦</Link>
          <Link to="/products" className="btn-outline">Shop More ✨</Link>
        </div>

        <p className="success-follow">
          Share your haul with us 📸{' '}
          <a href="https://instagram.com/scoopsy.official" target="_blank" rel="noreferrer">
            @scoopsy.official
          </a>
        </p>
      </div>
    </div>
  );
};

export default OrderSuccess;
