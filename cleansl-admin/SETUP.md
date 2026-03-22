# CleanSL Admin Dashboard - Complete Setup Guide

## 🚀 System Requirements

- **Node.js**: v14+ 
- **MongoDB**: v4.4+ (Local or Cloud)
- **npm** or **yarn**
- **Google Maps API Key**: Web API enabled

## 📋 Project Structure

```
cleansl-admin/
├── backend/                 # Express.js & MongoDB backend
│   ├── models/             # Database schemas
│   ├── routes/             # API endpoints
│   ├── services/           # Business logic & utilities
│   ├── scripts/            # Data seeding
│   ├── server.js           # Main server file
│   ├── package.json        # Backend dependencies
│   └── .env                # Backend environment variables
│
├── src/                    # React frontend
│   ├── pages/              # Page components
│   ├── components/         # Reusable components
│   ├── services/           # API service functions
│   ├── data/               # Mock data
│   └── images/             # Assets
├── package.json            # Frontend dependencies
├── .env.local              # Frontend environment variables
└── README.md
```

## ⚙️ Installation & Setup

### Step 1: Install MongoDB (if not installed)

#### Windows:
```bash
# Download from https://www.mongodb.com/try/download/community
# Or use Chocolatey:
choco install mongodb-community
```

#### Start MongoDB:
```bash
# Windows Services - MongoDB should auto-start
# Or run manually:
mongod
```

### Step 2: Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Seed initial data (optional but recommended)
npm run seed

# Start development server
npm run dev
# Or production:
npm start
```

**Backend will run on**: `http://localhost:5000`

### Step 3: Frontend Setup

```bash
# In root directory (same level as backend folder)
npm install

# Start React development server
npm start
```

**Frontend will run on**: `http://localhost:3000`

## 🗝️ Google Maps API Configuration

Your API keys are configured in `.env.local`:

```env
REACT_APP_GOOGLE_MAPS_API_KEY=AIzaSyBJAkmEp1gdg63BL28NUvl5GP17BSd3UP0
REACT_APP_GOOGLE_MAPS_API_KEY_WEB=AIzaSyBJAkmEp1gdg63BL28NUvl5GP17BSd3UP0
REACT_APP_API_URL=http://localhost:5000/api
```

**Enabled Features:**
- ✅ Real-time GPS tracking
- ✅ Route optimization
- ✅ Geofencing
- ✅ Distance & Duration calculations
- ✅ Address geocoding
- ✅ Direction routing

## 🔐 Default Test Credentials

```
Admin Dashboard:
  Email: admin@cleansl.com
  Password: admin123

Driver:
  Email: aravind@cleansl.com
  Password: driver123

Supervisor:
  Email: supervisor@cleansl.com
  Password: supervisor123
```

## 📡 API Endpoints

### Base URL: `http://localhost:5000/api`

### Users
- `GET    /users` - Get all users
- `GET    /users/:id` - Get user by ID
- `POST   /users` - Create new user
- `PUT    /users/:id` - Update user
- `DELETE /users/:id` - Delete user
- `POST   /users/auth/login` - User login

### Trucks
- `GET    /trucks` - Get all trucks
- `GET    /trucks/:id` - Get truck by ID
- `POST   /trucks` - Create truck
- `PUT    /trucks/:id` - Update truck details
- `PATCH  /trucks/:id/location` - Update location
- `PATCH  /trucks/:id/add-route-point` - Add GPS point
- `DELETE /trucks/:id` - Delete truck

### Complaints
- `GET    /complaints` - Get all complaints
- `GET    /complaints/:id` - Get complaint by ID
- `POST   /complaints` - Create complaint
- `PUT    /complaints/:id` - Update complaint
- `GET    /complaints/stats/overview` - Get statistics
- `DELETE /complaints/:id` - Delete complaint

### Violations
- `GET    /violations` - Get all violations
- `GET    /violations/:id` - Get violation by ID
- `POST   /violations` - Create violation
- `PUT    /violations/:id` - Update violation
- `GET    /violations/stats/overview` - Get statistics
- `DELETE /violations/:id` - Delete violation

### Analytics
- `GET    /analytics` - Get analytics records
- `GET    /analytics/truck/:id` - Get truck analytics
- `GET    /analytics/driver/:id` - Get driver analytics
- `POST   /analytics` - Create analytics record
- `GET    /analytics/summary/district` - District summary
- `GET    /analytics/summary/performance` - Overall performance

