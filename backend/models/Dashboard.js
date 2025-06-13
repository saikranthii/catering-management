const mongoose = require('mongoose');

const dashboardSchema = new mongoose.Schema({
  totalSales: { type: String, required: true },
  totalOrders: { type: Number, required: true },
  profit: { type: String, required: true },
  categorySales: {
    labels: [{ type: String }],
    values: [{ type: Number }],
  },
  monthlyTrend: [{
    month: { type: String, required: true },
    sales: { type: Number, required: true },
    orderCount: { type: Number, required: true },
  }],
  timestamp: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Dashboard', dashboardSchema);