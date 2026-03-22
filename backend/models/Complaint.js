const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  type: String,
  description: String,
  resident: String,
  ward: String,
  status: { type: String, enum: ['Pending', 'InProgress', 'Resolved'], default: 'Pending' },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  assignedTo: mongoose.Schema.Types.ObjectId,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Complaint', complaintSchema);
