
import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: {
    type: String,
    enum: ['cake', 'bread', 'dessert', 'pastry'],
    required: true,
  },
  image: {
    type: String,
    default: ''
  },
  imagePublicId: {
    type: String,
    default: ''
  },
  images: [{
    url: String,
    publicId: String
  }],
  emoji: {
    type: String,
    default: '🎂'
  },
  badge: {
    type: String,
    default: ''
  },

  // e.g. "Bestseller", "New"

  unit: {
    type: String,
    default: 'piece'
  },

  // e.g. "kg", "loaf", "piece"
  inStock: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
})

export default mongoose.models.Product || mongoose.model('Product', ProductSchema)
