const express = require('express');
const router = express.Router();
const violationController = require('../controllers/violationController');

router.get('/', violationController.getViolations);
router.get('/stats', violationController.getViolationStats);
router.get('/:id', violationController.getViolationById);
router.post('/', violationController.createViolation);
router.put('/:id', violationController.updateViolation);
router.delete('/:id', violationController.deleteViolation);

module.exports = router;
