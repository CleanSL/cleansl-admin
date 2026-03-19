const express = require('express');
const router = express.Router();
const truckController = require('../controllers/truckController');

router.get('/', truckController.getTrucks);
router.get('/fleet-status', truckController.getFleetStatus);
router.get('/:id', truckController.getTruckById);
router.post('/', truckController.createTruck);
router.put('/:id', truckController.updateTruck);
router.delete('/:id', truckController.deleteTruck);

module.exports = router;
