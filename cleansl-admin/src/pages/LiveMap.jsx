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

// Local Assets
import truckImg from '../images/truck.png';

// Fix for Leaflet marker icons in React
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Mock Data
const wards = [
  { id: 1, name: "Ward 07: Cinnamon Gardens", progress: 65, trucks: ["T-01", "T-04"], status: "Progress" },
  { id: 2, name: "Ward 04: Bambalapitiya", progress: 100, trucks: ["T-02", "T-05"], status: "Completed" },
  { id: 3, name: "Ward 37: Kollupitiya", progress: 15, trucks: ["T-08", "T-09"], status: "Delayed" },
];

const trucksData = [
  { id: 'T-01', lat: 6.9145, lng: 79.8650, location: 'No. 45, Rosmead Place' },
  { id: 'T-04', lat: 6.9180, lng: 79.8700, location: 'No. 12, Horton Place' }
];

const routePath = [
  [6.9145, 79.8650], [6.9160, 79.8680], [6.9120, 79.8750], [6.9080, 79.8700], [6.9145, 79.8650]
];

// --- COMPONENTS ---

const StatItem = ({ icon, label, value, sub }) => (
  <div className="flex items-center gap-3 flex-1 min-w-0">
    <div className="bg-white p-2 rounded-xl shadow-sm flex-shrink-0">{icon}</div>
    <div className="min-w-0">
      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider leading-tight">{label}</p>
      <p className="text-sm font-bold text-gray-800 truncate">{value}</p>
      <p className="text-[10px] text-gray-400 leading-tight">{sub}</p>
    </div>
  </div>
);

const VehicleDetails = () => (
  <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex gap-8 items-start">
    <div className="w-1/4">
      <h4 className="text-[11px] font-bold text-gray-400 uppercase mb-3 tracking-widest">Route Info</h4>
      <div className="h-32 w-full bg-[#F8F9FA] rounded-2xl flex items-center justify-center border border-gray-50">
        <img src={truckImg} alt="Collection Truck" className="w-full h-full object-contain p-2" />
      </div>
    </div>

    <div className="flex-1 border-l border-gray-100 pl-8">
      <h4 className="text-[11px] font-bold text-[#2D5A27] uppercase mb-4 pb-2 border-b border-[#2D5A27] inline-block">Vehicle Status</h4>
      <div className="space-y-4">
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-500 font-medium">Vehicle Model</span>
          <span className="font-bold text-gray-800">Isuzu Giga Compactor</span>
        </div>
        <div>
          <div className="flex justify-between items-center mb-1 text-xs">
            <span className="text-gray-500 font-medium">Waste Load</span>
            <span className="font-bold text-[#2D5A27]">65% / 100%</span>
          </div>
          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div className="bg-[#2D5A27] h-full rounded-full" style={{ width: '65%' }}></div>
          </div>
        </div>
      </div>
    </div>

    <div className="flex-1 border-l border-gray-100 pl-8">
      <h4 className="text-[11px] font-bold text-gray-400 uppercase mb-4 tracking-widest">Driver Profile</h4>
      <div className="space-y-4 text-xs">
        <div className="flex justify-between items-center">
          <span className="text-gray-500 font-medium text-[11px]">Net Weight</span>
          <span className="font-bold text-gray-800">4,250 kg</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500 font-medium text-[11px]">Registration No.</span>
          <span className="font-bold text-gray-800 uppercase tracking-tighter">WP NA-4589</span>
        </div>
      </div>
    </div>

    <div className="w-1/5 border-l border-gray-100 pl-8 text-right">
      <h4 className="text-[11px] font-bold text-gray-400 uppercase mb-4 tracking-widest">AI Logs</h4>
      <div className="flex flex-col items-end gap-2">
        <span className="bg-red-50 text-red-600 text-[9px] px-2 py-1 rounded-lg font-bold flex items-center gap-1 border border-red-100">
          <AlertTriangle size={10}/> Violation Detected
        </span>
        <span className="bg-green-50 text-green-600 text-[9px] px-2 py-1 rounded-lg font-bold border border-green-100 uppercase">
          Route Optimized
        </span>
      </div>
    </div>
  </div>
);

// --- MAIN PAGE ---

