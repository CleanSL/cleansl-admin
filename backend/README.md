# CleanSL Admin - Backend Setup Guide

## Overview
This backend provides a complete RESTful API for the CleanSL Admin Dashboard. It includes waste management tracking, vehicle fleet management, driver performance analytics, complaints handling, and violation tracking.

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Configure Environment Variables**
   Edit `.env` file with your settings:
   ```
   MONGODB_URI=mongodb://localhost:27017/cleansl-admin
   PORT=5000
   NODE_ENV=development
   ```

3. **Start MongoDB**
   - **Local**: `mongod` (if installed locally)
   - **Cloud**: Use MongoDB Atlas connection string in `.env`

4. **Seed the Database** (Optional - adds sample data)
   ```bash
   npm run seed
   ```

5. **Start the Server**
   ```bash
   npm run dev       # Development with auto-reload
   npm start         # Production mode
   ```

   Server will run on `http://localhost:5000`

## API Endpoints

### Trucks
- `GET /api/trucks` - Get all trucks
- `GET /api/trucks/:id` - Get truck by ID
- `GET /api/trucks/fleet-status` - Get fleet status summary
- `POST /api/trucks` - Create new truck
- `PUT /api/trucks/:id` - Update truck
- `DELETE /api/trucks/:id` - Delete truck

### Drivers
- `GET /api/drivers` - Get all drivers
- `GET /api/drivers/:id` - Get driver by ID
- `GET /api/drivers/performance` - Get driver performance data
- `POST /api/drivers` - Create new driver
- `PUT /api/drivers/:id` - Update driver
- `DELETE /api/drivers/:id` - Delete driver

### Violations
- `GET /api/violations` - Get all violations
- `GET /api/violations/:id` - Get violation by ID
- `GET /api/violations/stats` - Get violation statistics
- `POST /api/violations` - Create new violation
- `PUT /api/violations/:id` - Update violation
- `DELETE /api/violations/:id` - Delete violation

### Complaints
- `GET /api/complaints` - Get all complaints
- `GET /api/complaints/:id` - Get complaint by ID
- `GET /api/complaints/stats` - Get complaint statistics
- `POST /api/complaints` - Create new complaint
- `PUT /api/complaints/:id` - Update complaint
- `DELETE /api/complaints/:id` - Delete complaint

### Analytics
- `GET /api/analytics` - Get analytics data
- `GET /api/analytics/dashboard-stats` - Get dashboard statistics
- `GET /api/analytics/monthly-trends` - Get monthly trends
- `GET /api/analytics/waste-distribution` - Get waste distribution data
- `POST /api/analytics` - Create new analytics record

### Health Check
- `GET /api/health` - Check if backend is running

## Database Schema

### Truck
- `id`: String (truck identifier)
- `model`: String (vehicle model)
- `registration`: String (license plate)
- `status`: Enum (Moving, Idle, Completed, Delayed)
- `location`: String (current location)
- `ward`: String (assigned ward)
- `loadPercentage`: Number (current load %)
- `speed`: String (current speed)
- `weight`: String (waste weight)
- `route`: Array of coordinates
- `shiftTime`: String (shift duration)
- `shiftEnd`: String (shift end time)
- `lastUpdated`: Date

### Driver
- `name`: String
- `email`: String (unique)
- `phone`: String
- `pickups`: Number
- `rating`: Number (0-5)
- `efficiency`: Number (0-100)
- `status`: Enum (Active, Inactive, On Leave)
- `truckId`: ObjectId (reference to Truck)
- `createdAt`: Date

### Violation
- `date`: Date
- `type`: String (waste violation type)
- `resident`: String (resident location)
- `status`: Enum (Pending, Disputed, Confirmed, Resolved)
- `score`: Number (violation severity score)
- `details`: String
- `imageUrl`: String (optional)
- `truckId`: ObjectId (reference to Truck)
- `createdAt`: Date

### Complaint
- `date`: Date
- `type`: String (complaint type)
- `description`: String
- `resident`: String
- `ward`: String
- `status`: Enum (Pending, InProgress, Resolved)
- `priority`: Enum (Low, Medium, High)
- `assignedTo`: ObjectId (reference to Driver)
- `createdAt`: Date

### Analytics
- `date`: Date
- `month`: String
- `wasteCollected`: Number (in kg)
- `totalWaste`: Number
- `pickups`: Number
- `users`: Number
- `wasteByType`: Object (plastic, paper, metal, ewaste, others)
- `createdAt`: Date

### Ward
- `name`: String
- `progress`: Number (0-100)
- `trucks`: Array of truck IDs
- `status`: Enum (Progress, Completed, Delayed)
- `population`: Number
- `area`: Number (in sq km)
- `createdAt`: Date

## Testing the API

### Using cURL
```bash
# Get all trucks
curl http://localhost:5000/api/trucks

# Get analytics stats
curl http://localhost:5000/api/analytics/dashboard-stats

# Create a new driver
curl -X POST http://localhost:5000/api/drivers \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@cleansl.com","phone":"+94771234567","pickups":100,"rating":4.5,"efficiency":88}'
```

### Using Postman
1. Import the API endpoints into Postman
2. Set Base URL: `http://localhost:5000/api`
3. Test each endpoint with sample data

## Frontend Integration

The frontend (React app) connects to this backend via the API service at `src/services/api.js`. 

**Steps to connect**:
1. Ensure backend is running on `http://localhost:5000`
2. Start the React app: `npm start`
3. The app will automatically fetch data from `/api/*` endpoints

**Backend must be running before starting the frontend** for all features to work.

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB service is running
- Check connection string in `.env`
- Verify MongoDB port (default: 27017)

### CORS Errors
- Backend includes CORS headers automatically
- If issues persist, check `server.js` CORS configuration

### Port Already in Use
- Change PORT in `.env` to an available port
- Update frontend `proxy` in package.json accordingly

### API Returns 404
- Verify endpoint path matches exactly
- Ensure database has data (run `npm run seed`)
- Check server logs for errors

## Development

### Project Structure
```
backend/
├── config/
│   └── db.js              # MongoDB connection
├── models/
│   ├── Truck.js
│   ├── Driver.js
│   ├── Violation.js
│   ├── Complaint.js
│   ├── Analytics.js
│   └── Ward.js
├── routes/
│   ├── trucks.js
│   ├── drivers.js
│   ├── violations.js
│   ├── complaints.js
│   └── analytics.js
├── controllers/
│   ├── truckController.js
│   ├── driverController.js
│   ├── violationController.js
│   ├── complaintController.js
│   └── analyticsController.js
├── server.js              # Main server file
├── seed.js                # Database seeding
├── package.json
└── .env
```

### Adding New Features

1. Create a model in `models/`
2. Create a controller in `controllers/`
3. Create routes in `routes/`
4. Import routes in `server.js`
5. Add corresponding API calls in frontend `src/services/api.js`

## Support

For issues or questions about the API:
1. Check server logs: `npm run dev`
2. Verify database connectivity
3. Check .env configuration
4. Ensure all dependencies are installed

## Next Steps

- Deploy backend to a production server (Heroku, AWS, etc.)
- Set up MongoDB Atlas for cloud database
- Implement authentication and authorization
- Add image uploads for violations/complaints
- Set up automated data backups
