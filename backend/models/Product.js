const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  category: {
    type: String,
    required: true,
    enum: ['keychains', 'bracelets', 'goggles', 'stationery', 'plushies', 'accessories', 'bags', 'beauty']
  },
  images: [{ type: String }],
  emoji: { type: String, default: '🎀' },
  badge: { type: String },
  stock: { type: Number, default: 50 },
  rating: { type: Number, default: 4.5, min: 0, max: 5 },
  reviews: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  isNew: { type: Boolean, default: false },
  isBestseller: { type: Boolean, default: false },
  tags: [String]
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
