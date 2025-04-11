const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Simple email validation regex
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Signup Route
router.post('/signup', async (req, res) => {
  const { name, email, password, role } = req.body;
  console.log('Signup request received:', req.body);

  try {
    // Input validation
    if (!email || !password || !role) {
      console.log('Missing fields:', { email, password, role });
      return res.status(400).json({ message: 'Email, password, and role are required' });
    }
    if (role !== 'admin' && !name) {
      console.log('Missing name for non-admin');
      return res.status(400).json({ message: 'Name is required for non-admin users' });
    }
    if (!['admin', 'user'].includes(role)) {
      console.log('Invalid role:', role);
      return res.status(400).json({ message: 'Invalid role. Must be "admin" or "user"' });
    }
    if (!isValidEmail(email)) {
      console.log('Invalid email format:', email);
      return res.status(400).json({ message: 'Invalid email address' });
    }

    console.log('Checking for existing user...');
    let user = await User.findOne({ email });
    if (user) {
      console.log('User already exists:', email);
      return res.status(400).json({ message: 'User already exists' });
    }

    console.log('Hashing password...');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log('Password hashed successfully');

    console.log('Creating new user...');
    user = new User({
      name: role === 'admin' ? undefined : name,
      email,
      password: hashedPassword,
      role,
    });

    console.log('Saving user to database...');
    await user.save();
    console.log('User saved:', user);

    res.status(201).json({ message: 'Signup successful! Please login.' });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login Route (unchanged)
router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;

  try {
    if (!email || !password || !role) {
      return res.status(400).json({ message: 'Email, password, and role are required' });
    }
    if (!['admin', 'user'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role. Must be "admin" or "user"' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email' });

    if (user.role !== role) {
      return res.status(400).json({ message: 'Role mismatch' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: `Login successful as ${role}!`,
      token,
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;