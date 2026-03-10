import Dashboard from './pages/Dashboard';
import Overview from './pages/Overview';
import LiveMap from './pages/LiveMap';
import Complaints from './pages/Complaints';
import FleetStatus from './pages/FleetStatus';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Violations from './pages/Violations';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        {/* layout route with sidebar */}
        <Route path="/" element={<Dashboard />}> 
          <Route index element={<Overview />} />
          <Route path="live-map" element={<LiveMap />} />
          <Route path="complaints" element={<Complaints />} />
          <Route path="violations" element={<Violations />} />
          <Route path="driver-log" element={<FleetStatus />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;