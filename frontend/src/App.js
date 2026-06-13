import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Orders from './pages/Orders';
import About from './pages/About';
import Admin from './pages/Admin';
import { Login, Register } from './pages/Auth';
import Profile from './pages/Profile';

const ProtectedRoute = ({ children }) => {
  const { user } = useApp();
  return user ? children : <Navigate to="/login" replace />;
};

const AdminRoute = ({ children }) => {
  const { user } = useApp();
  return user?.isAdmin ? children : <Navigate to="/" replace />;
};

const AppContent = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<About />} />
      <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
      <Route path="/order-success/:id" element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
      <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
      <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
    <Footer />
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          background: '#fff',
          color: '#3d1a2e',
          borderRadius: '16px',
          border: '2px solid #ffb6c1',
          fontFamily: 'Nunito, sans-serif',
          fontWeight: '700',
          boxShadow: '0 8px 24px rgba(255, 105, 180, 0.2)',
        },
        success: {
          iconTheme: { primary: '#ff69b4', secondary: '#fff' },
        },
      }}
    />
  </Router>
);

const App = () => (
  <AppProvider>
    <AppContent />
  </AppProvider>
);

export default App;
