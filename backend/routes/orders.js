const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { auth, adminAuth } = require('../middleware/auth');

// Create order
router.post('/', auth, async (req, res) => {
  try {
    const { items, shippingAddress, totalAmount, paymentMethod, scoop } = req.body;
    const order = new Order({
      user: req.user._id,
      items,
      shippingAddress,
      totalAmount,
      paymentMethod,
      scoop
    });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get my orders
router.get('/my', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all orders (admin)
router.get('/admin/all', adminAuth, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('items.product')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update order status (admin)
router.put('/:id/status', adminAuth, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus: req.body.status },
      { new: true }
    );
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
