const mongoose = require('mongoose');

const wardSchema = new mongoose.Schema({
  name: String,
  progress: { type: Number, default: 0 },
  trucks: [String],
  status: { type: String, enum: ['Progress', 'Completed', 'Delayed'], default: 'Progress' },
  population: Number,
  area: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ward', wardSchema);
