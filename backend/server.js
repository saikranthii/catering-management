const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/messages');
const orderRoutes = require('./routes/orders');
const itemRoutes = require('./routes/items');
const dashboardRoutes = require('./routes/dashboard');
const cors = require('cors');
require('dotenv').config({ path: './.env' }); // Explicitly specify the path to .env

const app = express();

const startServer = async () => {
  try {
    // Log environment variables for debugging
    console.log('Environment Variables:');
    console.log('MONGODB_URI:', process.env.MONGODB_URI);
    console.log('JWT_SECRET:', process.env.JWT_SECRET);
    console.log('PORT:', process.env.PORT);

    // Validate environment variables
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in the environment variables');
    }
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in the environment variables');
    }

    // Connect to MongoDB
    await connectDB();
    console.log('MongoDB connected successfully');

    // Middleware
    app.use(express.json());
    app.use(cors({
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    }));

    // Routes
    app.get('/', (req, res) => res.send('Elite Caterings Backend is running!'));
    app.use('/api/auth', authRoutes);
    app.use('/api/messages', messageRoutes);
    app.use('/api/orders', orderRoutes);
    app.use('/api/items', itemRoutes);
    app.use('/api/dashboard', dashboardRoutes);

    // Error Handling Middleware
    app.use((err, req, res, next) => {
      console.error('Server Error:', err.stack);
      res.status(500).json({ message: 'Something went wrong', error: err.message });
    });

    // Start Server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`CORS enabled for: http://localhost:3000`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();