import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => (
  <div className="about-page page-enter">
    {/* Hero */}
    <section className="about-hero">
      <div className="container">
        <div className="about-tag">🌸 Our Story</div>
        <h1>We Believe in Small Gifts, <span>Big Joy!</span></h1>
        <p>Scoopsy was born from a simple idea: little things really do make you smile. We curate the cutest Korean-inspired gifts so you always have the perfect cute thing to gift — or keep for yourself 💕</p>
      </div>
    </section>

    {/* Values */}
    <section className="container about-values">
      {[
        { emoji: '🎀', title: 'Cute. Trendy. Adorable.', desc: 'Every product we pick goes through a vibe check. If it doesn\'t make us go "aww", it doesn\'t make it to the shop.' },
        { emoji: '💕', title: 'Perfect for Every Occasion', desc: 'Birthdays, friendships, self-love, no-reason treats — Scoopsy has something for every moment that deserves a smile.' },
        { emoji: '📸', title: 'Insta-Worthy Packaging', desc: 'We care about the unboxing as much as the product. Every order is packed with love and extra cuteness.' },
        { emoji: '🌸', title: 'Because Every Little Thing Matters', desc: 'We\'re a small business run by people who genuinely believe that small gestures create the biggest memories.' },
      ].map((v, i) => (
        <div key={i} className="value-card">
          <div className="value-emoji">{v.emoji}</div>
          <h3>{v.title}</h3>
          <p>{v.desc}</p>
        </div>
      ))}
    </section>

    {/* Scoops */}
    <section className="about-scoops">
      <div className="container">
        <h2>What's a Scoop? 🍦</h2>
        <p className="about-sub">A Scoop is our curated gift box concept. DM us on Instagram to order a personalised scoop filled with surprise cuteness!</p>
        <div className="scoop-info-grid">
          {[
            { name: 'Mini Scoop', price: '₹149', emoji: '🧺', desc: '2–3 cute finds, perfect as a little gift' },
            { name: 'Medium Scoop', price: '₹249', emoji: '🛍️', desc: '4–5 cute items with variety' },
            { name: 'Large Scoop', price: '₹449', emoji: '🎁', desc: '6–8 items with extra goodies' },
            { name: 'Premium Scoop', price: '₹549', emoji: '👑', desc: '8–10 premium items, the ultimate cute haul' },
          ].map(s => (
            <div key={s.name} className="scoop-info-card">
              <span>{s.emoji}</span>
              <div>
                <strong>{s.name}</strong>
                <p>{s.desc}</p>
                <span className="scoop-info-price">{s.price}</span>
              </div>
            </div>
          ))}
        </div>
        <a href="https://instagram.com/scoopsy.official" target="_blank" rel="noreferrer" className="btn-primary about-ig-btn">
          📸 DM us @scoopsy.official
        </a>
      </div>
    </section>

    {/* CTA */}
    <section className="about-cta container">
      <div className="cta-box">
        <h2>Ready to Scoop Some Joy? 🎀</h2>
        <p>Browse our collection of cute Korean-inspired gifts and find your next favourite little thing.</p>
        <div className="cta-actions">
          <Link to="/products" className="btn-primary">Shop Now ✨</Link>
          <Link to="/register" className="btn-outline">Join Scoopsy 💕</Link>
        </div>
      </div>
    </section>
  </div>
);

export default About;
