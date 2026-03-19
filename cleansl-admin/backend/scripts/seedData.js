const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const User = require('../models/User');
const Truck = require('../models/Truck');
const Complaint = require('../models/Complaint');
const Violation = require('../models/Violation');
const Analytics = require('../models/Analytics');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cleansl-admin');
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Truck.deleteMany({});
    await Complaint.deleteMany({});
    await Violation.deleteMany({});
    await Analytics.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create users (drivers and admin)
    const users = await User.insertMany([
      {
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@cleansl.com',
        password: 'admin123',
        phone: '+94701234567',
        role: 'admin'
      },
      {
        firstName: 'Aravind',
        lastName: 'Silva',
        email: 'aravind@cleansl.com',
        password: 'driver123',
        phone: '+94701111111',
        role: 'driver',
        licenseNumber: 'DL-2024-001',
        licenseExpiry: new Date('2026-12-31')
      },
      {
        firstName: 'Priya',
        lastName: 'Kumari',
        email: 'priya@cleansl.com',
        password: 'driver123',
        phone: '+94702222222',
        role: 'driver',
        licenseNumber: 'DL-2024-002',
        licenseExpiry: new Date('2025-06-30')
      },
      {
        firstName: 'Rajesh',
        lastName: 'Kumar',
        email: 'rajesh@cleansl.com',
        password: 'driver123',
        phone: '+94703333333',
        role: 'driver',
        licenseNumber: 'DL-2024-003',
        licenseExpiry: new Date('2026-03-31')
      },
      {
        firstName: 'Supervisor',
        lastName: 'One',
        email: 'supervisor@cleansl.com',
        password: 'supervisor123',
        phone: '+94704444444',
        role: 'supervisor'
      }
    ]);
    console.log('👥 Created users');

    // Create trucks
    const trucks = await Truck.insertMany([
      {
        truckId: 'T-001',
        registrationNumber: 'WP NA-4589',
        model: 'Isuzu Giga Compactor',
        capacity: 5000,
        currentLoad: 3250,
        status: 'in-service',
        driver: users[1]._id,
        currentLocation: {
          latitude: 6.9145,
          longitude: 79.8650,
          address: 'No. 45, Rosmead Place, Cinnamon Gardens'
        },
        fuelLevel: 75,
        mileage: 45230
      },
      {
        truckId: 'T-002',
        registrationNumber: 'WP NA-4590',
        model: 'Hino 500 Series',
        capacity: 6000,
        currentLoad: 4500,
        status: 'in-service',
        driver: users[2]._id,
        currentLocation: {
          latitude: 6.9200,
          longitude: 79.8700,
          address: 'No. 78, Galle Road, Colombo 3'
        },
        fuelLevel: 60,
        mileage: 52100
      },
      {
        truckId: 'T-003',
        registrationNumber: 'WP NA-4591',
        model: 'Volvo FH16',
        capacity: 7000,
        currentLoad: 2000,
        status: 'idle',
        driver: users[3]._id,
        currentLocation: {
          latitude: 6.9100,
          longitude: 79.8600,
          address: 'Main Depot, Colombo 5'
        },
        fuelLevel: 85,
        mileage: 38900
      },
      {
        truckId: 'T-004',
        registrationNumber: 'WP NA-4592',
        model: 'Isuzu Giga Compactor',
        capacity: 5000,
        currentLoad: 500,
        status: 'maintenance',
        currentLocation: {
          latitude: 6.9300,
          longitude: 79.8800,
          address: 'Service Center, Colombo 4'
        },
        fuelLevel: 0,
        mileage: 89200
      }
    ]);
    console.log('🚚 Created trucks');

    // Create complaints
    await Complaint.insertMany([
      {
        complaintId: 'CMP-001',
        title: 'Missed Collection',
        description: 'Waste bin not collected from Ward 7',
        category: 'missed-collection',
        priority: 'high',
        location: {
          address: 'Cinnamon Gardens',
          latitude: 6.9145,
          longitude: 79.8650,
          ward: 'Ward 07'
        },
        reportedBy: {
          name: 'John Smith',
          email: 'john@example.com',
          phone: '+94701234567',
          citizenId: 'IC-123456'
        },
        assignedTruck: trucks[0]._id,
        assignedDriver: users[1]._id,
        status: 'resolved'
      },
      {
        complaintId: 'CMP-002',
        title: 'Damaged Bin',
        description: 'Collection bin is broken and needs replacement',
        category: 'damaged-bin',
        priority: 'medium',
        location: {
          address: 'Galle Road',
          latitude: 6.9200,
          longitude: 79.8700,
          ward: 'Ward 10'
        },
        reportedBy: {
          name: 'Sarah Johnson',
          email: 'sarah@example.com',
          phone: '+94702345678',
          citizenId: 'IC-123457'
        },
        status: 'new'
      },
      {
        complaintId: 'CMP-003',
        title: 'Dirty Street',
        description: 'Street needs cleaning after collection',
        category: 'dirty-street',
        priority: 'low',
        location: {
          address: 'Colombo 3',
          latitude: 6.9250,
          longitude: 79.8750,
          ward: 'Ward 08'
        },
        reportedBy: {
          name: 'Michael Brown',
          email: 'michael@example.com',
          phone: '+94703456789',
          citizenId: 'IC-123458'
        },
        status: 'in-progress'
      }
    ]);
    console.log('📋 Created complaints');

    // Create violations
    await Violation.insertMany([
      {
        violationId: 'VIO-001',
        truck: trucks[0]._id,
        driver: users[1]._id,
        type: 'speeding',
        severity: 'high',
        location: {
          address: 'Galle Road',
          latitude: 6.9200,
          longitude: 79.8700,
          ward: 'Ward 10'
        },
        description: 'Truck exceeded speed limit in residential area',
        status: 'resolved',
        penalty: {
          type: 'fine',
          amount: 1000,
          reason: 'Speeding violation'
        }
      },
      {
        violationId: 'VIO-002',
        truck: trucks[1]._id,
        driver: users[2]._id,
        type: 'harsh-braking',
        severity: 'medium',
        location: {
          address: 'Colombo 5',
          latitude: 6.9300,
          longitude: 79.8800,
          ward: 'Ward 12'
        },
        description: 'Harsh braking detected by sensors',
        status: 'reported'
      },
      {
        violationId: 'VIO-003',
        truck: trucks[0]._id,
        driver: users[1]._id,
        type: 'off-route',
        severity: 'critical',
        location: {
          address: 'Colombo 4',
          latitude: 6.9100,
          longitude: 79.8600,
          ward: 'Ward 09'
        },
        description: 'Truck deviated from planned route',
        status: 'under-review'
      }
    ]);
    console.log('⚠️  Created violations');

    // Create analytics
    const today = new Date();
    await Analytics.insertMany([
      {
        date: new Date(today.setDate(today.getDate() - 1)),
        truck: trucks[0]._id,
        driver: users[1]._id,
        metrics: {
          distanceTraveled: 45.2,
          fuelConsumed: 12.5,
          fuelEfficiency: 3.62,
          wasteCollected: 3250,
          collectionsCompleted: 28,
          averageSpeed: 35,
          maxSpeed: 65,
          violations: 1,
          collisionsDetected: 0,
          harshEventCount: 2,
          idleTime: 45,
          activeTime: 420,
          completionRate: 95
        },
        efficiency: {
          routeOptimization: 92,
          timeOnTask: 88,
          fuelUsageRating: 85,
          safetyScore: 78
        },
        location: { ward: 'Ward 07', district: 'Colombo', zone: 'Central' },
        status: 'completed'
      },
      {
        date: today,
        truck: trucks[1]._id,
        driver: users[2]._id,
        metrics: {
          distanceTraveled: 52.3,
          fuelConsumed: 14.2,
          fuelEfficiency: 3.68,
          wasteCollected: 4500,
          collectionsCompleted: 32,
          averageSpeed: 38,
          maxSpeed: 70,
          violations: 0,
          collisionsDetected: 0,
          harshEventCount: 1,
          idleTime: 30,
          activeTime: 435,
          completionRate: 98
        },
        efficiency: {
          routeOptimization: 96,
          timeOnTask: 94,
          fuelUsageRating: 90,
          safetyScore: 92
        },
        location: { ward: 'Ward 10', district: 'Colombo', zone: 'Central' },
        status: 'completed'
      }
    ]);
    console.log('📊 Created analytics');

    console.log('\n✅ Database seeded successfully!');
    console.log('\n📋 Test Credentials:');
    console.log('Admin: admin@cleansl.com / admin123');
    console.log('Driver: aravind@cleansl.com / driver123');
    console.log('Supervisor: supervisor@cleansl.com / supervisor123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedData();
