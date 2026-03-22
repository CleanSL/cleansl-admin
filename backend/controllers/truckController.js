const Truck = require('../models/Truck');
const Driver = require('../models/Driver');
const Ward = require('../models/Ward');

exports.getTrucks = async (req, res) => {
  try {
    const trucks = await Truck.find();
    res.json(trucks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTruckById = async (req, res) => {
  try {
    const truck = await Truck.findById(req.params.id);
    if (!truck) return res.status(404).json({ message: 'Truck not found' });
    res.json(truck);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTruck = async (req, res) => {
  const truck = new Truck(req.body);
  try {
    const newTruck = await truck.save();
    res.status(201).json(newTruck);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateTruck = async (req, res) => {
  try {
    const truck = await Truck.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(truck);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteTruck = async (req, res) => {
  try {
    await Truck.findByIdAndDelete(req.params.id);
    res.json({ message: 'Truck deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFleetStatus = async (req, res) => {
  try {
    const trucks = await Truck.find();
    const drivers = await Driver.find().populate('truckId');
    
    const totalTrucks = trucks.length;
    const activeTrucks = trucks.filter(t => t.status === 'Moving').length;
    const totalPickups = drivers.reduce((sum, d) => sum + d.pickups, 0);
    const avgEfficiency = drivers.length > 0 
      ? (drivers.reduce((sum, d) => sum + d.efficiency, 0) / drivers.length).toFixed(2)
      : 0;

    res.json({
      totalTrucks,
      activeTrucks,
      totalPickups,
      avgEfficiency,
      trucks,
      drivers
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
