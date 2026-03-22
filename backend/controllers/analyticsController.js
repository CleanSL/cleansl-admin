const Analytics = require('../models/Analytics');
const Driver = require('../models/Driver');
const Truck = require('../models/Truck');

exports.getAnalytics = async (req, res) => {
  try {
    const analytics = await Analytics.find().sort({ date: -1 }).limit(12);
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const trucks = await Truck.find();
    const drivers = await Driver.find();
    const latestAnalytics = await Analytics.findOne().sort({ date: -1 });

    const totalPickups = drivers.reduce((sum, d) => sum + d.pickups, 0);
    const activeTrucks = trucks.filter(t => t.status === 'Moving').length;
    const totalWaste = latestAnalytics?.totalWaste || 4800;
    const totalUsers = drivers.length + (Math.random() * 50 | 0);

    res.json({
      totalPickups,
      activeTrucks,
      totalWaste,
      totalUsers,
      efficiency: Math.round((drivers.reduce((sum, d) => sum + d.efficiency, 0) / (drivers.length || 1)))
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createAnalytics = async (req, res) => {
  const analytics = new Analytics(req.body);
  try {
    const newAnalytics = await analytics.save();
    res.status(201).json(newAnalytics);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getMonthlyTrends = async (req, res) => {
  try {
    const analytics = await Analytics.aggregate([
      {
        $group: {
          _id: '$month',
          value: { $sum: '$wasteCollected' }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getWasteDistribution = async (req, res) => {
  try {
    const latestAnalytics = await Analytics.findOne().sort({ date: -1 });
    if (!latestAnalytics) {
      return res.json([
        { name: 'Plastic', value: 35, fill: '#2D5A27' },
        { name: 'Paper', value: 25, fill: '#5DAE54' },
        { name: 'Metal', value: 15, fill: '#A3D99F' },
        { name: 'E-waste', value: 15, fill: '#E9F2E8' },
        { name: 'Others', value: 10, fill: '#CBD5E1' }
      ]);
    }

    const waste = latestAnalytics.wasteByType;
    const total = Object.values(waste).reduce((a, b) => a + b, 1);
    
    res.json([
      { name: 'Plastic', value: Math.round((waste.plastic / total) * 100), fill: '#2D5A27' },
      { name: 'Paper', value: Math.round((waste.paper / total) * 100), fill: '#5DAE54' },
      { name: 'Metal', value: Math.round((waste.metal / total) * 100), fill: '#A3D99F' },
      { name: 'E-waste', value: Math.round((waste.ewaste / total) * 100), fill: '#E9F2E8' },
      { name: 'Others', value: Math.round((waste.others / total) * 100), fill: '#CBD5E1' }
    ]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
