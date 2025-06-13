const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// GET: Fetch all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch orders' });
  }
});

// POST: Save or update an order (to sync localStorage data)
router.post('/', async (req, res) => {
  try {
    const { 
      orderId, 
      userName, 
      orderDate, 
      items, 
      totalPrice, 
      deliveryDate, 
      deliveryTime, 
      venue, 
      paymentMode 
    } = req.body;

    // Validate required fields
    if (!orderId || !userName || !orderDate || !items || !totalPrice || 
        !deliveryDate || !deliveryTime || !venue) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const existingOrder = await Order.findOne({ orderId });
    if (existingOrder) {
      // Update existing order
      await Order.updateOne(
        { orderId }, 
        { 
          userName, 
          orderDate, 
          items, 
          totalPrice, 
          deliveryDate, 
          deliveryTime, 
          venue, 
          paymentMode: paymentMode || 'COD' // Default to COD if not provided
        }
      );
      res.status(200).json({ success: true, message: 'Order updated' });
    } else {
      // Create new order
      const newOrder = new Order({ 
        orderId, 
        userName, 
        orderDate, 
        items, 
        totalPrice, 
        deliveryDate, 
        deliveryTime, 
        venue, 
        paymentMode: paymentMode || 'COD' // Default to COD if not provided
      });
      await newOrder.save();
      res.status(201).json({ success: true, message: 'Order created' });
    }
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ success: false, message: 'Failed to save order' });
  }
});

// DELETE: Delete an order by orderId
router.delete('/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const result = await Order.findOneAndDelete({ orderId });
    if (result) {
      res.status(200).json({ success: true, message: 'Order deleted' });
    } else {
      res.status(404).json({ success: false, message: 'Order not found' });
    }
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ success: false, message: 'Failed to delete order' });
  }
});

module.exports = router;