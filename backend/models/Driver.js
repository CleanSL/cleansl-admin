const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, sparse: true },
  phone: String,
  pickups: { type: Number, default: 0 },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  efficiency: { type: Number, default: 0 },
  status: { type: String, enum: ['Active', 'Inactive', 'On Leave'], default: 'Active' },
  truckId: mongoose.Schema.Types.ObjectId,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Driver', driverSchema);
