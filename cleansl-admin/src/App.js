import Dashboard from './pages/Dashboard';
import Overview from './pages/Overview';
import LiveMap from './pages/LiveMap';
import Complaints from './pages/Complaints';
import FleetStatus from './pages/FleetStatus';
import Analytics from './pages/Analytics';
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
          <Route path="fleet" element={<FleetStatus />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;