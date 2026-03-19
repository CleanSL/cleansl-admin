const mongoose = require('mongoose');

const ViolationSchema = new mongoose.Schema({
  violationId: {
    type: String,
    required: true,
    unique: true
  },
  truck: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Truck',
    required: true
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  type: {
    type: String,
    enum: [
      'speeding',
      'harsh-acceleration',
      'harsh-braking',
      'harsh-cornering',
      'off-route',
      'overspeeding',
      'rash-driving',
      'equipment-failure',
      'late-arrival',
      'missed-stop',
      'improper-collection',
      'fuel-waste'
    ],
    required: true
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  location: {
    address: String,
    latitude: Number,
    longitude: Number,
    ward: String
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  description: String,
  evidence: {
    gpsData: mongoose.Schema.Types.Mixed,
    cameraFootage: String,
    sensorData: mongoose.Schema.Types.Mixed
  },
  status: {
    type: String,
    enum: ['reported', 'acknowledged', 'under-review', 'resolved', 'dismissed'],
    default: 'reported'
  },
  penalty: {
    type: {
      type: String,
      enum: ['fine', 'warning', 'suspension', 'none'],
      default: 'none'
    },
    amount: Number,
    reason: String,
    appliedAt: Date
  },
  appealedAt: Date,
  appealStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  notes: String,
  resolvedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Violation', ViolationSchema);
