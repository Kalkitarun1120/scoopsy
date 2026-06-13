import React, { useState, useEffect } from "react";
import { Link, useNavigate , useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";
import "./Navbar.css";

const Navbar = () => {
  const { cartCount, user, logout } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const closeAllMenus = () => {
    setMenuOpen(false);
    setShopDropdownOpen(false);
    setUserDropdownOpen(false);
 
  };
  useEffect(() => {
    const closeMenus = () => {
      setShopDropdownOpen(false);
      setUserDropdownOpen(false);
    };

    document.addEventListener("click", closeMenus);

    return () => {
      document.removeEventListener("click", closeMenus);
    };
  }, []);
  useEffect(() => {
  setMenuOpen(false);
  setShopDropdownOpen(false);
  setUserDropdownOpen(false);
}, [location.pathname]);
  const categories = [
    { id: "keychains", label: "Keychains", emoji: "🔑" },
    { id: "bracelets", label: "Bracelets", emoji: "💎" },
    { id: "goggles", label: "Goggles & Sunnies", emoji: "🕶️" },
    { id: "accessories", label: "Accessories", emoji: "🎀" },
    { id: "plushies", label: "Plushies", emoji: "🧸" },
    { id: "stationery", label: "Stationery", emoji: "✏️" },
    { id: "bags", label: "Bags", emoji: "👜" },
    { id: "beauty", label: "Beauty", emoji: "💋" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-inner container">
        <Link to="/" className="navbar-logo">
          <span className="logo-bow">🎀</span>
          <span className="logo-text">Scoopsy</span>
        </Link>

        <div className="navbar-links">
          <div className="nav-dropdown" onClick={(e) => e.stopPropagation()}>
            <button
              className="nav-link-btn"
              onClick={() => {
                setUserDropdownOpen(false);
                setShopDropdownOpen((prev) => !prev);
              }}
            >
              Shop ✨
            </button>

            {shopDropdownOpen && (
              <div className="dropdown-menu">
                <Link
                  to="/products"
                  className="dropdown-item"
                  onClick={() => setShopDropdownOpen(false)}
                >
                  <span>🌸</span> All Products
                </Link>

                <div className="dropdown-divider" />

                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/products?category=${cat.id}`}
                    className="dropdown-item"
                    onClick={() => setShopDropdownOpen(false)}
                  >
                    <span>{cat.emoji}</span> {cat.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link to="/products?featured=true" className="nav-link">
            Featured 💕
          </Link>
          <Link to="/about" className="nav-link">
            About
          </Link>
        </div>

        <div className="navbar-actions">
          <Link to="/cart" className="cart-btn">
            <span>🛒</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          {user ? (
            <div className="user-menu" onClick={(e) => e.stopPropagation()}>
              <button
                className="user-btn"
                onClick={() => {
                  setShopDropdownOpen(false);
                  setUserDropdownOpen((prev) => !prev);
                }}
              >
                <span className="user-avatar">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </button>

              {userDropdownOpen && (
                <div className="user-dropdown">
                  <div className="user-info">
                    <strong>{user.name}</strong>
                    <small>{user.email}</small>
                  </div>

                  <Link to="/orders" onClick={() => setUserDropdownOpen(false)}>
                    My Orders 📦
                  </Link>

                  <Link
                    to="/profile"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    Profile 💖
                  </Link>

                  {user.isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      Admin Panel ⚙️
                    </Link>
                  )}

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      logout();
                      navigate("/");
                    }}
                  >
                    Logout 👋
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="btn-primary navbar-cta">
                Join Us 🎀
              </Link>
            </div>
          )}
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/products" onClick={() => setMenuOpen(false)}>
            🌸 All Products
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.id}`}
              onClick={() => setMenuOpen(false)}
            >
              {cat.emoji} {cat.label}
            </Link>
          ))}
          <Link to="/cart">
  🛒 Cart ({cartCount})
</Link>
          {user ? (
            <>
              <Link to="/orders">
  📦 My Orders
</Link>
              <Link to="/profile">
  💖 Profile
</Link>
              <button
                onClick={() => {
                  closeAllMenus();
                  logout();
                  navigate("/");
                  setMenuOpen(false);
                }}
              >
                👋 Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}>
                Join Us 🎀
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
