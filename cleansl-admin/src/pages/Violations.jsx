import React, { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { 
  Search, 
  Filter, 
  Calendar, 
  User, 
  MapPin, 
  MoreHorizontal, 
  ExternalLink, 
  ShieldCheck,
  AlertTriangle,
  X
} from 'lucide-react';

// Data from centralized mock file
import { 
  VIOLATION_STATS, 
  VIOLATIONS_TABLE, 
  VIOLATION_LOCATIONS 
} from '../data/mockData';

// Fix for Leaflet default markers in React
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// --- SUB-COMPONENTS ---

const StatusBadge = ({ status }) => {
  const styles = {
    Pending: "bg-pink-100 text-pink-600",
    Disputed: "bg-purple-100 text-purple-600",
    Resolved: "bg-emerald-100 text-emerald-600",
    Confirmed: "bg-orange-100 text-orange-600"
  };
  return (
    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${styles[status]}`}>
      {status}
    </span>
  );
};

// --- MAIN PAGE COMPONENT ---

export default function Violations() {
  // 1. STATE MANAGEMENT
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTypeFilter, setActiveTypeFilter] = useState('All');
  const [selectedDate, setSelectedDate] = useState('');

  // 2. FILTER LOGIC
  const filteredViolations = useMemo(() => {
    return VIOLATIONS_TABLE.filter(item => {
      // Search by type or resident ID
      const matchesSearch = 
        item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.resident.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by Violation Type button
      const matchesType = activeTypeFilter === 'All' || item.type.includes(activeTypeFilter);
      
      // Filter by Date Picker (converts YYYY-MM-DD to DD/MM/YYYY)
      const matchesDate = !selectedDate || item.date === selectedDate.split('-').reverse().join('/');

      return matchesSearch && matchesType && matchesDate;
    });
  }, [searchTerm, activeTypeFilter, selectedDate]);

  return (
    <div className="flex flex-col gap-6 bg-[#FDFCF0] p-8 h-full overflow-y-auto font-sans">
      
      {/* 3. HEADER & INTERACTIVE FILTERS */}
      <div className="flex flex-col xl:flex-row justify-between items-center gap-4 bg-white p-5 rounded-[28px] shadow-sm border border-slate-100">
         <div className="relative w-full xl:w-96">
            <Search className="absolute left-4 top-3 text-slate-300" size={18} />
            <input 
              type="text" 
              placeholder="Waste Sorting Violation Dashboard" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 bg-[#F8FAFC] rounded-2xl text-sm font-medium border-none focus:ring-2 focus:ring-[#2D5A27] outline-none transition-all" 
            />
         </div>

         <div className="flex flex-wrap gap-3 items-center justify-center">
            {/* Interactive Date Selection */}
            <div className="flex items-center bg-[#F8FAFC] rounded-2xl border border-slate-100 px-4 py-1 hover:bg-slate-100 transition-all cursor-pointer group">
              <Calendar size={15} className="text-slate-400 mr-2 group-hover:text-[#2D5A27]" />
              <input 
                type="date" 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-transparent py-2 text-[11px] font-black text-slate-500 outline-none cursor-pointer uppercase"
              />
              {selectedDate && (
                <button onClick={() => setSelectedDate('')} className="ml-2 p-1 hover:bg-red-50 rounded-full"><X size={14} className="text-red-400" /></button>
              )}
            </div>

            <div className="h-8 w-[1px] bg-slate-100 hidden md:block mx-1"></div>

            {['All', 'Mixed', 'Unsorted'].map((type) => (
              <button 
                key={type}
                onClick={() => setActiveTypeFilter(type)}
                className={`px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest border transition-all duration-300
                  ${activeTypeFilter === type ? 'bg-[#2D5A27] text-white shadow-lg scale-105' : 'bg-[#F8FAFC] text-slate-400 border-slate-50 hover:border-[#2D5A27]'}`}
              >
                {type === 'All' ? 'All Types' : `${type} Waste`}
              </button>
            ))}
         </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* LEFT SECTION: Stats, Table, Map */}
        <div className="flex-[2] flex flex-col gap-8">
          
          {/* Violation Stats Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {VIOLATION_STATS.map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-[30px] shadow-sm border border-slate-50 group hover:border-[#2D5A27] transition-all">
                <div className="flex justify-between items-center mb-3">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                     <div className="w-1.5 h-1.5 bg-slate-300 group-hover:bg-[#2D5A27] rounded-full transition-colors" /> {stat.label}
                   </p>
                   <MoreHorizontal size={16} className="text-slate-200" />
                </div>
                <div className="flex items-baseline gap-3">
                  <span className={`text-4xl font-black ${stat.color}`}>{stat.value}</span>
                  {stat.trend && <span className="text-[10px] font-bold text-slate-400 tracking-tighter">{stat.trend}</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Violation Table as seen in Figma */}
          <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
             <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center">
               <h4 className="font-black text-slate-800 tracking-tight uppercase text-sm">Violation Table</h4>
               <span className="bg-slate-50 px-3 py-1 rounded-full text-[10px] font-bold text-slate-400">{filteredViolations.length} Active Incidents</span>
             </div>
             <div className="overflow-x-auto p-2">
               <table className="w-full text-left">
                  <thead>
                    <tr className="bg-[#F9FAFB]/50 text-[10px] uppercase font-black text-slate-400 tracking-widest border-b border-slate-50">
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Violation Type</th>
                      <th className="px-6 py-4">Resident</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">AI Score</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {filteredViolations.length > 0 ? (
                      filteredViolations.map((row, i) => (
                        <tr key={i} className="border-b border-slate-50 hover:bg-[#FDFCF0]/50 transition-all duration-300">
                          <td className="px-6 py-5 font-bold text-slate-400">{row.date}</td>
                          <td className="px-6 py-5 font-black text-slate-800">{row.type}</td>
                          <td className="px-6 py-5 font-bold text-slate-400">{row.resident}</td>
                          <td className="px-6 py-5"><StatusBadge status={row.status} /></td>
                          <td className="px-6 py-5 text-right font-black flex items-center justify-end gap-3 text-slate-700">
                            {row.score} 
                            <div className={`w-4 h-4 rounded-full border-4 ${row.score > 90 ? 'border-emerald-500 bg-emerald-50' : 'border-slate-100'}`} />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan="5" className="px-6 py-20 text-center text-slate-400 italic font-medium tracking-tight">No violations match your current filters.</td></tr>
                    )}
                  </tbody>
               </table>
             </div>
          </div>

          {/* Locations Map */}
          <div className="bg-white p-7 rounded-[40px] shadow-sm border border-slate-100">
             <div className="flex items-center gap-2 mb-5">
                <MapPin size={16} className="text-[#2D5A27]"/>
                <h4 className="font-black text-slate-800 tracking-tight uppercase text-xs">Violation Reported Locations</h4>
             </div>
             <div className="h-80 rounded-[30px] overflow-hidden border border-slate-100 z-0 shadow-inner">
                <MapContainer center={[6.8950, 79.8700]} zoom={14} className="h-full w-full">
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  {VIOLATION_LOCATIONS.map((pos, i) => (
                    <Marker key={i} position={pos}>
                      <Popup><span className="font-bold">Incident Log #{i+1}</span></Popup>
                    </Marker>
                  ))}
                </MapContainer>
             </div>
          </div>
        </div>

        {/* RIGHT SECTION: AI Insights */}
        <div className="w-full lg:w-[360px] flex flex-col gap-6">
           <div className="bg-white p-7 rounded-[35px] shadow-sm border border-slate-50">
              <h5 className="text-[10px] font-black uppercase text-slate-300 mb-8 tracking-[0.2em] text-center">Sorting Accuracy Metrics</h5>
              <div className="h-40 flex items-end justify-between px-3 gap-2">
                 {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                   <div 
                    key={i} 
                    style={{ height: `${h}%` }} 
                    className={`flex-1 rounded-full transition-all duration-1000 ${h > 75 ? 'bg-[#2D5A27] shadow-[0_4px_12px_rgba(45,90,39,0.3)]' : 'bg-emerald-100'}`} 
                   />
                 ))}
              </div>
              <div className="flex justify-between mt-5 text-[9px] font-black text-slate-300 uppercase px-1 tracking-widest">
                <span>Mon</span><span>Wed</span><span>Fri</span><span>Sun</span>
              </div>
           </div>

           <div className="flex items-center justify-between px-4">
            <h5 className="text-[10px] font-black uppercase text-[#2D5A27] bg-[#E9F2E8] px-4 py-2 rounded-2xl w-fit tracking-tighter">AI Review Queue</h5>
            <button className="text-[10px] font-black text-slate-400 uppercase border-b-2 border-transparent hover:border-slate-200 transition-all">Expand All</button>
           </div>
           
           {/* Dynamic Report Cards */}
           {[1, 2].map(i => (
             <div key={i} className="bg-white p-6 rounded-[35px] shadow-sm border border-slate-50 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group">
                <div className="flex justify-between items-center mb-5">
                   <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#F8FAFC] rounded-2xl flex items-center justify-center text-[#2D5A27] font-black border border-slate-50 text-sm shadow-inner group-hover:bg-[#E9F2E8]">
                        {i === 1 ? '12' : '08'}
                      </div>
                      <div>
                        <p className="text-[12px] font-black text-slate-800 tracking-tight">Unit_{i === 1 ? '12' : '08'}</p>
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">AI-Detected Log</p>
                      </div>
                   </div>
                   <MoreHorizontal size={20} className="text-slate-200 group-hover:text-slate-400" />
                </div>
                <div className="h-44 bg-slate-50 rounded-[28px] mb-5 overflow-hidden border border-slate-50 relative">
                   <img 
                    src={`https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=60&w=400`} 
                    className="w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:scale-110 transition-transform duration-700" 
                    alt="Violation Image" 
                   />
                   <div className="absolute top-4 left-4 bg-red-500/90 text-white text-[8px] font-black px-2 py-1 rounded-lg flex items-center gap-1 uppercase">
                     <AlertTriangle size={8}/> 94% Confidence
                   </div>
                </div>
                <div className="space-y-1.5 mb-6 px-1">
                  <p className="text-[11px] font-black text-slate-800 uppercase tracking-widest">Incident: 2025112{i}SW</p>
                  <div className="flex items-center gap-2 text-slate-400">
                    <MapPin size={12}/>
                    <p className="text-[10px] font-bold">Colombo 06 • 14:20 PM</p>
                  </div>
                </div>
                <div className="flex gap-3">
                   <button className="flex-1 py-3 rounded-2xl bg-[#F8FAFC] text-[10px] font-black uppercase text-slate-600 border border-slate-50 hover:bg-slate-100 transition-all flex items-center justify-center gap-2 tracking-widest">Details</button>
                   <button className="flex-1 py-3 rounded-2xl bg-[#2D5A27] text-[10px] font-black uppercase text-white shadow-lg hover:bg-[#23471e] transition-all flex items-center justify-center gap-2 tracking-widest"><ShieldCheck size={14}/> Confirm</button>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}