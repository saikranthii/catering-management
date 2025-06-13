const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// POST: Save a new message
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const newMessage = new Message({
      name,
      email,
      subject,
      message,
      timestamp: new Date(),
    });
    await newMessage.save();

    res.status(201).json({ success: true, message: 'Message saved successfully' });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ success: false, message: 'Failed to save message' });
  }
});

// GET: Fetch all messages
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: -1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch messages' });
  }
});

module.exports = router;