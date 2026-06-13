import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, wishlist } = useApp();
  const isWishlisted = wishlist.includes(product._id);

  const getBadgeClass = (badge) => {
    if (!badge) return '';
    const map = { 'New': 'badge-new', 'Bestseller': 'badge-bestseller', 'Trending': 'badge-trending', 'Viral': 'badge-viral', 'Set of 3': 'badge-set' };
    return map[badge] || 'badge-new';
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <div className="product-card">
      <div className="product-image-wrap">
        <Link to={`/product/${product._id}`}>
          <div className="product-image">
            <span className="product-emoji">{product.emoji || '🎀'}</span>
          </div>
        </Link>
        {product.badge && (
          <span className={`badge ${getBadgeClass(product.badge)} card-badge`}>
            {product.badge}
          </span>
        )}
        {!product.badge && product.isNew && (
          <span className="badge badge-new card-badge">New</span>
        )}
        {!product.badge && !product.isNew && product.isBestseller && (
          <span className="badge badge-bestseller card-badge">Bestseller</span>
        )}
        {discount > 0 && <span className="discount-tag">-{discount}%</span>}
        <button
          className={`wishlist-btn ${isWishlisted ? 'wishlisted' : ''}`}
          onClick={() => toggleWishlist(product._id)}
          title="Add to wishlist"
        >
          {isWishlisted ? '💖' : '🤍'}
        </button>
      </div>

      <div className="product-info">
        <Link to={`/product/${product._id}`}>
          <h3 className="product-name">{product.name}</h3>
        </Link>
        <p className="product-desc">{product.description}</p>
        <div className="product-rating">
          <span className="stars">{'⭐'.repeat(Math.floor(product.rating || 4))}</span>
          <span className="rating-num">{product.rating}</span>
          <span className="review-count">({product.reviews || 0})</span>
        </div>
        <div className="product-footer">
          <div className="price-wrap">
            <span className="price">₹{product.price}</span>
            {product.originalPrice && (
              <span className="original-price">₹{product.originalPrice}</span>
            )}
          </div>
          <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
            Add 🛒
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
