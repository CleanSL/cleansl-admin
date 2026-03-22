const Violation = require('../models/Violation');

exports.getViolations = async (req, res) => {
  try {
    const violations = await Violation.find().sort({ date: -1 });
    res.json(violations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getViolationById = async (req, res) => {
  try {
    const violation = await Violation.findById(req.params.id);
    if (!violation) return res.status(404).json({ message: 'Violation not found' });
    res.json(violation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createViolation = async (req, res) => {
  const violation = new Violation(req.body);
  try {
    const newViolation = await violation.save();
    res.status(201).json(newViolation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateViolation = async (req, res) => {
  try {
    const violation = await Violation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(violation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteViolation = async (req, res) => {
  try {
    await Violation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Violation deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getViolationStats = async (req, res) => {
  try {
    const total = await Violation.countDocuments();
    const pending = await Violation.countDocuments({ status: 'Pending' });
    const confirmed = await Violation.countDocuments({ status: 'Confirmed' });
    const resolved = await Violation.countDocuments({ status: 'Resolved' });

    res.json({
      total,
      pending,
      confirmed,
      resolved,
      disputed: total - confirmed - resolved - pending
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
