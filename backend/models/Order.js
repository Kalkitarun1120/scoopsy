const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    price: Number,
    quantity: { type: Number, default: 1 },
    emoji: String
  }],
  shippingAddress: {
    name: String,
    phone: String,
    street: String,
    city: String,
    state: String,
    pincode: String
  },
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, default: 'COD' },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  orderStatus: {
    type: String,
    enum: ['placed', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    default: 'placed'
  },
  scoop: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
