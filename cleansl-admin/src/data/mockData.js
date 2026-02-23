// src/data/mockData.js

export const MOCK_STATS = {
  totalPickups: 1240,
  missedPickups: 14,
  activeTrucks: 8,
  newComplaints: 5,
  efficiency: "72%"
};

export const MOCK_TRUCKS = [
  { id: 'T-01', driver: 'Nafhath', ward: '07', location: 'Cinnamon Gardens', status: 'Moving', speed: '32 km/h' },
  { id: 'T-05', driver: 'Husni', ward: '40', location: 'Bambalapitiya', status: 'Verified', speed: '0 km/h' }
];

export const MOCK_COMPLAINTS = [
  { 
    id: 'TK-400', 
    resident: 'Ilman', 
    category: 'Missed Pickup', 
    status: 'Pending', 
    time: '45 mins ago',
    image: 'https://example.com/trash-photo.jpg' // Eventually from Supabase Storage
  }
];

export const MOCK_OPERATIONS = [
  { id: 1, event: "Truck En Route", detail: "Truck T-05 | Ward 37: Kollupitiya", time: "Just now", status: "Moving", color: "blue" },
  { id: 2, event: "Collection Success", detail: "Truck T-01 | Ward 07: Cinnamon Gardens", time: "2 mins ago", status: "Verified", color: "green" },
  { id: 3, event: "AI Violation", detail: "Unsorted Waste | No. 15, Flower Rd", time: "14 mins ago", status: "Violation", color: "red" },
  { id: 4, event: "Resident Complaint", detail: "Missed Pickup | No. 22, Galle Rd", time: "45 mins ago", status: "Pending", color: "amber" }
];