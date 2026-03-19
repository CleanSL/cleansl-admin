const express = require('express');
const router = express.Router();
const Truck = require('../models/Truck');
const User = require('../models/User');

// Get all trucks
router.get('/', async (req, res) => {
  try {
    const trucks = await Truck.find().populate('driver', 'firstName lastName email phone');
    res.json(trucks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get truck by ID
router.get('/:id', async (req, res) => {
  try {
    const truck = await Truck.findById(req.params.id).populate('driver');
    if (!truck) {
      return res.status(404).json({ error: 'Truck not found' });
    }
    res.json(truck);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get trucks by status
router.get('/status/:status', async (req, res) => {
  try {
    const trucks = await Truck.find({ status: req.params.status }).populate('driver');
    res.json(trucks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new truck
router.post('/', async (req, res) => {
  try {
    const { truckId, registrationNumber, model, capacity, driver } = req.body;

    const existingTruck = await Truck.findOne({ 
      $or: [{ truckId }, { registrationNumber }] 
    });
    if (existingTruck) {
      return res.status(400).json({ error: 'Truck already exists' });
    }

    const newTruck = new Truck({
      truckId,
      registrationNumber,
      model,
      capacity,
      driver
    });

    const savedTruck = await newTruck.save();
    const populatedTruck = await savedTruck.populate('driver');

    res.status(201).json(populatedTruck);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update truck
router.put('/:id', async (req, res) => {
  try {
    const { status, currentLoad, fuelLevel, mileage, currentLocation } = req.body;

    const truck = await Truck.findByIdAndUpdate(
      req.params.id,
      { 
        status, 
        currentLoad, 
        fuelLevel, 
        mileage, 
        currentLocation,
        lastLocationUpdate: new Date(),
        updatedAt: new Date()
      },
      { new: true }
    ).populate('driver');

    if (!truck) {
      return res.status(404).json({ error: 'Truck not found' });
    }

    res.json(truck);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update truck location
router.patch('/:id/location', async (req, res) => {
  try {
    const { latitude, longitude, address } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    const truck = await Truck.findByIdAndUpdate(
      req.params.id,
      {
        currentLocation: { latitude, longitude, address },
        lastLocationUpdate: new Date()
      },
      { new: true }
    );

    if (!truck) {
      return res.status(404).json({ error: 'Truck not found' });
    }

    res.json(truck);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add location to route
router.patch('/:id/add-route-point', async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    const truck = await Truck.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          route: {
            latitude,
            longitude,
            timestamp: new Date()
          }
        }
      },
      { new: true }
    );

    if (!truck) {
      return res.status(404).json({ error: 'Truck not found' });
    }

    res.json(truck);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete truck
router.delete('/:id', async (req, res) => {
  try {
    const truck = await Truck.findByIdAndDelete(req.params.id);
    if (!truck) {
      return res.status(404).json({ error: 'Truck not found' });
    }
    res.json({ message: 'Truck deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
