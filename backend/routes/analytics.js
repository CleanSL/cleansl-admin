const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

router.get('/', analyticsController.getAnalytics);
router.get('/dashboard-stats', analyticsController.getDashboardStats);
router.get('/monthly-trends', analyticsController.getMonthlyTrends);
router.get('/waste-distribution', analyticsController.getWasteDistribution);
router.post('/', analyticsController.createAnalytics);

module.exports = router;
