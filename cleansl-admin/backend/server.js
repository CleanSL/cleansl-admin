const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();
//testing
// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cleansl-admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Import routes
const usersRoutes = require('./routes/usersRoutes');
const trucksRoutes = require('./routes/trucksRoutes');
const complaintsRoutes = require('./routes/complaintsRoutes');
const violationsRoutes = require('./routes/violationsRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const mapsRoutes = require('./routes/mapsRoutes');

// Use routes
app.use('/api/users', usersRoutes);
app.use('/api/trucks', trucksRoutes);
app.use('/api/complaints', complaintsRoutes);
app.use('/api/violations', violationsRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/maps', mapsRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date(),
    version: '1.0.0'
  });
});

// Root endpoint
app.get('/api', (req, res) => {
  res.json({ 
    message: 'CleanSL Admin API v1.0.0',
    endpoints: {
      health: '/api/health',
      users: '/api/users',
      trucks: '/api/trucks',
      complaints: '/api/complaints',
      violations: '/api/violations',
      analytics: '/api/analytics',
      maps: '/api/maps'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({ 
    error: err.message || 'Internal server error' 
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 API documentation available at http://localhost:${PORT}/api`);
});

module.exports = app;
