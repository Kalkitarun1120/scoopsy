import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import './Home.css';

const CATEGORIES = [
  { id: 'keychains', label: 'Keychains', emoji: '🔑', color: '#ffe4e1' },
  { id: 'bracelets', label: 'Bracelets', emoji: '💎', color: '#e6e6fa' },
  { id: 'goggles', label: 'Goggles', emoji: '🕶️', color: '#fff0f5' },
  { id: 'accessories', label: 'Accessories', emoji: '🎀', color: '#ffe4b5' },
  { id: 'plushies', label: 'Plushies', emoji: '🧸', color: '#f0fff0' },
  { id: 'stationery', label: 'Stationery', emoji: '✏️', color: '#e6f0ff' },
  { id: 'bags', label: 'Bags', emoji: '👜', color: '#fff0e6' },
  { id: 'beauty', label: 'Beauty', emoji: '💋', color: '#ffe4f0' },
];

const SCOOPS = [
  { name: 'Mini Scoop', price: 149, desc: 'Little cute finds for little joy!', emoji: '🧺', color: '#ffe4e1' },
  { name: 'Medium Scoop', price: 249, desc: 'More cuteness, more happiness!', emoji: '🛍️', color: '#e6e6fa' },
  { name: 'Large Scoop', price: 449, desc: 'Extra goodies, extra smiles!', emoji: '🎁', color: '#fff0e6' },
  { name: 'Premium Scoop', price: 549, desc: 'The ultimate scoop of love & surprises!', emoji: '👑', color: '#fff3cd', featured: true },
];

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/products?featured=true&limit=8')
      .then(({ data }) => setFeatured(data.products))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="home page-enter">
      {/* Hero */}
      <section className="hero">
        <div className="hero-sparkles">
          {['✨','🌸','💕','⭐','🎀','💫','🌟','🩷'].map((s, i) => (
            <span key={i} className="sparkle" style={{ animationDelay: `${i * 0.4}s`, left: `${10 + i * 11}%` }}>{s}</span>
          ))}
        </div>
        <div className="hero-content container">
          <div className="hero-tag">🎀 Cute Mini Korean Gifts</div>
          <h1 className="hero-title">
            Small Gifts,<br />
            <span className="hero-highlight">Big Joy!</span>
          </h1>
          <p className="hero-sub">Little things that make you smile — keychains, bracelets, goggles, plushies & more. Cute. Trendy. Adorable. 💕</p>
          <div className="hero-actions">
            <Link to="/products" className="btn-primary hero-btn">Shop Now ✨</Link>
            <Link to="/products?featured=true" className="btn-outline hero-btn">Featured Picks 🌸</Link>
          </div>
          <div className="hero-stats">
            <div className="stat"><strong>500+</strong><span>Happy Customers</span></div>
            <div className="stat-divider" />
            <div className="stat"><strong>100+</strong><span>Cute Products</span></div>
            <div className="stat-divider" />
            <div className="stat"><strong>4.9⭐</strong><span>Avg. Rating</span></div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-float-items">
            {['🎀','🧸','💎','🕶️','🐰','💋','✨','🌸'].map((e, i) => (
              <span key={i} className="float-emoji" style={{ animationDelay: `${i * 0.5}s`, animationDuration: `${3 + i * 0.3}s` }}>{e}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="trust-bar">
        <div className="container trust-inner">
          {[
            { icon: '🎁', text: 'Korean Cute Finds' },
            { icon: '💕', text: 'Perfect for Every Occasion' },
            { icon: '📸', text: 'Insta-Worthy Gifts' },
            { icon: '😊', text: 'Made to Make You Happy' },
            { icon: '🚚', text: 'Fast Delivery' },
          ].map((b, i) => (
            <div key={i} className="trust-badge">
              <span>{b.icon}</span>
              <span>{b.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="section container">
        <div className="section-header">
          <h2 className="section-title">Shop by Category 🌸</h2>
          <Link to="/products" className="see-all">See All →</Link>
        </div>
        <div className="categories-grid">
          {CATEGORIES.map(cat => (
            <Link key={cat.id} to={`/products?category=${cat.id}`} className="category-card" style={{ background: cat.color }}>
              <span className="cat-emoji">{cat.emoji}</span>
              <span className="cat-label">{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="section container">
        <div className="section-header">
          <h2 className="section-title">Featured Picks 💕</h2>
          <Link to="/products?featured=true" className="see-all">See All →</Link>
        </div>
        {loading ? (
          <div className="loading-spinner">🎀</div>
        ) : (
          <div className="products-grid">
            {featured.map(p => <ProductCard key={p._id} product={p} />)}
          </div>
        )}
      </section>

      {/* Scoops Section */}
      <section className="scoops-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Choose Your Scoop 🍦</h2>
            <p className="section-sub">Curated gift boxes — perfect for you or your loved ones!</p>
          </div>
          <div className="scoops-grid">
            {SCOOPS.map(scoop => (
              <div key={scoop.name} className={`scoop-card ${scoop.featured ? 'scoop-featured' : ''}`} style={{ background: scoop.color }}>
                {scoop.featured && <div className="scoop-crown">👑 Best Value</div>}
                <div className="scoop-emoji">{scoop.emoji}</div>
                <h3>{scoop.name}</h3>
                <p>{scoop.desc}</p>
                <div className="scoop-price">₹{scoop.price}/-</div>
                <a href="https://instagram.com/scoopsy.official" target="_blank" rel="noreferrer" className="btn-primary scoop-btn">
                  DM to Order 📩
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="banner-section container">
        <div className="banner">
          <div className="banner-content">
            <h2>Because Every Little Thing Matters 🌸</h2>
            <p>Follow us @scoopsy.official for new drops, giveaways & all the cute things!</p>
            <div className="banner-actions">
              <Link to="/products" className="btn-primary">Shop Now ✨</Link>
              <a href="https://instagram.com/scoopsy.official" target="_blank" rel="noreferrer" className="btn-outline banner-ig">📸 Follow Us</a>
            </div>
          </div>
          <div className="banner-emojis">
            {['🎀','💕','🌸','✨','🧸','💎','🕶️','🐰'].map((e, i) => (
              <span key={i} style={{ animationDelay: `${i * 0.3}s` }}>{e}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
