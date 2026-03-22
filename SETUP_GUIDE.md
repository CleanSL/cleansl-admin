# CleanSL Admin - Complete Setup Guide

## 📋 Prerequisites

Before you begin, ensure you have installed:
1. **Node.js** (v14+) - [Download](https://nodejs.org/)
2. **MongoDB** - Choose one:
   - **Local**: [Download MongoDB Community](https://www.mongodb.com/try/download/community)
   - **Cloud**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free tier available)

## 🚀 Quick Start

### Step 1: Install Dependencies

**Option A: Automatic (Windows)**
```bash
setup.bat
```

**Option B: Manual**
```bash
# Backend setup
cd backend
npm install

# Frontend setup
cd ../cleansl-admin
npm install
```

### Step 2: Configure Environment

#### Backend (.env)
Edit `backend/.env`:
```
MONGODB_URI=mongodb://localhost:27017/cleansl-admin
PORT=5000
NODE_ENV=development
```

**For MongoDB Atlas:**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cleansl-admin
```

#### Frontend (.env)
Already configured at `cleansl-admin/.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
```

### Step 3: Start MongoDB

**If using local MongoDB:**
```bash
mongod
```

**If using MongoDB Atlas:**
- No action needed, cloud database is already running

### Step 4: Seed Sample Data (Optional)

```bash
cd backend
npm run seed
```

This creates sample trucks, drivers, violations, complaints, and analytics data.

### Step 5: Start the Application

**Terminal 1 - Backend Server:**
```bash
cd backend
npm run dev
```
✅ Backend running at: `http://localhost:5000`

**Terminal 2 - Frontend App:**
```bash
cd cleansl-admin
npm start
```
✅ Frontend running at: `http://localhost:3000`

## 🎯 Quick Scripts (Windows)

After setup.bat completes, use these shortcut batch files:

```bash
start-backend.bat   # Start backend server
start-frontend.bat  # Start frontend app
```

## ✅ Verification

### 1. Check Backend Health
```bash
curl http://localhost:5000/api/health
```
Expected response:
```json
{"status": "Backend is running"}
```

### 2. Test API Endpoints
```bash
# Get all trucks
curl http://localhost:5000/api/trucks

# Get dashboard stats
curl http://localhost:5000/api/analytics/dashboard-stats

# Get driver performance
curl http://localhost:5000/api/drivers/performance
```

### 3. Test Frontend
- Open `http://localhost:3000` in your browser
- Navigate between pages (Dashboard, Analytics, Violations, etc.)
- Data should load from the backend API

## 📊 Available Pages

1. **Dashboard/Overview** - Real-time system status and operations feed
2. **Analytics** - Waste collection trends and driver performance
3. **Live Map** - Real-time truck tracking
4. **Violations** - Waste sorting violations and statistics
5. **Complaints** - Resident complaints management
6. **Fleet Status** - Driver and truck management
7. **Settings** - System configuration
8. **Profile** - User profile management

## 🔧 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:**
- Ensure MongoDB is running (`mongod` command)
- Or update MONGODB_URI in `.env` if using Atlas

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:**
- Kill process on port 5000: `netstat -ano | findstr :5000`
- Update PORT in `backend/.env` to different port
- Update proxy in `cleansl-admin/package.json`

### Cannot Find Module Errors
**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### CORS Errors
**Solution:**
- Backend includes CORS headers automatically
- If issues persist, ensure backend is running on port 5000
- Try clearing browser cache

### Empty Data in Frontend
**Solution:**
- Run `npm run seed` in backend directory
- Or add data via API POST requests
- Check backend logs for errors

## 📁 Project Structure

```
cleansl-admin-admin/
├── backend/                 # Express.js backend
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API routes
│   ├── controllers/        # Business logic
│   ├── config/             # Configuration
│   ├── server.js           # Main server
│   ├── seed.js             # Database seeding
│   └── package.json
├── cleansl-admin/          # React frontend
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable components
│   │   ├── services/      # API service (api.js)
│   │   ├── data/          # Mock data
│   │   └── App.js
│   └── package.json
├── setup.bat               # Windows setup script
├── start-backend.bat       # Backend startup script
└── start-frontend.bat      # Frontend startup script
```

## 🌐 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Main Endpoints

#### Trucks
- `GET /trucks` - List all trucks
- `GET /trucks/fleet-status` - Fleet overview
- `POST /trucks` - Add new truck
- `PUT /trucks/:id` - Update truck
- `DELETE /trucks/:id` - Delete truck

#### Drivers
- `GET /drivers` - List all drivers
- `GET /drivers/performance` - Performance metrics
- `POST /drivers` - Add new driver
- `PUT /drivers/:id` - Update driver

#### Violations
- `GET /violations` - List all violations
- `GET /violations/stats` - Statistics summary
- `POST /violations` - Report new violation
- `PUT /violations/:id` - Update violation status

#### Complaints
- `GET /complaints` - List all complaints
- `GET /complaints/stats` - Statistics
- `POST /complaints` - Submit new complaint
- `PUT /complaints/:id` - Update complaint

#### Analytics
- `GET /analytics` - Historical data
- `GET /analytics/dashboard-stats` - Dashboard metrics
- `GET /analytics/monthly-trends` - Monthly trends
- `GET /analytics/waste-distribution` - Waste breakdown

## 🔐 Production Deployment

### Backend Deployment (Heroku Example)
```bash
# Create Heroku app
heroku create cleansl-admin-backend

# Set environment variables
heroku config:set MONGODB_URI=mongodb+srv://...
heroku config:set NODE_ENV=production

# Deploy
git push heroku main
```

### Frontend Deployment (Vercel Example)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd cleansl-admin
vercel --prod

# Set API URL
# Add environment variable REACT_APP_API_URL to production backend URL
```

## 🐛 Getting Help

1. Check backend logs: `npm run dev` will show errors
2. Check browser console (F12 in browser)
3. Verify MongoDB is running and accessible
4. Ensure all dependencies are installed
5. Review backend README for more details

## 📝 Default Sample Data

After running `npm run seed`, the database includes:

**Trucks:**
- T-01: Isuzu Giga Compactor (Moving)
- T-02: Volvo FH16 (Moving)
- T-05: Mercedes Actros (Completed)

**Drivers:**
- Ben Tennyson (158 pickups, 4.8 rating)
- Nafhath Mohamed (203 pickups, 4.9 rating)
- Iman Fazney (142 pickups, 4.7 rating)
- Aakif Saroos (98 pickups, 4.6 rating)
- Harish Prasanna (178 pickups, 4.8 rating)

**Violations:** 4 sample violations
**Complaints:** 2 sample complaints
**Analytics:** 3 months of sample data

## 🎉 You're All Set!

Your CleanSL Admin system is now fully functional with:
- ✅ Working backend API
- ✅ Connected MongoDB database
- ✅ Functional React frontend
- ✅ Real-time data display
- ✅ Full CRUD operations

Start building! 🚀
