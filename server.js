require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const signalRoutes = require('./routes/signalRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const PORT = process.env.PORT || 1355; // Set the port, use 1355 or your desired port

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/signals', signalRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/quick-response', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Failed to connect to MongoDB:', error);
  process.exit(1); // Exit if MongoDB connection fails
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});