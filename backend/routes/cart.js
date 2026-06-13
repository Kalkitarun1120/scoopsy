const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');
const { auth } = require('../middleware/auth');

// Get Cart
router.get('/', auth, async (req, res) => {
  const user = await User.findById(req.user._id)
    .populate('cart.product');

  res.json(user.cart);
});

// Add To Cart
router.post('/add', auth, async (req, res) => {
  const { productId, quantity = 1 } = req.body;

  const user = await User.findById(req.user._id);

  const existing = user.cart.find(
    item => item.product.toString() === productId
  );

  if (existing) {
    existing.quantity += quantity;
  } else {
    user.cart.push({
      product: productId,
      quantity
    });
  }

  await user.save();

  const updatedUser = await User.findById(req.user._id)
    .populate('cart.product');

  res.json(updatedUser.cart);
});

// Update Quantity
router.put('/update', auth, async (req, res) => {
  const { productId, quantity } = req.body;

  const user = await User.findById(req.user._id);

  const item = user.cart.find(
    x => x.product.toString() === productId
  );

  if (item) {
    item.quantity = quantity;
  }

  await user.save();

  const updatedUser = await User.findById(req.user._id)
    .populate('cart.product');

  res.json(updatedUser.cart);
});

// Remove Item
router.delete('/remove/:productId', auth, async (req, res) => {
  const user = await User.findById(req.user._id);

  user.cart = user.cart.filter(
    item => item.product.toString() !== req.params.productId
  );

  await user.save();

  const updatedUser = await User.findById(req.user._id)
    .populate('cart.product');

  res.json(updatedUser.cart);
});

// Clear Cart
router.delete('/clear', auth, async (req, res) => {
  const user = await User.findById(req.user._id);

  user.cart = [];

  await user.save();

  res.json([]);
});

module.exports = router;