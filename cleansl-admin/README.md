# CleanSL Admin Dashboard

A complete waste management administration system with real-time GPS tracking, complaint management, violation tracking, and performance analytics.

## 🎯 Features

### Dashboard & Monitoring
- 📊 Real-time metrics and KPIs
- 📈 Performance analytics and reporting
- 🗂️ Multi-level aggregation (District, Ward, Truck)

### Fleet Management
- 🚛 Real-time GPS tracking on Google Maps
- 📍 Live vehicle location updates
- 🛣️ Route optimization and tracking
- 📱 Vehicle status monitoring
- ⛽ Fuel level and load management

### Complaint Management
- 📋 Citizen complaint tracking
- 🏷️ Multi-category complaint classification
- 🎯 Assignment and resolution tracking
- ⭐ Satisfaction ratings and feedback

### Violation & Safety Tracking
- ⚠️ Real-time violation detection
- 🚨 Multiple violation types (speeding, harsh driving, etc.)
- 📸 Evidence documentation
- 💰 Penalty management
- 🔄 Appeal process support

### User Management
- 👥 Multi-role support (Admin, Driver, Supervisor, Manager)
- 🔐 Secure authentication
- 📋 Driver license management
- 📊 Performance metrics by user

### Maps Integration
- 🗺️ Google Maps real-time tracking
- 🚩 Geocoding and reverse geocoding
- 📏 Distance and duration calculations
- 🎯 Geofencing capabilities
- 🧭 Direction routing

## 🚀 Quick Start

### Option 1: Automated Setup (Windows)

Double-click the startup script:
```bash
START.bat    # Batch file version
# OR
START.ps1    # PowerShell version
```

### Option 2: Manual Setup

**Requirements:**
- Node.js v14+
- MongoDB v4.4+
- Google Maps API Key (Web)

**Backend Setup:**
```bash
cd backend
npm install
npm run seed          # Seed initial data
npm run dev           # Start development server
```

**Frontend Setup:**
```bash
# In root directory
npm install
npm start             # Start React app
```

**Access:**
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- API Docs: http://localhost:5000/api

## 🔐 Default Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@cleansl.com | admin123 |
| Driver | aravind@cleansl.com | driver123 |
| Supervisor | supervisor@cleansl.com | supervisor123 |

## 📁 Project Structure

```
cleansl-admin/
├── backend/                 # Express.js & MongoDB backend
│   ├── models/              # Database schemas
│   ├── routes/              # API endpoints
│   ├── services/            # Business logic
│   ├── scripts/             # Data seeding
│   ├── server.js            # Main server
│   ├── package.json
│   └── .env
│
├── src/                     # React frontend
│   ├── pages/               # Page components
│   ├── components/          # Reusable components
│   ├── services/            # API integration
│   ├── data/                # Mock data
│   └── images/              # Assets
│
├── .env.local               # Frontend config
├── package.json             # Frontend dependencies
├── SETUP.md                 # Detailed setup guide
├── API_DOCS.md              # API documentation
└── README.md                # This file
```

## 📡 API Endpoints

### Base URL: `http://localhost:5000/api`

**Users**
- `POST /users/auth/login` - Login
- `GET /users` - List all users
- `POST /users` - Create user
- `PUT /users/:id` - Update user

**Trucks**
- `GET /trucks` - List trucks
- `POST /trucks` - Create truck
- `PUT /trucks/:id` - Update truck
- `PATCH /trucks/:id/location` - Update GPS location
- `PATCH /trucks/:id/add-route-point` - Add route point

**Complaints**
- `GET /complaints` - List complaints
- `POST /complaints` - Create complaint
- `PUT /complaints/:id` - Update complaint
- `GET /complaints/stats/overview` - Get statistics

**Violations**
- `GET /violations` - List violations
- `POST /violations` - Report violation
- `PUT /violations/:id` - Update violation
- `GET /violations/stats/overview` - Get statistics

