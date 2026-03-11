import mongoose from 'mongoose'

const OrderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: String,
  price: Number,
  quantity: { type: Number, default: 1 },
})

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  customerName: {
    type: String,
    required: true
  },
  customerPhone: {
    type: String,
    required: true
  },
  customerEmail: {
    type: String
  },
  deliveryAddress: { type: String, required: true },
  items: [OrderItemSchema],
  totalAmount: { type: Number, required: true },
  specialInstructions: { type: String, default: '' },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'],
    default: 'pending',
  },
  paymentMethod: {
    type: String,
    enum: ['cod', 'jazzcash', 'easypaisa'],
    default: 'cod',
  },
  paymentReference: { 
    type: String, 
    default: '' 
  },
  paymentScreenshot: { 
    type: String, 
    default: '' 
  },
  paymentStatus: { 
    type: String, 
    enum: ['pending', 'submitted', 'verified', 'rejected'], default: 'pending' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
})

export default mongoose.models.Order || mongoose.model('Order', OrderSchema)
