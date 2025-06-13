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

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Expecting "Bearer <token>"
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add decoded user data to request
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Get Profile Route (New)
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // Exclude password
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('User profile retrieved:', user);
    res.status(200).json({
      message: 'Profile retrieved successfully',
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error('Profile Retrieval Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

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

// Login Route
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

// Update Profile Route
router.put('/profile', verifyToken, async (req, res) => {
  const { name, email, password } = req.body;
  console.log('Profile update request received:', req.body);

  try {
    // Find the user by ID from the token
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate input
    if (email && !isValidEmail(email)) {
      console.log('Invalid email format:', email);
      return res.status(400).json({ message: 'Invalid email address' });
    }
    if (password && password.length < 6) {
      console.log('Password too short:', password);
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }
    if (user.role !== 'admin' && name && name.trim() === '') {
      console.log('Name cannot be empty for non-admin');
      return res.status(400).json({ message: 'Name cannot be empty for non-admin users' });
    }

    // Check if the new email is already taken by another user
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log('Email already in use:', email);
        return res.status(400).json({ message: 'Email is already in use' });
      }
    }

    // Update fields if provided
    if (name !== undefined) user.name = user.role === 'admin' ? undefined : name;
    if (email) user.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    console.log('Saving updated user to database...');
    await user.save();
    console.log('User updated:', user);

    // Return updated user data (excluding password)
    res.status(200).json({
      message: 'Profile updated successfully',
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error('Profile Update Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete Profile Route
router.delete('/profile', verifyToken, async (req, res) => {
  try {
    // Find and delete the user by ID from the token
    const user = await User.findByIdAndDelete(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('User deleted:', user);
    res.status(200).json({ message: 'Profile deleted successfully' });
  } catch (error) {
    console.error('Profile Deletion Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;