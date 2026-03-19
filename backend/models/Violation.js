const mongoose = require('mongoose');

const violationSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  type: String,
  resident: String,
  status: { type: String, enum: ['Pending', 'Disputed', 'Confirmed', 'Resolved'], default: 'Pending' },
  score: Number,
  details: String,
  imageUrl: String,
  truckId: mongoose.Schema.Types.ObjectId,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Violation', violationSchema);
