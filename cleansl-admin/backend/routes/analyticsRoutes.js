const express = require('express');
const router = express.Router();
const Analytics = require('../models/Analytics');

// Get all analytics records
router.get('/', async (req, res) => {
  try {
    const { startDate, endDate, truck, driver, page = 1, limit = 10 } = req.query;
    let query = {};

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    if (truck) query.truck = truck;
    if (driver) query.driver = driver;

    const skip = (page - 1) * limit;
    const analytics = await Analytics.find(query)
      .populate('truck', 'registrationNumber truckId')
      .populate('driver', 'firstName lastName')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ date: -1 });

    const total = await Analytics.countDocuments(query);

    res.json({
      data: analytics,
      pagination: { total, page: parseInt(page), limit: parseInt(limit) }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get analytics by truck ID
router.get('/truck/:truckId', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    let query = { truck: req.params.truckId };

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const analytics = await Analytics.find(query)
      .populate('truck')
      .populate('driver')
      .sort({ date: -1 });

    res.json(analytics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get analytics by driver ID
router.get('/driver/:driverId', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    let query = { driver: req.params.driverId };

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const analytics = await Analytics.find(query)
      .populate('truck')
      .populate('driver')
      .sort({ date: -1 });

    res.json(analytics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create analytics record
router.post('/', async (req, res) => {
  try {
    const { date, truck, driver, metrics, efficiency, location, status } = req.body;

    const newAnalytics = new Analytics({
      date: date || new Date(),
      truck,
      driver,
      metrics,
      efficiency,
      location,
      status
    });

    const savedAnalytics = await newAnalytics.save();
    const populatedAnalytics = await savedAnalytics.populate('truck').populate('driver');

    res.status(201).json(populatedAnalytics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get district-level summary
router.get('/summary/district', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    let matchStage = {};

    if (startDate || endDate) {
      matchStage.date = {};
      if (startDate) matchStage.date.$gte = new Date(startDate);
      if (endDate) matchStage.date.$lte = new Date(endDate);
    }

    const summary = await Analytics.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: '$location.district',
          totalDistance: { $sum: '$metrics.distanceTraveled' },
          totalFuel: { $sum: '$metrics.fuelConsumed' },
          totalWaste: { $sum: '$metrics.wasteCollected' },
          avgFuelEfficiency: { $avg: '$metrics.fuelEfficiency' },
          avgSafetyScore: { $avg: '$efficiency.safetyScore' },
          recordCount: { $sum: 1 }
        }
      },
      { $sort: { totalWaste: -1 } }
    ]);

    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get overall performance metrics
router.get('/summary/performance', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    let matchStage = {};

    if (startDate || endDate) {
      matchStage.date = {};
      if (startDate) matchStage.date.$gte = new Date(startDate);
      if (endDate) matchStage.date.$lte = new Date(endDate);
    }

    const performance = await Analytics.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: null,
          totalCollections: { $sum: '$metrics.collectionsCompleted' },
          totalWasteCollected: { $sum: '$metrics.wasteCollected' },
          totalFuelConsumed: { $sum: '$metrics.fuelConsumed' },
          totalDistanceTraveled: { $sum: '$metrics.distanceTraveled' },
          avgFuelEfficiency: { $avg: '$metrics.fuelEfficiency' },
          avgCompletionRate: { $avg: '$metrics.completionRate' },
          avgSafetyScore: { $avg: '$efficiency.safetyScore' },
          totalViolations: { $sum: '$metrics.violations' },
          recordCount: { $sum: 1 }
        }
      }
    ]);

    res.json(performance[0] || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
