import React from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { 
  Search, 
  Truck, 
  Navigation, 
  Gauge, 
  Trash2, 
  Clock, 
  AlertTriangle 
} from 'lucide-react';
// local assets
import truckImg from '../images/truck.png';

// Fix default marker icons
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Sample data for Ward Cards and Trucks
const wards = [
  { id: 1, name: "Ward 07: Cinnamon Gardens", progress: 65, trucks: ["T-01", "T-04"], status: "Progress" },
  { id: 2, name: "Ward 04: Bambalapitiya", progress: 100, trucks: ["T-02", "T-05"], status: "Completed" },
  { id: 3, name: "Ward 37: Kollupitiya", progress: 15, trucks: ["T-08", "T-09"], status: "Delayed" },
];

const trucks = [
  { id: 'T-01', lat: 6.9145, lng: 79.8650, status: 'Moving', location: 'No. 45, Rosmead Place', speed: '32 km/hr', capacity: 65, ward: 'Ward 07: Cinnamon Gardens' },
  { id: 'T-04', lat: 6.9180, lng: 79.8700, status: 'Moving', location: 'No. 112, Duplication Rd', speed: '28 km/hr', capacity: 52, ward: 'Ward 07: Cinnamon Gardens' }
];

// Path for the green route line shown in Figma
const routePath = [
  [6.9145, 79.8650], [6.9160, 79.8680], [6.9120, 79.8750], [6.9080, 79.8700], [6.9145, 79.8650]
];

// --- SUB-COMPONENTS ---

const StatItem = ({ icon, label, value, sub }) => (
  <div className="flex items-center gap-3 flex-1">
    <div className="bg-white p-2.5 rounded-xl shadow-sm flex-shrink-0">{icon}</div>
    <div className="min-w-0">
      <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider leading-none">{label}</p>
      <p className="text-sm font-bold text-gray-800 truncate">{value}</p>
      <p className="text-[9px] text-gray-400 leading-none">{sub}</p>
    </div>
  </div>
);

const VehicleDetails = () => (
  <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex gap-6">
    <div className="flex-1">
      <h4 className="text-xs font-bold text-gray-400 uppercase mb-3 tracking-wide">Route Info</h4>
      <div className="relative h-32 w-full bg-gray-50 rounded-2xl flex items-center justify-center overflow-hidden border border-gray-100">
        <img 
          src={truckImg} 
          alt="Truck" 
          className="h-24 object-contain"
        />
      </div>
    </div>

    <div className="flex-1 border-l border-gray-100 pl-6">
      <h4 className="text-xs font-bold text-[#2D5A27] uppercase mb-3 pb-2 border-b border-[#2D5A27]">Vehicle Status</h4>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500 font-medium">Vehicle Model</span>
          <span className="text-xs font-bold text-gray-800">Isuzu Giga Compactor</span>
        </div>
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-500 font-medium">Waste Load</span>
            <span className="text-xs font-bold text-[#2D5A27]">65% / 100%</span>
          </div>
          <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#2D5A27] h-full" style={{ width: '65%' }}></div>
          </div>
        </div>
      </div>
    </div>

    <div className="flex-1 border-l border-gray-100 pl-6">
      <h4 className="text-xs font-bold text-gray-400 uppercase mb-3 tracking-wide">Driver Profile</h4>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500 font-medium">Net Weight</span>
          <span className="text-xs font-bold text-gray-800">4,250 kg</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500 font-medium">Registration No.</span>
          <span className="text-xs font-bold text-gray-800 uppercase tracking-wider">WP NA-4589</span>
        </div>
      </div>
    </div>

    <div className="flex-1 border-l border-gray-100 pl-6">
      <h4 className="text-xs font-bold text-gray-400 uppercase mb-3 tracking-wide">AI Logs</h4>
      <div className="flex flex-col gap-2">
        <span className="bg-red-50 text-red-600 text-[10px] px-2 py-1 rounded-md font-bold flex items-center gap-1 w-fit">
          <AlertTriangle size={12}/> Violation Detected (8:12 AM)
        </span>
        <span className="bg-green-50 text-green-600 text-[10px] px-2 py-1 rounded-md font-bold w-fit">✓ Route Optimized</span>
      </div>
    </div>
  </div>
);

