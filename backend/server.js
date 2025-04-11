const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/messages');
const orderRoutes = require('./routes/orders');
const itemRoutes = require('./routes/items');
const dashboardRoutes = require('./routes/dashboard'); // Already included
const cors = require('cors');
require('dotenv').config();

const app = express();

const startServer = async () => {
  try {
    await connectDB();

    app.use(express.json());
    app.use(cors({
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    }));

    app.get('/', (req, res) => res.send('Elite Caterings Backend is running!'));
    app.use('/api/auth', authRoutes);
    app.use('/api/messages', messageRoutes);
    app.use('/api/orders', orderRoutes);
    app.use('/api/items', itemRoutes);
    app.use('/api/dashboard', dashboardRoutes);

    app.use((err, req, res, next) => {
      console.error('Server Error:', err.stack);
      res.status(500).json({ message: 'Something went wrong', error: err.message });
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();