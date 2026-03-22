const mongoose = require('mongoose');

const TruckSchema = new mongoose.Schema({
  truckId: {
    type: String,
    required: true,
    unique: true
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true
  },
  model: {
    type: String,
    required: true
  },
  capacity: {
    type: Number, // in kg
    required: true
  },
  currentLoad: {
    type: Number, // in kg
    default: 0
  },
  status: {
    type: String,
    enum: ['in-service', 'maintenance', 'idle', 'inactive'],
    default: 'idle'
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  currentLocation: {
    latitude: Number,
    longitude: Number,
    address: String
  },
  lastLocationUpdate: {
    type: Date,
    default: Date.now
  },
  route: [{
    latitude: Number,
    longitude: Number,
    timestamp: Date
  }],
  fuelLevel: {
    type: Number,
    default: 100
  },
  mileage: {
    type: Number,
    default: 0
  },
  nextMaintenanceDate: Date,
  violations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Violation'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Truck', TruckSchema);
