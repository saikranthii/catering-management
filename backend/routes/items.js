const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// GET: Fetch all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find().sort({ id: 1 });
    res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch items' });
  }
});

// POST: Save or update an item
router.post('/', async (req, res) => {
  try {
    const { id, category, name, price, quantity } = req.body;
    if (!id || !category || !name || price === undefined || quantity === undefined) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    const existingItem = await Item.findOne({ id });
    if (existingItem) {
      await Item.updateOne(
        { id },
        { category, name, price, quantity, updatedAt: new Date() }
      );
      res.status(200).json({ success: true, message: 'Item updated' });
    } else {
      const newItem = new Item({ id, category, name, price, quantity });
      await newItem.save();
      res.status(201).json({ success: true, message: 'Item created' });
    }
  } catch (error) {
    console.error('Error saving item:', error);
    res.status(500).json({ success: false, message: 'Failed to save item' });
  }
});

// PUT: Bulk update items (for initial sync)
router.put('/bulk', async (req, res) => {
  try {
    const items = req.body;
    if (!Array.isArray(items)) {
      return res.status(400).json({ success: false, message: 'Items must be an array' });
    }
    for (const item of items) {
      const { id, category, name, price, quantity } = item;
      await Item.updateOne(
        { id },
        { id, category, name, price, quantity, updatedAt: new Date() },
        { upsert: true } // Create if not exists
      );
    }
    res.status(200).json({ success: true, message: 'Items synced successfully' });
  } catch (error) {
    console.error('Error syncing items:', error);
    res.status(500).json({ success: false, message: 'Failed to sync items' });
  }
});

module.exports = router;