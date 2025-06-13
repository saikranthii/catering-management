const express = require('express');
const router = express.Router();
const Dashboard = require('../models/Dashboard');

// POST: Save dashboard data
router.post('/save', async (req, res) => {
  try {
    const { totalSales, totalOrders, profit, categorySales, monthlyTrend, timestamp } = req.body;

    if (!totalSales || !totalOrders || !profit || !categorySales || !monthlyTrend || !timestamp) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const existingDashboard = await Dashboard.findOne({ timestamp });
    if (existingDashboard) {
      await Dashboard.updateOne(
        { timestamp },
        { totalSales, totalOrders, profit, categorySales, monthlyTrend }
      );
      res.status(200).json({ success: true, message: 'Dashboard data updated' });
    } else {
      const newDashboard = new Dashboard({
        totalSales,
        totalOrders,
        profit,
        categorySales,
        monthlyTrend,
        timestamp,
      });
      await newDashboard.save();
      res.status(201).json({ success: true, message: 'Dashboard data saved' });
    }
  } catch (error) {
    console.error('Error saving dashboard data:', error);
    res.status(500).json({ success: false, message: 'Failed to save dashboard data' });
  }
});

// GET: Fetch the latest saved dashboard data
router.get('/', async (req, res) => {
  try {
    const dashboardData = await Dashboard.find().sort({ createdAt: -1 }).limit(1);
    if (dashboardData.length === 0) {
      return res.status(404).json({ success: false, message: 'No dashboard data found' });
    }
    res.status(200).json(dashboardData[0]);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch dashboard data' });
  }
});

module.exports = router;