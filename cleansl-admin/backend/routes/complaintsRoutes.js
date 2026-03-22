const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');

// Get all complaints
router.get('/', async (req, res) => {
  try {
    const { status, category, priority, page = 1, limit = 10 } = req.query;
    let query = {};

    if (status) query.status = status;
    if (category) query.category = category;
    if (priority) query.priority = priority;

    const skip = (page - 1) * limit;
    const complaints = await Complaint.find(query)
      .populate('assignedTruck', 'registrationNumber')
      .populate('assignedDriver', 'firstName lastName')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Complaint.countDocuments(query);

    res.json({
      data: complaints,
      pagination: { total, page: parseInt(page), limit: parseInt(limit) }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get complaint by ID
router.get('/:id', async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate('assignedTruck')
      .populate('assignedDriver');

    if (!complaint) {
      return res.status(404).json({ error: 'Complaint not found' });
    }

    res.json(complaint);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new complaint
router.post('/', async (req, res) => {
  try {
    const { title, description, category, priority, location, reportedBy } = req.body;

    const newComplaint = new Complaint({
      complaintId: `CMP-${Date.now()}`,
      title,
      description,
      category,
      priority,
      location,
      reportedBy
    });

    const savedComplaint = await newComplaint.save();
    res.status(201).json(savedComplaint);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update complaint
router.put('/:id', async (req, res) => {
  try {
    const { status, assignedTruck, assignedDriver, resolution, rating, feedback } = req.body;

    const updateData = { status, assignedTruck, assignedDriver, updatedAt: new Date() };

    if (resolution) {
      updateData.resolution = {
        ...resolution,
        resolvedAt: new Date()
      };
    }

    if (rating) updateData.rating = rating;
    if (feedback) updateData.feedback = feedback;

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate('assignedTruck').populate('assignedDriver');

    if (!complaint) {
      return res.status(404).json({ error: 'Complaint not found' });
    }

    res.json(complaint);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get complaint statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const stats = await Complaint.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          new: {
            $sum: { $cond: [{ $eq: ['$status', 'new'] }, 1, 0] }
          },
          inProgress: {
            $sum: { $cond: [{ $eq: ['$status', 'in-progress'] }, 1, 0] }
          },
          resolved: {
            $sum: { $cond: [{ $eq: ['$status', 'resolved'] }, 1, 0] }
          },
          rejected: {
            $sum: { $cond: [{ $eq: ['$status', 'rejected'] }, 1, 0] }
          }
        }
      }
    ]);

    const categoryStats = await Complaint.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      statusStats: stats[0] || {},
      categoryStats
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete complaint
router.delete('/:id', async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndDelete(req.params.id);
    if (!complaint) {
      return res.status(404).json({ error: 'Complaint not found' });
    }
    res.json({ message: 'Complaint deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
