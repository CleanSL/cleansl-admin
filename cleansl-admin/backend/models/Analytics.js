const mongoose = require('mongoose');

const AnalyticsSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  truck: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Truck'
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  metrics: {
    distanceTraveled: Number, // in km
    fuelConsumed: Number, // in liters
    fuelEfficiency: Number, // km per liter
    wasteCollected: Number, // in kg
    collectionsCompleted: Number,
    averageSpeed: Number, // in km/hr
    maxSpeed: Number, // in km/hr
    violations: Number,
    collisionsDetected: Number,
    harshEventCount: Number,
    idleTime: Number, // in minutes
    activeTime: Number, // in minutes
    completionRate: Number // in percentage
  },
  efficiency: {
    routeOptimization: Number, // percentage
    timeOnTask: Number, // percentage
    fuelUsageRating: Number, // percentage
    safetyScore: Number // percentage
  },
  location: {
    ward: String,
    district: String,
    zone: String
  },
  status: {
    type: String,
    enum: ['completed', 'in-progress', 'pending'],
    default: 'pending'
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Analytics', AnalyticsSchema);
