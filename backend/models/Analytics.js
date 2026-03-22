const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  wasteCollected: Number, // in kg
  month: String,
  totalWaste: Number,
  pickups: Number,
  users: Number,
  wasteByType: {
    plastic: Number,
    paper: Number,
    metal: Number,
    ewaste: Number,
    others: Number
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Analytics', analyticsSchema);
