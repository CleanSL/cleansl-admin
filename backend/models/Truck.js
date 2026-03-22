const mongoose = require('mongoose');

const truckSchema = new mongoose.Schema({
  id: String,
  model: String,
  registration: String,
  status: { type: String, enum: ['Moving', 'Idle', 'Completed', 'Delayed'], default: 'Idle' },
  location: String,
  ward: String,
  loadPercentage: Number,
  speed: String,
  weight: String,
  route: [[Number]], // Array of [lat, lng]
  shiftTime: String,
  shiftEnd: String,
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Truck', truckSchema);
