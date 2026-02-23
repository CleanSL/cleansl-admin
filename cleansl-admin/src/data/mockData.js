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