export default function LiveMap() {
  return (
    <div className="flex flex-col h-full gap-6 bg-[#FDFCF0] p-6 overflow-hidden">
      {/* Search Header */}
      <div className="flex justify-end pr-2">
        <div className="relative w-80">
          <Search className="absolute left-4 top-2.5 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Live Map Tracking" 
            className="w-full pl-12 pr-4 py-2.5 bg-white border border-gray-100 rounded-full text-sm shadow-sm focus:ring-2 focus:ring-[#2D5A27] transition-all" 
          />
        </div>
      </div>

      <div className="flex gap-6 flex-1 min-h-0">
        {/* LEFT: Progress Sidebar */}
        <div className="w-[350px] flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
          <h2 className="text-xl font-extrabold text-gray-800 px-2 mb-2">Collection Progress</h2>
          {wards.map(ward => (
            <div key={ward.id} className="bg-white p-5 rounded-[28px] shadow-sm border border-gray-50 hover:border-[#2D5A27] transition-all cursor-pointer group">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-gray-800 text-sm leading-tight w-2/3 group-hover:text-[#2D5A27] transition-colors">{ward.name}</h3>
                <div className="relative w-10 h-10">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="16" fill="none" stroke="#F1F5F9" strokeWidth="3" />
                    <circle cx="18" cy="18" r="16" fill="none" stroke="#2D5A27" strokeWidth="3" strokeDasharray={`${ward.progress}, 100`} strokeLinecap="round" />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-[9px] font-black">{ward.progress}%</span>
                </div>
              </div>
              <span className={`text-[9px] px-3 py-1 rounded-full font-black uppercase tracking-widest ${ward.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-cyan-100 text-cyan-700'}`}>
                {ward.status}
              </span>
              <div className="mt-5 space-y-2">
                {ward.trucks.map(id => (
                  <div key={id} className="flex justify-between items-center bg-[#F8FAFC] p-2.5 rounded-xl border border-gray-50">
                    <span className="flex items-center gap-2 text-[11px] font-bold text-gray-600"><Truck size={14} className="text-[#2D5A27]"/> Truck {id}</span>
                    <span className="text-[10px] text-gray-400 font-medium">In Service</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: Map & Details */}
        <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-1">
          {/* Top Corner Map as per Figma */}
          <div className="h-[380px] bg-white rounded-[32px] overflow-hidden border border-gray-100 relative shadow-sm">
            <MapContainer center={[6.9145, 79.8650]} zoom={15} className="h-full w-full z-0">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Polyline positions={routePath} color="#2D5A27" weight={6} opacity={0.8} lineCap="round" />
              {trucksData.map(truck => (
                <Marker key={truck.id} position={[truck.lat, truck.lng]}>
                  <Popup><span className="font-bold">Truck {truck.id}</span><br/>{truck.location}</Popup>
                </Marker>
              ))}
            </MapContainer>
            
            {/* Overlay Label Top Right */}
            <div className="absolute top-6 right-6 z-[1000] bg-[#2D5A27] text-white p-3.5 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-sm border border-white/10">
               <div className="bg-white/20 p-2 rounded-xl"><Truck size={20}/></div>
               <div>
                 <p className="text-[10px] font-black uppercase tracking-widest">Truck T-01</p>
                 <p className="text-[10px] opacity-80 font-medium tracking-tight">No. 45, Rosmead Place</p>
               </div>
            </div>
          </div>

          {/* Yellow Stat Panel */}
          <div className="bg-[#FEFCE8] p-5 rounded-[32px] flex justify-between items-center shadow-sm border border-yellow-100 gap-2">
            <StatItem icon={<Navigation className="text-[#2D5A27]" size={18}/>} label="Current Location" value="No. 45, Rosmead Place" sub="Ward 07: Cinnamon Gardens" />
            <StatItem icon={<Gauge className="text-cyan-600" size={18}/>} label="Speed" value="32 km/hr" sub="Steady Speed" />
            <StatItem icon={<Trash2 className="text-[#2D5A27]" size={18}/>} label="Bin Capacity" value="65% Full" sub="Alert at 90%" />
            <StatItem icon={<Clock className="text-cyan-700" size={18}/>} label="Shift Time" value="4h 30m Active" sub="Ends 4:30 PM" />
          </div>

          <VehicleDetails />
        </div>
      </div>
    </div>
  );
}