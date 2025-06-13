const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  userName: { type: String, required: true },
  orderDate: { type: String, required: true },
  items: [{
    id: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  }],
  totalPrice: { type: String, required: true },
  deliveryDate: { type: String, required: true },
  deliveryTime: { type: String, required: true },
  venue: { type: String, required: true },
  paymentMode: { type: String, required: true, default: 'COD' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);