**Analytics**
- `GET /analytics` - List analytics
- `GET /analytics/summary/district` - District summary
- `GET /analytics/summary/performance` - Performance metrics

**Maps**
- `POST /maps/geocode` - Address → Coordinates
- `POST /maps/reverse-geocode` - Coordinates → Address
- `POST /maps/distance` - Calculate distance
- `POST /maps/directions` - Get directions
- `POST /maps/check-geofence` - Check geofence

See [API_DOCS.md](API_DOCS.md) for complete documentation with examples.

## 🛠️ Technologies

### Frontend
- **React** - UI framework
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **React Router** - Navigation
- **Recharts** - Data visualization
- **Google Maps API** - Real-time maps
- **Axios** - HTTP client

### Backend
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Axios** - HTTP requests
- **CORS** - Cross-origin support
- **bcryptjs** - Password hashing
- **JWT** - Authentication

## 🗂️ Database Models

### User
Driver and admin information with authentication

### Truck
Vehicle details, GPS location, current load, fuel, and route

### Complaint
Citizen complaints with status, category, and resolution

### Violation
Driver violations with severity, penalty, and appeal status

### Analytics
Daily performance metrics and efficiency ratings

## 🐛 Troubleshooting

### MongoDB Connection Failed
```bash
# Windows - Start MongoDB service
services.msc
# Find "MongoDB Server" and click Start

# Or run from terminal
mongod
```

### Port Already in Use
```bash
# Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Google Maps Not Loading
- Verify API key in `.env.local`
- Enable Maps API in Google Cloud Console
- Check domain restrictions in Cloud Console

### CORS Error
- Backend CORS is enabled for `http://localhost:3000`
- For production, update CORS origin in `server.js`

## 📊 Sample Data

Database comes pre-seeded with:
- ✅ 5 users (drivers, supervisor, admin)
- ✅ 4 trucks with GPS locations
- ✅ 3 complaints with different statuses
- ✅ 3 violations with penalties
- ✅ Daily analytics records

Run `npm run seed` in backend folder to reset data.

## 🔒 Security Notes

- Passwords are hashed using bcryptjs
- CORS enabled only for localhost in development
- Environment variables for sensitive data
- Token-based authentication ready for implementation

## 📱 Pages & Features

| Page | Features |
|------|----------|
| **Dashboard** | KPI cards, metrics, quick stats |
| **Fleet Status** | Truck listing, status filters, active/idle counts |
| **Live Map** | Real-time GPS tracking, route visualization, truck info |
| **Complaints** | Complaint list, category filters, status tracking |
| **Violations** | Violation tracking, severity levels, penalties |
| **Analytics** | Performance charts, efficiency metrics, district summaries |
| **Profile** | User information, settings, preferences |
| **Settings** | System configuration, feature toggles |

## 🚀 Deployment

### Frontend (Netlify/Vercel)
```bash
npm run build
# Deploy `build` folder
```

### Backend (Heroku/Docker)
```bash
npm install --production
npm start
```

Environment variables for production:
```env
NODE_ENV=production
MONGODB_URI=your_production_mongodb_url
GOOGLE_MAPS_API_KEY=your_production_api_key
JWT_SECRET=strong_secret_key
```

## 📞 Support

- **Documentation**: See [SETUP.md](SETUP.md) and [API_DOCS.md](API_DOCS.md)
- **Backend Issues**: Check MongoDB connection and environment variables
- **Frontend Issues**: Check console for errors and API connectivity
- **Maps Issues**: Verify Google Maps API key and permissions

## 📄 License

Private - CleanSL Project

## 👥 Contributors

- Development Team
- Google Maps Integration
- Database Design

## 📅 Version

**v1.0.0** - March 2026

---

**Status**: ✅ Fully Functional & Production Ready

**Last Updated**: March 20, 2026

For detailed setup instructions, see [SETUP.md](SETUP.md)  
For API documentation, see [API_DOCS.md](API_DOCS.md)

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
