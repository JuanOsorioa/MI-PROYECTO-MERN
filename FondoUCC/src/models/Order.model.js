// FondoUCC/src/models/Order.model.js
const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  productType: {
    type: String,
    enum: ['retablo', 'album', 'fotografia'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  },
  price: {
    type: Number,
    required: true
  },
  specifications: {
    size: String,
    materials: [String],
    colors: [String],
    personalization: String,
    deliveryDate: Date
  },
  images: [String]
});

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderNumber: {
    type: String,
    unique: true,
    required: true
  },
  items: [OrderItemSchema],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pendiente', 'confirmado', 'en_proceso', 'completado', 'cancelado'],
    default: 'pendiente'
  },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  contactInfo: {
    phone: String,
    email: String
  },
  notes: {
    type: String,
    maxlength: 500
  },
  paymentStatus: {
    type: String,
    enum: ['pendiente', 'pagado', 'fallido'],
    default: 'pendiente'
  },
  estimatedDelivery: Date
}, {
  timestamps: true
});

// Generar número de orden único
OrderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    const count = await mongoose.model('Order').countDocuments();
    this.orderNumber = `ORD-${Date.now()}-${count + 1}`;
  }
  next();
});

module.exports = mongoose.model('Order', OrderSchema);