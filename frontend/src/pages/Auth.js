// Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config';
import toast from 'react-hot-toast';
import { useApp } from '../context/AppContext';
import './Auth.css';

export const Login = () => {
  const { login } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${API_URL}/api/auth/login`, form);
      login(data.user, data.token);
      toast.success(`Welcome back, ${data.user.name}! 💕`);
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page page-enter">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">🎀</div>
          <h2>Welcome Back!</h2>
          <p>Sign in to your Scoopsy account</p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="your@email.com" required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} placeholder="••••••••" required />
          </div>
          <button type="submit" className="btn-primary auth-btn" disabled={loading}>
            {loading ? '⏳ Signing in...' : 'Sign In 💕'}
          </button>
        </form>
        <p className="auth-switch">Don't have an account? <Link to="/register">Join Scoopsy 🎀</Link></p>
      </div>
    </div>
  );
};

export const Register = () => {
  const { login } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${API_URL}/api/auth/login`, form);
      login(data.user, data.token);
      toast.success(`Welcome to Scoopsy, ${data.user.name}! 🎀`);
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page page-enter">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">🎀</div>
          <h2>Join the Cuteness!</h2>
          <p>Create your Scoopsy account</p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Your Name</label>
            <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Priya" required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="your@email.com" required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} placeholder="At least 6 characters" required />
          </div>
          <button type="submit" className="btn-primary auth-btn" disabled={loading}>
            {loading ? '⏳ Creating...' : 'Create Account 🎀'}
          </button>
        </form>
        <p className="auth-switch">Already have an account? <Link to="/login">Sign in 💕</Link></p>
      </div>
    </div>
  );
};
