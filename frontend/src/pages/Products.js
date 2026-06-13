import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import './Products.css';

const CATEGORIES = [
  { id: '', label: 'All Products', emoji: '🌸' },
  { id: 'keychains', label: 'Keychains', emoji: '🔑' },
  { id: 'bracelets', label: 'Bracelets', emoji: '💎' },
  { id: 'goggles', label: 'Goggles', emoji: '🕶️' },
  { id: 'accessories', label: 'Accessories', emoji: '🎀' },
  { id: 'plushies', label: 'Plushies', emoji: '🧸' },
  { id: 'stationery', label: 'Stationery', emoji: '✏️' },
  { id: 'bags', label: 'Bags', emoji: '👜' },
  { id: 'beauty', label: 'Beauty', emoji: '💋' },
];


const Products = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const initialCategory = params.get('category') || '';
  const initialFeatured = params.get('featured') === 'true';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState('');
  const [search, setSearch] = useState('');
  const [featured, setFeatured] = useState(initialFeatured);
  const [total, setTotal] = useState(0);
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef(null);
  useEffect(() => {
    const p = new URLSearchParams(location.search);
    setCategory(p.get('category') || '');
    setFeatured(p.get('featured') === 'true');
  }, [location.search]);
useEffect(() => {
  window.scrollTo(0,0);
}, [location.search]);
  useEffect(() => {
  setLoading(true);
  setProducts([]);

  const query = new URLSearchParams();

  if (category) query.set('category', category);
  if (sort) query.set('sort', sort);
  if (search) query.set('search', search);
  if (featured) query.set('featured', 'true');
  query.set('limit', '24');

  axios.get(`/api/products?${query}`)
  .then(({ data }) => {
    setTimeout(() => {
      setProducts(data.products);
      setTotal(data.total);
      setLoading(false);
     
    }, 1000);
  })
  .catch(err => {
    console.error(err);
    setLoading(false);
   
  });

}, [category, sort, search, featured]);


useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      sortRef.current &&
      !sortRef.current.contains(event.target)
    ) {
      setSortOpen(false);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);

  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);

  const handleCategory = (cat) => {
    setSortOpen(false);
  setSort(''); // Reset to Newest
    setCategory(cat);
    setFeatured(false);
    
    const q = new URLSearchParams();
    if (cat) q.set('category', cat);
    navigate(`/products?${q}`);
  };

  return (
    <div className="products-page page-enter">
      <div className="products-hero">
        <div className="container">
          <h1>
            {featured
              ? "💕 Featured Picks"
              : category
                ? `${CATEGORIES.find((c) => c.id === category)?.emoji} ${CATEGORIES.find((c) => c.id === category)?.label}`
                : "🌸 All Products"}
          </h1>
          <p>{total} adorable finds waiting for you!</p>
        </div>
      </div>

      <div className="container products-layout">
        {/* Sidebar */}
        <aside className="products-sidebar">
          <div className="sidebar-section">
            <h3>Categories</h3>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`cat-filter-btn ${category === cat.id && !featured ? "active" : ""}`}
                onClick={() => handleCategory(cat.id)}
              >
                <span>{cat.emoji}</span> {cat.label}
              </button>
            ))}
            <button
              className={`cat-filter-btn ${featured ? "active" : ""}`}
              onClick={() => {
                setSortOpen(false);
                setSort(''); // Reset to Newest
                setFeatured(true);
                setCategory("");
                navigate("/products?featured=true");
              }}
            >
              <span>💕</span> Featured
            </button>
          </div>

          {/* <div className="sidebar-section">
            <h3>Sort By</h3>
            {[
              { value: '', label: 'Newest' },
              { value: 'price-asc', label: 'Price: Low to High' },
              { value: 'price-desc', label: 'Price: High to Low' },
              { value: 'rating', label: 'Top Rated' },
            ].map(s => (
              <button
                key={s.value}
                className={`sort-btn ${sort === s.value ? 'active' : ''}`}
                onClick={() =>{
                  window.scrollTo(0, 0);
                 setSort(s.value)}}
              >
                {s.label}
              </button>
            ))}
          </div> */}
        </aside>

        {/* Main */}
        <main className="products-main">
          <div className="products-toolbar">
            <div className="search-box">
              <span>🔍</span>
              <input
                type="text"
                placeholder="Search cute things..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && <button onClick={() => setSearch("")}>✕</button>}
            </div>

            <div className="sort-wrapper" ref={sortRef}>
  <button
    className="sort-icon-btn"
    onClick={() => setSortOpen(prev => !prev)}
  >
     ☰
  </button>

  {sortOpen && (
    <div className="sort-dropdown">
      {[
        { value: '', label: 'Newest' },
        { value: 'price-asc', label: 'Price: Low to High' },
        { value: 'price-desc', label: 'Price: High to Low' },
        { value: 'rating', label: 'Top Rated' },
      ].map(s => (
        <button
          key={s.value}
          className={`sort-btn ${sort === s.value ? 'active' : ''}`}
          onClick={() => {
  
  setSort(s.value);
  setSortOpen(false);
  window.scrollTo(0, 0);
}}
        >
          {s.label}
        </button>
      ))}
    </div>
  )}
</div>

<span className="result-count">{total} products</span>
          </div>

          {loading ? (
            <div className="loading-spinner">🎀</div>
          ) : products.length === 0 ? (
            <div className="empty-state">
              <div className="empty-emoji">🔍</div>
              <h3>No products found</h3>
              <p>Try a different search or category!</p>
              <button
                className="btn-primary"
                onClick={() => {
                  setSearch("");
                  setCategory("");
                  setFeatured(false);
                  navigate("/products");
                }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {products.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          )}
        </main>


      </div>
    </div>
  );
};

export default Products;
