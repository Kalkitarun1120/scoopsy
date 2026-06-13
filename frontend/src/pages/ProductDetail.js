import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config';
import { useApp } from '../context/AppContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart, toggleWishlist, wishlist } = useApp();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setLoading(true);
    axios.get(`${API_URL}/api/products/${id}`)
      .then(({ data }) => setProduct(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="loading-spinner" style={{ minHeight: '60vh' }}>🎀</div>;
  if (!product) return <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}><h2>Product not found 🥺</h2><Link to="/products">← Back to Shop</Link></div>;

  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
  const isWishlisted = wishlist.includes(product._id);

  return (
    <div className="product-detail-page page-enter">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Home</Link> <span>›</span>
          <Link to="/products">Products</Link> <span>›</span>
          <Link to={`/products?category=${product.category}`} style={{ textTransform: 'capitalize' }}>{product.category}</Link> <span>›</span>
          <span>{product.name}</span>
        </div>

        <div className="detail-layout">
          {/* Image */}
          <div className="detail-image-wrap">
            <div className="detail-image">
              <span className="detail-emoji">{product.emoji || '🎀'}</span>
            </div>
            {discount > 0 && <div className="detail-discount">-{discount}% OFF</div>}
          </div>

          {/* Info */}
          <div className="detail-info">
            {product.badge && <span className={`badge badge-${product.badge.toLowerCase().replace(' ', '-')}`}>{product.badge}</span>}
            {product.isNew && !product.badge && <span className="badge badge-new">New Arrival</span>}

            <h1 className="detail-name">{product.name}</h1>

            <div className="detail-rating">
              <span>{'⭐'.repeat(Math.floor(product.rating || 4))}</span>
              <strong>{product.rating}</strong>
              <span className="review-count">({product.reviews || 0} reviews)</span>
            </div>

            <div className="detail-price-wrap">
              <span className="detail-price">₹{product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="detail-original">₹{product.originalPrice}</span>
                  <span className="detail-save">You save ₹{product.originalPrice - product.price}!</span>
                </>
              )}
            </div>

            <p className="detail-desc">{product.description}</p>

            {product.tags && (
              <div className="detail-tags">
                {product.tags.map(tag => (
                  <span key={tag} className="detail-tag">#{tag}</span>
                ))}
              </div>
            )}

            <div className="stock-info">
              <span className="in-stock">✅ In Stock ({product.stock} available)</span>
            </div>

            <div className="qty-selector">
              <label>Quantity</label>
              <div className="qty-controls">
                <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span>{qty}</span>
                <button onClick={() => setQty(q => Math.min(product.stock, q + 1))}>+</button>
              </div>
            </div>

            <div className="detail-actions">
              <button className="btn-primary add-btn" onClick={() => addToCart(product, qty)}>
                Add to Cart 🛒
              </button>
              <button
                className={`wishlist-action-btn ${isWishlisted ? 'wishlisted' : ''}`}
                onClick={() => toggleWishlist(product._id)}
              >
                {isWishlisted ? '💖 Wishlisted' : '🤍 Wishlist'}
              </button>
            </div>

            <div className="detail-perks">
              <div className="perk">🚚 Fast Delivery</div>
              <div className="perk">🔄 Easy Returns</div>
              <div className="perk">✅ Quality Assured</div>
              <div className="perk">🎁 Gift Ready</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
