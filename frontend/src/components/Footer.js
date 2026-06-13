import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer-top container">
      <div className="footer-brand">
        <div className="footer-logo">
          <span>🎀</span>
          <span className="footer-logo-text">Scoopsy</span>
        </div>
        <p>Cute Mini Korean Gifts bringing big joy to your everyday moments. Small things that make you smile! 💕</p>
        <div className="social-links">
          <a href="https://instagram.com/scoopsy.official" target="_blank" rel="noreferrer" className="social-btn">📸 Instagram</a>
          {/* <a href="#" className="social-btn">💬 WhatsApp</a> */}
        </div>
      </div>

      <div className="footer-col">
        <h4>Shop</h4>
        <Link to="/products?category=keychains">🔑 Keychains</Link>
        <Link to="/products?category=bracelets">💎 Bracelets</Link>
        <Link to="/products?category=goggles">🕶️ Goggles</Link>
        <Link to="/products?category=accessories">🎀 Accessories</Link>
        <Link to="/products?category=plushies">🧸 Plushies</Link>
        <Link to="/products?category=beauty">💋 Beauty</Link>
      </div>

      <div className="footer-col">
        <h4>Help</h4>
        <Link to="/about">About Us</Link>
        <Link to="/orders">Track Order</Link>
        {/* <a href="#">Shipping Policy</a>
        <a href="#">Return Policy</a>
        <a href="#">Contact Us</a>
        <a href="#">FAQs</a> */}
      </div>

      <div className="footer-col">
        <h4>Choose Your Scoop</h4>
        <div className="scoop-list">
          <div className="scoop-item"><span>Mini Scoop</span><span>₹149</span></div>
          <div className="scoop-item"><span>Medium Scoop</span><span>₹249</span></div>
          <div className="scoop-item"><span>Large Scoop</span><span>₹449</span></div>
          <div className="scoop-item premium-scoop"><span>Premium Scoop 👑</span><span>₹549</span></div>
        </div>
        <p className="scoop-note">DM us on Instagram to order a curated scoop gift box!</p>
      </div>
    </div>

    <div className="footer-bottom container">
      <p>© 2026 Scoopsy. Made with 💖 | Cute. Trendy. Adorable.</p>
      <p>Because every little thing matters 🌸</p>
    </div>
  </footer>
);

export default Footer;
