const express = require('express');
const router = express.Router();
const Violation = require('../models/Violation');

// Get all violations
router.get('/', async (req, res) => {
  try {
    const { status, severity, type, page = 1, limit = 10 } = req.query;
    let query = {};

    if (status) query.status = status;
    if (severity) query.severity = severity;
    if (type) query.type = type;

    const skip = (page - 1) * limit;
    const violations = await Violation.find(query)
      .populate('truck', 'registrationNumber truckId')
      .populate('driver', 'firstName lastName email')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ timestamp: -1 });

    const total = await Violation.countDocuments(query);

    res.json({
      data: violations,
      pagination: { total, page: parseInt(page), limit: parseInt(limit) }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get violation by ID
router.get('/:id', async (req, res) => {
  try {
    const violation = await Violation.findById(req.params.id)
      .populate('truck')
      .populate('driver');

    if (!violation) {
      return res.status(404).json({ error: 'Violation not found' });
    }

    res.json(violation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new violation
router.post('/', async (req, res) => {
  try {
    const { truck, driver, type, severity, location, description, evidence } = req.body;

    const newViolation = new Violation({
      violationId: `VIO-${Date.now()}`,
      truck,
      driver,
      type,
      severity,
      location,
      description,
      evidence
    });

    const savedViolation = await newViolation.save();
    const populatedViolation = await savedViolation.populate('truck').populate('driver');

    res.status(201).json(populatedViolation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update violation
router.put('/:id', async (req, res) => {
  try {
    const { status, penalty, appealedAt, appealStatus, notes } = req.body;

    const updateData = { status, notes, updatedAt: new Date() };

    if (penalty) updateData.penalty = penalty;
    if (appealedAt) updateData.appealedAt = appealedAt;
    if (appealStatus) updateData.appealStatus = appealStatus;

    const violation = await Violation.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate('truck').populate('driver');

    if (!violation) {
      return res.status(404).json({ error: 'Violation not found' });
    }

    res.json(violation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get violation statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const stats = await Violation.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          reported: { $sum: { $cond: [{ $eq: ['$status', 'reported'] }, 1, 0] } },
          acknowledged: { $sum: { $cond: [{ $eq: ['$status', 'acknowledged'] }, 1, 0] } },
          underReview: { $sum: { $cond: [{ $eq: ['$status', 'under-review'] }, 1, 0] } },
          resolved: { $sum: { $cond: [{ $eq: ['$status', 'resolved'] }, 1, 0] } },
          dismissed: { $sum: { $cond: [{ $eq: ['$status', 'dismissed'] }, 1, 0] } }
        }
      }
    ]);

    const severityStats = await Violation.aggregate([
      {
        $group: {
          _id: '$severity',
          count: { $sum: 1 }
        }
      }
    ]);

    const typeStats = await Violation.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      statusStats: stats[0] || {},
      severityStats,
      typeStats
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete violation
router.delete('/:id', async (req, res) => {
  try {
    const violation = await Violation.findByIdAndDelete(req.params.id);
    if (!violation) {
      return res.status(404).json({ error: 'Violation not found' });
    }
    res.json({ message: 'Violation deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
