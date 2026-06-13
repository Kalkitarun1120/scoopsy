import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { API_URL } from '../config';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('scoopsy_user')) || null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(
    () => localStorage.getItem('scoopsy_token') || null
  );

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);


  useEffect(() => {
  const interceptor = axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response?.status === 401) {
        setUser(null);
        setToken(null);
        setCart([]);
        setWishlist([]);

        localStorage.removeItem('scoopsy_user');
        localStorage.removeItem('scoopsy_token');

        toast.error('Session expired. Please login again 💕');

        window.location.href = '/login';
      }

      return Promise.reject(error);
    }
  );

  return () => {
    axios.interceptors.response.eject(interceptor);
  };
}, []);

  useEffect(() => {
    if (token) {
      fetchCart();
    } else {
      setCart([]);
    }
  }, [token]);

  const fetchCart = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/cart`);

      const formattedCart = data.map(item => ({
        ...item.product,
        quantity: item.quantity
      }));

      setCart(formattedCart);
    } catch (err) {
      console.error(err);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    if (!user) {
      toast.error('Please login first 💕');
      return;
    }

    try {
      const { data } = await axios.post(`${API_URL}/api/cart/add`, {
        productId: product._id,
        quantity
      });

      const formattedCart = data.map(item => ({
        ...item.product,
        quantity: item.quantity
      }));

      setCart(formattedCart);

      toast.success(`${product.name} added to cart! 🛒`);
    } catch (err) {
      toast.error('Failed to add item');
    }
  };

  const removeFromCart = async (id) => {
    try {
      const { data } = await axios.delete(
      `${API_URL}/api/cart/remove/${id}`
      );

      const formattedCart = data.map(item => ({
        ...item.product,
        quantity: item.quantity
      }));

      setCart(formattedCart);
    } catch (err) {
      toast.error('Failed to remove item');
    }
  };

  const updateQuantity = async (id, quantity) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }

    try {
      const { data } = await axios.put(`${API_URL}/api/cart/update`, {
        productId: id,
        quantity
      });

      const formattedCart = data.map(item => ({
        ...item.product,
        quantity: item.quantity
      }));

      setCart(formattedCart);
    } catch (err) {
      toast.error('Failed to update quantity');
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete(`${API_URL}/api/cart/clear`);
      setCart([]);
    } catch (err) {
      toast.error('Failed to clear cart');
    }
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const login = async (userData, authToken) => {
    setUser(userData);
    setToken(authToken);

    localStorage.setItem(
      'scoopsy_user',
      JSON.stringify(userData)
    );

    localStorage.setItem(
      'scoopsy_token',
      authToken
    );

    setTimeout(() => {
      fetchCart();
    }, 100);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setCart([]);
    setWishlist([]);

    localStorage.removeItem('scoopsy_user');
    localStorage.removeItem('scoopsy_token');

    toast.success('Logged out! Come back soon 💕');
  };

  const toggleWishlist = async (productId) => {
    if (!user) {
      toast.error('Please login to add to wishlist 💕');
      return;
    }

    try {
      const { data } = await axios.post(`${API_URL}/api/auth/wishlist/${productId}`
      );

      setWishlist(data.wishlist);

      const inWishlist =
        data.wishlist.includes(productId);

      toast.success(
        inWishlist
          ? 'Added to wishlist 💕'
          : 'Removed from wishlist'
      );
    } catch (err) {
      toast.error('Something went wrong');
    }
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,

        user,
        setUser,
        token,
        login,
        logout,

        wishlist,
        toggleWishlist
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);