// --- MAIN PAGE COMPONENT ---

export default function LiveMap() {
  return (
    <div className="flex flex-col h-full gap-6 font-sans p-8">
      {/* Header: Title + Search Bar */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Live Map Tracking</h1>
        <div className="relative w-72">
          <Search className="absolute left-4 top-2.5 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search trucks, wards..." 
            className="w-full pl-12 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#2D5A27]" 
          />
        </div>
      </div>

      <div className="flex gap-6 flex-1 min-h-0">
        {/* LEFT: Ward Collection Progress Sidebar */}
        <div className="w-80 flex flex-col gap-6 overflow-y-auto pr-3 custom-scrollbar">
          <h2 className="text-xl font-bold text-gray-800">Collection Progress</h2>
          {wards.map(ward => (
            <div key={ward.id} className="bg-yellow-50 p-6 rounded-3xl shadow-sm border border-yellow-100 hover:border-[#2D5A27] transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-gray-800 leading-tight w-2/3">{ward.name}</h3>
                <div className="relative w-10 h-10">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path className="text-gray-100" strokeDasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5"/>
                    <path className="text-[#2D5A27]" strokeDasharray={`${ward.progress}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold">{ward.progress}%</span>
                </div>
              </div>
              <span className={`text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-tighter ${ward.status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-cyan-100 text-cyan-600'}`}>
                {ward.status}
              </span>
              <div className="mt-4 space-y-2">
                {ward.trucks.map(truckId => {
                  const truck = trucks.find(t => t.id === truckId);
                  return (
                    <div key={truck?.id || truckId} className="flex justify-between items-center text-xs font-medium bg-gray-50 p-2 rounded-lg">
                      <span className="flex items-center gap-2 text-gray-700"><Truck size={14}/> Truck {truck?.id || truckId}</span>
                      <span className="text-gray-400 text-[11px]">{truck?.location || 'N/A'}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: Map at Top Corner & Live Data */}
        <div className="flex-1 flex flex-col gap-4 overflow-y-auto pb-4 pr-1">
          {/* Top: Map box expanded height */}
          <div className="h-72 bg-white rounded-3xl overflow-hidden border border-gray-100 relative shadow-sm">
            <MapContainer center={[6.9145, 79.8650]} zoom={16} className="h-full w-full z-0">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap contributors' />
              <Polyline positions={routePath} color="#2D5A27" weight={5} opacity={0.7} />
              {trucks.map(truck => (
                <Marker key={truck.id} position={[truck.lat, truck.lng]}>
                  <Popup>
                    <div className="text-sm font-semibold">{truck.id}</div>
                    <div className="text-xs text-gray-600">{truck.location}</div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
            
            {/* Map Floating Label - Top Right */}
            <div className="absolute top-3 right-3 z-[1000] bg-[#2D5A27] text-white p-3 rounded-xl shadow-lg flex items-center gap-2">
              <div className="bg-white/20 p-1.5 rounded-lg flex-shrink-0"><Truck size={16} className="text-white"/></div>
              <div className="min-w-0">
                <p className="text-xs font-bold tracking-tight">T-01</p>
                <p className="text-[10px] opacity-90 truncate">Rosmead Place</p>
              </div>
            </div>
          </div>

          {/* Yellow Stats Panel - Compact */}
          <div className="bg-yellow-50 p-4 rounded-2xl flex justify-between items-center gap-3 shadow-sm border border-yellow-100\">
            <StatItem icon={<Navigation className="text-[#2D5A27]" size={20}/>} label="Current Location" value="No. 45, Rosmead Place" sub="Ward 07: Cinnamon Gardens" />
            <StatItem icon={<Gauge className="text-cyan-600" size={20}/>} label="Speed" value="32 km/hr" sub="Steady" />
            <StatItem icon={<Trash2 className="text-[#2D5A27]" size={20}/>} label="Bin Capacity" value="65% Full" sub="Alert at 90%" />
            <StatItem icon={<Clock className="text-cyan-700" size={20}/>} label="Shift Time" value="4h 30m Active" sub="Ends at 4:30 PM" />
          </div>

          <VehicleDetails />
        </div>
      </div>
    </div>
  );
}