const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  checkoutKey: { type: String },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    size: {
      type: String,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    name: {
      type: String
    },
    image: {
      type: String
    }
  }],
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  subtotalAmount: { type: Number, min: 0 },
  discountAmount: { type: Number, default: 0, min: 0 },
  couponCode: { type: String, trim: true },
  paymentId: {
    type: String,
    required: function() {
      return this.paymentMethod !== 'Cash on Delivery' && this.status !== 'Pending';
    }
  },
  status: {
    type: String,
    enum: ['Pending', 'Paid', 'Processing', 'Packed', 'Dispatched', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled', 'Refunded'],
    default: 'Pending'
  },
  shippingAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true }
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['Credit Card', 'PayPal', 'Stripe', 'Cash on Delivery', 'Other']
  },
  deliveryNotes: {
    type: String
  },
  trackingNumber: {
    type: String
  },
  estimatedDelivery: {
    type: Date
  },
  statusHistory: [{
    status: { type: String, required: true },
    changedAt: { type: Date, default: Date.now },
    changedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  }]
}, { timestamps: true });

// Add index for better query performance
OrderSchema.index({ user: 1, createdAt: -1 });
OrderSchema.index({ user: 1, checkoutKey: 1 }, { unique: true, partialFilterExpression: { checkoutKey: { $type: 'string' } } });
OrderSchema.index({ status: 1 });
OrderSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('Order', OrderSchema);
