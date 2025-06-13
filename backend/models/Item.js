const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true }, // Store as number, without ₹
  quantity: { type: Number, required: true },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Item', itemSchema);