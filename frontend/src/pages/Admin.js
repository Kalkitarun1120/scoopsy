import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import './Admin.css';

const CATEGORIES = ['keychains','bracelets','goggles','stationery','plushies','accessories','bags','beauty'];

const Admin = () => {
  const [tab, setTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState({
    name: '', description: '', price: '', originalPrice: '',
    category: 'keychains', emoji: '🎀', badge: '', stock: 50,
    isFeatured: false, isNew: false, isBestseller: false
  });

  useEffect(() => {
    if (tab === 'products') fetchProducts();
    if (tab === 'orders') fetchOrders();
  }, [tab]);

  const fetchProducts = async () => {
    setLoading(true);
    const { data } = await axios.get('/api/products?limit=100');
    setProducts(data.products);
    setLoading(false);
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/orders/admin/all');
      setOrders(data);
    } catch (e) { toast.error('Failed to load orders'); }
    setLoading(false);
  };

  const handleFormChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const resetForm = () => {
    setForm({ name: '', description: '', price: '', originalPrice: '', category: 'keychains', emoji: '🎀', badge: '', stock: 50, isFeatured: false, isNew: false, isBestseller: false });
    setEditProduct(null);
    setShowForm(false);
  };

  const handleSave = async () => {
    try {
      const payload = { ...form, price: Number(form.price), originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined, stock: Number(form.stock) };
      if (editProduct) {
        await axios.put(`/api/products/${editProduct._id}`, payload);
        toast.success('Product updated! ✅');
      } else {
        await axios.post('/api/products', payload);
        toast.success('Product added! 🎀');
      }
      resetForm();
      fetchProducts();
    } catch (e) { toast.error('Failed to save product'); }
  };

  const handleEdit = p => {
    setEditProduct(p);
    setForm({ ...p, price: p.price.toString(), originalPrice: p.originalPrice?.toString() || '', stock: p.stock || 50 });
    setShowForm(true);
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this product?')) return;
    await axios.delete(`/api/products/${id}`);
    toast.success('Deleted!');
    fetchProducts();
  };

  const handleStatusUpdate = async (orderId, status) => {
    await axios.put(`/api/orders/${orderId}/status`, { status });
    toast.success('Status updated!');
    fetchOrders();
  };

  return (
    <div className="admin-page page-enter">
      <div className="container">
        <div className="admin-header">
          <h1>Admin Panel ⚙️</h1>
          <p>Manage your Scoopsy store</p>
        </div>

        <div className="admin-tabs">
          {['products', 'orders'].map(t => (
            <button key={t} className={`admin-tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
              {t === 'products' ? '🎀 Products' : '📦 Orders'}
            </button>
          ))}
        </div>

        {tab === 'products' && (
          <div>
            <div className="admin-toolbar">
              <span>{products.length} products</span>
              <button className="btn-primary" onClick={() => { resetForm(); setShowForm(true); }}>+ Add Product</button>
            </div>

            {showForm && (
              <div className="product-form-card">
                <h3>{editProduct ? 'Edit Product' : 'Add New Product'}</h3>
                <div className="pf-grid">
                  <div className="form-group">
                    <label>Name *</label>
                    <input name="name" value={form.name} onChange={handleFormChange} placeholder="Product name" />
                  </div>
                  <div className="form-group">
                    <label>Emoji</label>
                    <input name="emoji" value={form.emoji} onChange={handleFormChange} placeholder="🎀" />
                  </div>
                  <div className="form-group full">
                    <label>Description *</label>
                    <textarea name="description" value={form.description} onChange={handleFormChange} rows={3} placeholder="Product description..." />
                  </div>
                  <div className="form-group">
                    <label>Price (₹) *</label>
                    <input name="price" type="number" value={form.price} onChange={handleFormChange} placeholder="149" />
                  </div>
                  <div className="form-group">
                    <label>Original Price (₹)</label>
                    <input name="originalPrice" type="number" value={form.originalPrice} onChange={handleFormChange} placeholder="199" />
                  </div>
                  <div className="form-group">
                    <label>Category *</label>
                    <select name="category" value={form.category} onChange={handleFormChange}>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Stock</label>
                    <input name="stock" type="number" value={form.stock} onChange={handleFormChange} />
                  </div>
                  <div className="form-group">
                    <label>Badge</label>
                    <input name="badge" value={form.badge} onChange={handleFormChange} placeholder="New / Bestseller / Trending" />
                  </div>
                  <div className="form-group full checkboxes">
                    <label><input type="checkbox" name="isFeatured" checked={form.isFeatured} onChange={handleFormChange} /> Featured</label>
                    <label><input type="checkbox" name="isNew" checked={form.isNew} onChange={handleFormChange} /> New Arrival</label>
                    <label><input type="checkbox" name="isBestseller" checked={form.isBestseller} onChange={handleFormChange} /> Bestseller</label>
                  </div>
                </div>
                <div className="pf-actions">
                  <button className="btn-primary" onClick={handleSave}>{editProduct ? 'Update' : 'Add'} Product</button>
                  <button className="btn-outline" onClick={resetForm}>Cancel</button>
                </div>
              </div>
            )}

            {loading ? <div className="loading-spinner">🎀</div> : (
              <div className="admin-products-table">
                <table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Flags</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(p => (
                      <tr key={p._id}>
                        <td>
                          <div className="product-cell">
                            <span className="pc-emoji">{p.emoji}</span>
                            <span>{p.name}</span>
                          </div>
                        </td>
                        <td><span className="cat-pill">{p.category}</span></td>
                        <td>
                          <strong>₹{p.price}</strong>
                          {p.originalPrice && <small> / ₹{p.originalPrice}</small>}
                        </td>
                        <td>{p.stock}</td>
                        <td className="flags">
                          {p.isFeatured && <span>⭐</span>}
                          {p.isNew && <span>🆕</span>}
                          {p.isBestseller && <span>🔥</span>}
                        </td>
                        <td>
                          <button className="edit-btn" onClick={() => handleEdit(p)}>Edit</button>
                          <button className="delete-btn" onClick={() => handleDelete(p._id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {tab === 'orders' && (
          <div>
            {loading ? <div className="loading-spinner">🎀</div> : (
              <div className="admin-orders">
                {orders.map(order => (
                  <div key={order._id} className="admin-order-card">
                    <div className="ao-header">
                      <div>
                        <strong>#{order._id.slice(-8).toUpperCase()}</strong>
                        <span>{new Date(order.createdAt).toLocaleDateString('en-IN')}</span>
                      </div>
                      <div className="ao-right">
                        <strong className="ao-total">₹{order.totalAmount}</strong>
                        <select
                          value={order.orderStatus}
                          onChange={e => handleStatusUpdate(order._id, e.target.value)}
                          className="status-select"
                        >
                          {['placed','confirmed','shipped','delivered','cancelled'].map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="ao-body">
                      <div className="ao-customer">
                        <span>👤 {order.user?.name}</span>
                        <span>📧 {order.user?.email}</span>
                        <span>📍 {order.shippingAddress?.city}</span>
                      </div>
                      <div className="ao-items">
                        {order.items.map((item, i) => (
                          <span key={i}>{item.emoji} {item.name} ×{item.quantity}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