### Maps
- `POST   /maps/geocode` - Address to coordinates
- `POST   /maps/reverse-geocode` - Coordinates to address
- `POST   /maps/distance` - Distance between points
- `POST   /maps/directions` - Route directions
- `POST   /maps/check-geofence` - Geofence check

### Health Check
- `GET    /health` - API health status
- `GET    /` - API documentation

## 📊 Database Models

### User
```javascript
{
  firstName, lastName, email, password, phone,
  role: 'admin' | 'driver' | 'supervisor' | 'manager',
  licenseNumber, licenseExpiry, assignedTruck,
  violations, status, ...
}
```

### Truck
```javascript
{
  truckId, registrationNumber, model, capacity,
  currentLoad, status: 'in-service' | 'maintenance' | 'idle',
  driver, currentLocation, route, fuelLevel, mileage, ...
}
```

### Complaint
```javascript
{
  complaintId, title, description,
  category: 'missed-collection' | 'damaged-bin' | 'dirty-street' | ...,
  priority: 'low' | 'medium' | 'high' | 'urgent',
  location, reportedBy, assignedTruck, assignedDriver,
  status: 'new' | 'in-progress' | 'resolved', ...
}
```

### Violation
```javascript
{
  violationId, truck, driver,
  type: 'speeding' | 'harsh-acceleration' | 'off-route' | ...,
  severity: 'low' | 'medium' | 'high' | 'critical',
  status: 'reported' | 'resolved' | 'dismissed',
  penalty, appealStatus, ...
}
```

### Analytics
```javascript
{
  date, truck, driver, metrics: {
    distanceTraveled, fuelConsumed, fuelEfficiency,
    wasteCollected, collectionsCompleted, violations, ...
  },
  efficiency: {
    routeOptimization, timeOnTask, fuelUsageRating, safetyScore
  }
}
```

## 🛠️ Development Commands

### Frontend
```bash
npm start          # Development server
npm run build      # Production build
npm test           # Run tests
```

### Backend
```bash
npm run dev        # Development with nodemon
npm start          # Production
npm run seed       # Seed database
```

## 🔍 API Testing

### Using Postman
1. Import API collection
2. Set base URL: `http://localhost:5000/api`
3. Test endpoints with provided examples

### Example: Create Complaint
```bash
curl -X POST http://localhost:5000/api/complaints \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Missed Collection",
    "description": "Bin not collected",
    "category": "missed-collection",
    "priority": "high",
    "location": {
      "address": "Colombo 3",
      "latitude": 6.92,
      "longitude": 79.87,
      "ward": "Ward 10"
    },
    "reportedBy": {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+94701234567"
    }
  }'
```

## 📱 Frontend Pages

- **Dashboard**: Overview metrics & KPIs
- **Fleet Status**: Real-time truck tracking
- **Live Map**: GPS tracking with Google Maps
- **Complaints**: Citizen complaints management
- **Violations**: Driver violations tracking
- **Analytics**: Performance metrics & analytics
- **Profile**: User profile settings
- **Settings**: System and app settings

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Check if MongoDB service is running:
- Windows: Services > MongoDB > Start
- Linux: systemctl start mongod
```

### Port Already in Use
```bash
# Kill process on port 5000 (backend):
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# For port 3000 (frontend):
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Google Maps Not Loading
- Verify API key in `.env.local`
- Check Maps API is enabled in Google Cloud Console
- Ensure proper restrictions are set

### CORS Errors
- Backend CORS is enabled for localhost:3000
- For production, update `cors()` in server.js

## 🚀 Production Deployment

### Environment Variables for Production:
```env
NODE_ENV=production
MONGODB_URI=your_production_mongodb_url
GOOGLE_MAPS_API_KEY=your_api_key
JWT_SECRET=your_secret_key
```

### Build Frontend:
```bash
npm run build
```

### Backend Deployment:
```bash
npm install --production
npm start
```

## 📞 Support & Resources

- MongoDB docs: https://docs.mongodb.com
- Express docs: https://expressjs.com
- React docs: https://react.dev
- Google Maps API: https://developers.google.com/maps

---

**Version**: 1.0.0  
**Last Updated**: March 2026  
**Status**: ✅ Fully Functional
