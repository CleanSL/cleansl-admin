const express = require('express');
const router = express.Router();
const {
  geocodeAddress,
  reverseGeocode,
  getDistance,
  getDirections,
  isWithinRadius
} = require('../services/googleMapsService');

/**
 * POST /api/maps/geocode
 * Convert address to coordinates
 */
router.post('/geocode', async (req, res) => {
  try {
    const { address } = req.body;
    
    if (!address) {
      return res.status(400).json({ error: 'Address is required' });
    }

    const result = await geocodeAddress(address);
    if (result.success) {
      res.json(result);
    } else {
      res.status(404).json(result);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/maps/reverse-geocode
 * Convert coordinates to address
 */
router.post('/reverse-geocode', async (req, res) => {
  try {
    const { lat, lng } = req.body;
    
    if (!lat || !lng) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    const result = await reverseGeocode(lat, lng);
    if (result.success) {
      res.json(result);
    } else {
      res.status(404).json(result);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/maps/distance
 * Calculate distance between two points
 */
router.post('/distance', async (req, res) => {
  try {
    const { origin, destination } = req.body;
    
    if (!origin || !destination) {
      return res.status(400).json({ error: 'Origin and destination are required' });
    }

    const result = await getDistance(origin, destination);
    if (result.success) {
      res.json(result);
    } else {
      res.status(404).json(result);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/maps/directions
 * Get directions between two locations
 */
router.post('/directions', async (req, res) => {
  try {
    const { origin, destination } = req.body;
    
    if (!origin || !destination) {
      return res.status(400).json({ error: 'Origin and destination are required' });
    }

    const result = await getDirections(origin, destination);
    if (result.success) {
      res.json(result);
    } else {
      res.status(404).json(result);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/maps/check-geofence
 * Check if a point is within a geofence radius
 */
router.post('/check-geofence', (req, res) => {
  try {
    const { point, center, radiusKm } = req.body;
    
    if (!point || !center || !radiusKm) {
      return res.status(400).json({ 
        error: 'Point, center, and radiusKm are required' 
      });
    }

    const isInside = isWithinRadius(point, center, radiusKm);
    res.json({ isInside, radiusKm });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
