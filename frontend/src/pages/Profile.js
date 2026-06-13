import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import axios from 'axios';
import { API_URL } from '../config';
import toast from 'react-hot-toast';
import './Profile.css';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const { setUser } = useApp();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/auth/profile`);

      setForm({
        name: data.name || '',
        email: data.email || '',
        phone: data.phone || '',
        address: data.address || ''
      });
    } catch (err) {
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = e => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const saveProfile = async () => {
  setSaving(true);

  try {
    const { data } = await axios.put(`${API_URL}/api/auth/profile`, {
      name: form.name,
      phone: form.phone,
      address: form.address
    });

    setUser(data);

    localStorage.setItem(
      'scoopsy_user',
      JSON.stringify(data)
    );

    toast.success('Profile updated successfully 💕');
    setTimeout(() =>{
      navigate('/products');
    },1000)
    
  } catch (err) {
    toast.error('Failed to update profile');
  } finally {
    setSaving(false);
  }
};

  if (loading) {
    return (
      <div className="container" style={{ padding: '40px' }}>
        Loading...
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: '700px', padding: '40px 20px' }}>
      <h1 style={{ marginBottom: '24px' }}>My Profile 💖</h1>

      <div className="card" style={{
        background: '#fff',
        padding: '24px',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
      }}>
        <div style={{ marginBottom: '16px' }}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="profile-input"
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label>Email</label>
          <input
            type="email"
            value={form.email}
            disabled
            className="profile-input"
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="profile-input"
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label>Address</label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            rows="4"
            className="profile-input"
          />
        </div>

        <button
          onClick={saveProfile}
          disabled={saving}
          className="btn-primary"
        >
          {saving ? 'Saving...' : 'Save Changes 💕'}
        </button>
      </div>
    </div>
  );
};

export default Profile;