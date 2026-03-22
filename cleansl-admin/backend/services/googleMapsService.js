const axios = require('axios');

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY_WEB;
const BASE_URL = 'https://maps.googleapis.com/maps/api';

/**
 * Get coordinates from an address
 * @param {string} address - The address to geocode
 * @returns {Promise} - Returns lat/lng coordinates
 */
async function geocodeAddress(address) {
  try {
    const response = await axios.get(`${BASE_URL}/geocode/json`, {
      params: {
        address,
        key: GOOGLE_MAPS_API_KEY
      }
    });

    if (response.data.results.length > 0) {
      const { lat, lng } = response.data.results[0].geometry.location;
      return { lat, lng, success: true };
    }
    return { success: false, error: 'Address not found' };
  } catch (error) {
    console.error('Geocoding error:', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Get address from coordinates (reverse geocoding)
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @returns {Promise} - Returns address
 */
async function reverseGeocode(lat, lng) {
  try {
    const response = await axios.get(`${BASE_URL}/geocode/json`, {
      params: {
        latlng: `${lat},${lng}`,
        key: GOOGLE_MAPS_API_KEY
      }
    });

    if (response.data.results.length > 0) {
      return {
        address: response.data.results[0].formatted_address,
        success: true
      };
    }
    return { success: false, error: 'Address not found' };
  } catch (error) {
    console.error('Reverse geocoding error:', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Get distance and duration between two locations
 * @param {object} origin - { lat, lng }
 * @param {object} destination - { lat, lng }
 * @returns {Promise} - Distance and duration info
 */
async function getDistance(origin, destination) {
  try {
    const response = await axios.get(`${BASE_URL}/distancematrix/json`, {
      params: {
        origins: `${origin.lat},${origin.lng}`,
        destinations: `${destination.lat},${destination.lng}`,
        key: GOOGLE_MAPS_API_KEY
      }
    });

    const element = response.data.rows[0].elements[0];
    if (element.status === 'OK') {
      return {
        distance: element.distance.text,
        distanceValue: element.distance.value, // in meters
        duration: element.duration.text,
        durationValue: element.duration.value, // in seconds
        success: true
      };
    }
    return { success: false, error: 'No route found' };
  } catch (error) {
    console.error('Distance calculation error:', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Get directions between two locations
 * @param {object} origin - { lat, lng }
 * @param {object} destination - { lat, lng }
 * @returns {Promise} - Directions with route info
 */
async function getDirections(origin, destination) {
  try {
    const response = await axios.get(`${BASE_URL}/directions/json`, {
      params: {
        origin: `${origin.lat},${origin.lng}`,
        destination: `${destination.lat},${destination.lng}`,
        key: GOOGLE_MAPS_API_KEY
      }
    });

    if (response.data.routes.length > 0) {
      const route = response.data.routes[0];
      const legs = route.legs[0];
      
      const steps = legs.steps.map(step => ({
        instruction: step.html_instructions,
        distance: step.distance.text,
        duration: step.duration.text,
        startLocation: step.start_location,
        endLocation: step.end_location
      }));

      return {
        distance: legs.distance.text,
        duration: legs.duration.text,
        steps,
        polyline: route.overview_polyline.points,
        success: true
      };
    }
    return { success: false, error: 'No route found' };
  } catch (error) {
    console.error('Directions error:', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Check if point is within a radius of a center location
 * @param {object} point - { lat, lng }
 * @param {object} center - { lat, lng }
 * @param {number} radiusKm - Radius in kilometers
 * @returns {boolean} - True if point is within radius
 */
function isWithinRadius(point, center, radiusKm) {
  const R = 6371; // Earth's radius in km
  const dLat = (point.lat - center.lat) * Math.PI / 180;
  const dLng = (point.lng - center.lng) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(center.lat * Math.PI / 180) * Math.cos(point.lat * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance <= radiusKm;
}

module.exports = {
  geocodeAddress,
  reverseGeocode,
  getDistance,
  getDirections,
  isWithinRadius
};
