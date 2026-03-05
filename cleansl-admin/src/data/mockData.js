// mockData.js - centralized dummy data for the app

// statistics for overview cards
export const MOCK_STATS = {
  totalPickups: 1240,
  missedPickups: 14,
  activeTrucks: 8,
  newComplaints: 5,
  efficiency: "72%"
};

// operations feed for overview
export const MOCK_OPERATIONS = [
  { id: 1, event: "Truck En Route", detail: "Truck T-05 | Ward 37: Kollupitiya", time: "Just now", status: "Moving", color: "blue" },
  { id: 2, event: "Collection Success", detail: "Truck T-01 | Ward 07: Cinnamon Gardens", time: "2 mins ago", status: "Verified", color: "green" },
  { id: 3, event: "AI Violation", detail: "Unsorted Waste | No. 15, Flower Rd", time: "14 mins ago", status: "Violation", color: "red" },
  { id: 4, event: "Resident Complaint", detail: "Missed Pickup | No. 22, Galle Rd", time: "45 mins ago", status: "Pending", color: "amber" }
];

// ward data used in LiveMap sidebar
export const WARDS_DATA = [
  { id: 1, name: "Ward 07: Cinnamon Gardens", progress: 65, trucks: ["T-01", "T-04"], status: "Progress" },
  { id: 2, name: "Ward 04: Bambalapitiya", progress: 100, trucks: ["T-02", "T-05"], status: "Completed" },
  { id: 3, name: "Ward 37: Kollupitiya", progress: 15, trucks: ["T-08", "T-09"], status: "Delayed" }
];

// active truck details for map page
export const ACTIVE_TRUCK = {
  id: 'T-01',
  model: 'Isuzu Giga Compactor',
  loadPercentage: 65,
  location: 'No. 45, Rosmead Place',
  ward: 'Ward 07: Cinnamon Gardens',
  speed: '32 km/hr',
  status: 'Moving',
  weight: '4,250 kg',
  registration: 'WP NA-4589',
  shiftTime: '4h 30m Active',
  shiftEnd: '4:30 PM',
  logs: [
    { type: 'violation', message: 'Violation Detected', time: '8:12 AM' },
    { type: 'info', message: 'Route Optimized', time: '8:15 AM' }
  ],
  route: [[6.9145, 79.8650], [6.9160, 79.8680], [6.9120, 79.8750], [6.9080, 79.8700], [6.9145, 79.8650]]
};

// map configuration
export const MAP_CONFIG = {
  center: [6.9145, 79.8650],
  zoom: 16
};
