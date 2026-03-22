require('dotenv').config();
const mongoose = require('mongoose');
const Truck = require('./models/Truck');
const Driver = require('./models/Driver');
const Violation = require('./models/Violation');
const Complaint = require('./models/Complaint');
const Analytics = require('./models/Analytics');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('DB Connection Error:', error);
    process.exit(1);
  }
};

const seedDB = async () => {
  try {
    // Clear existing data
    await Truck.deleteMany({});
    await Driver.deleteMany({});
    await Violation.deleteMany({});
    await Complaint.deleteMany({});
    await Analytics.deleteMany({});

    // Seed Trucks
    const trucks = await Truck.insertMany([
      {
        id: 'T-01',
        model: 'Isuzu Giga Compactor',
        registration: 'WP NA-4589',
        status: 'Moving',
        location: 'No. 45, Rosmead Place',
        ward: 'Ward 07: Cinnamon Gardens',
        loadPercentage: 65,
        speed: '32 km/hr',
        weight: '4,250 kg',
        route: [[6.9145, 79.8650], [6.9160, 79.8680], [6.9120, 79.8750]],
        shiftTime: '4h 30m Active',
        shiftEnd: '4:30 PM'
      },
      {
        id: 'T-02',
        model: 'Volvo FH16',
        registration: 'WP NA-4590',
        status: 'Moving',
        location: 'No. 22, Galle Rd',
        ward: 'Ward 04: Bambalapitiya',
        loadPercentage: 80,
        speed: '25 km/hr',
        weight: '5,100 kg',
        route: [[6.8950, 79.8600]],
        shiftTime: '3h 45m Active',
        shiftEnd: '5:00 PM'
      },
      {
        id: 'T-05',
        model: 'Mercedes Actros',
        registration: 'WP NA-4591',
        status: 'Completed',
        location: 'Depot',
        ward: 'Ward 37: Kollupitiya',
        loadPercentage: 0,
        speed: '0 km/hr',
        weight: '0 kg',
        route: [[6.9145, 79.8650]],
        shiftTime: '8h',
        shiftEnd: '4:00 PM'
      }
    ]);

    // Seed Drivers
    const drivers = await Driver.insertMany([
      {
        name: 'Ben Tennyson',
        email: 'ben@cleansl.com',
        phone: '+94771234567',
        pickups: 158,
        rating: 4.8,
        efficiency: 92,
        status: 'Active',
        truckId: trucks[0]._id
      },
      {
        name: 'Nafhath Mohamed',
        email: 'nafhath@cleansl.com',
        phone: '+94771234568',
        pickups: 203,
        rating: 4.9,
        efficiency: 96,
        status: 'Active',
        truckId: trucks[1]._id
      },
      {
        name: 'Iman Fazney',
        email: 'iman@cleansl.com',
        phone: '+94771234569',
        pickups: 142,
        rating: 4.7,
        efficiency: 88,
        status: 'Active',
        truckId: trucks[2]._id
      },
      {
        name: 'Aakif Saroos',
        email: 'aakif@cleansl.com',
        phone: '+94771234570',
        pickups: 98,
        rating: 4.6,
        efficiency: 85,
        status: 'Active'
      },
      {
        name: 'Harish Prasanna',
        email: 'harish@cleansl.com',
        phone: '+94771234571',
        pickups: 178,
        rating: 4.8,
        efficiency: 91,
        status: 'Active'
      }
    ]);

    // Seed Violations
    await Violation.insertMany([
      {
        date: new Date('2025-11-21'),
        type: 'Unsorted Waste',
        resident: 'No. 15, Flower Rd',
        status: 'Pending',
        score: 92,
        truckId: trucks[0]._id
      },
      {
        date: new Date('2025-11-20'),
        type: 'Hazardous Waste',
        resident: 'No. 22, Galle Rd',
        status: 'Disputed',
        score: 87,
        truckId: trucks[1]._id
      },
      {
        date: new Date('2025-11-19'),
        type: 'Unsorted Waste',
        resident: 'No. 8, Rosmead Pl',
        status: 'Confirmed',
        score: 95
      },
      {
        date: new Date('2025-11-18'),
        type: 'Mixed Waste',
        resident: 'No. 45, Baudhaloka Mw',
        status: 'Resolved',
        score: 89
      }
    ]);

    // Seed Complaints
    await Complaint.insertMany([
      {
        date: new Date(),
        type: 'Missed Pickup',
        description: 'Waste not collected as scheduled',
        resident: 'No. 22, Galle Rd',
        ward: 'Ward 07: Cinnamon Gardens',
        status: 'Pending',
        priority: 'High'
      },
      {
        date: new Date(),
        type: 'Noise Complaint',
        description: 'Early morning collection noise',
        resident: 'No. 15, Flower Rd',
        ward: 'Ward 04: Bambalapitiya',
        status: 'InProgress',
        priority: 'Medium'
      }
    ]);

    // Seed Analytics
    await Analytics.insertMany([
      {
        date: new Date('2025-01-15'),
        month: 'Jan',
        wasteCollected: 3000,
        totalWaste: 3000,
        pickups: 150,
        users: 800,
        wasteByType: {
          plastic: 1050,
          paper: 750,
          metal: 450,
          ewaste: 450,
          others: 300
        }
      },
      {
        date: new Date('2025-02-15'),
        month: 'Feb',
        wasteCollected: 3500,
        totalWaste: 3500,
        pickups: 175,
        users: 900,
        wasteByType: {
          plastic: 1225,
          paper: 875,
          metal: 525,
          ewaste: 525,
          others: 350
        }
      },
      {
        date: new Date('2025-03-15'),
        month: 'Mar',
        wasteCollected: 3200,
        totalWaste: 3200,
        pickups: 160,
        users: 850,
        wasteByType: {
          plastic: 1120,
          paper: 800,
          metal: 480,
          ewaste: 480,
          others: 320
        }
      }
    ]);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

connectDB().then(() => seedDB());
