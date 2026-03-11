import mongoose from 'mongoose'

const CustomOrderSchema = new mongoose.Schema({
  userId: { 
    type: String, 
    default: '' 
  },
  cakeType: { 
    type: String, 
    required: true 
},
  flavor: { 
    type: String, 
    required: true 
},
  size: { 
    type: String, 
    required: true 
},
  tiers: { 
    type: String, 
    default: '1 Tier' 
},
  // Customization
  message: { 
    type: String, 
    default: '' 
},
  theme: { 
    type: String, 
    default: '' 
},
  colors: { 
    type: String, 
    default: '' 
},
  specialRequests: { 
    type: String, 
    default: '' 
},
  // Customer Info
  customerName: { 
    type: String, 
    required: true 
},
  customerPhone: { 
    type: String, 
    required: true 
},
  customerEmail: { 
    type: String, 
    default: '' 
},
  deliveryDate: { 
    type: String, 
    required: true 
},
  deliveryAddress: { 
    type: String, 
    required: true 
},
  paymentMethod: { 
    type: String, 
    default: 'cod' 
},
  // Status
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'], 
    default: 'pending' 
},
  quotedPrice: { 
    type: Number, 
    default: 0 
},

}, { timestamps: true })

export default mongoose.models.CustomOrder || mongoose.model('CustomOrder', CustomOrderSchema)