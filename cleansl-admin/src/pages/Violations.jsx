import React, { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {
  Search, 
  Calendar, 
  MapPin, 
  MoreHorizontal, 
  ShieldCheck,
  AlertTriangle,
  X,
  Clock,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

import { 
  VIOLATION_STATS, 
  VIOLATIONS_TABLE, 
  VIOLATION_LOCATIONS 
} from '../data/mockData';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

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

export default function Violations() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTypeFilter, setActiveTypeFilter] = useState('All');
  const [selectedDate, setSelectedDate] = useState('');

  const filteredViolations = useMemo(() => {
    return VIOLATIONS_TABLE.filter(item => {
      const matchesSearch = 
        item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.resident.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = activeTypeFilter === 'All' || item.type.includes(activeTypeFilter);
      const matchesDate = !selectedDate || item.date === selectedDate.split('-').reverse().join('/');

      return matchesSearch && matchesType && matchesDate;
    });
  }, [searchTerm, activeTypeFilter, selectedDate]);

  return (
    <div className="flex flex-col gap-6 bg-theme-main p-8 h-full overflow-y-auto font-sans selection:bg-theme-accent selection:text-white">
      
      {/* Header & Filters */}
      <div className="flex flex-col xl:flex-row justify-between items-center gap-4 bg-theme-sidebar p-5 rounded-[28px] shadow-sm border border-white/40">
         <div className="relative w-full xl:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted" size={18} />
            <input 
              type="text" 
              placeholder="Waste Sorting Dashboard" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl text-sm font-bold text-theme-text border border-white/50 shadow-inner focus:ring-2 focus:ring-theme-accent outline-none transition-all placeholder-theme-muted/50" 
            />
         </div>

         <div className="flex flex-wrap gap-3 items-center justify-center w-full xl:w-auto">
            <div className="flex items-center bg-white rounded-2xl border border-white/50 shadow-inner px-4 py-3 hover:bg-slate-50 transition-all cursor-pointer group flex-1 md:flex-none">
              <Calendar size={15} className="text-theme-muted mr-2 group-hover:text-theme-accent" />
              <input 
                type="date" 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-transparent text-[11px] font-black text-theme-text outline-none cursor-pointer uppercase w-full"
              />
              {selectedDate && (
                <button onClick={() => setSelectedDate('')} className="ml-2 p-1 bg-red-50 hover:bg-red-100 rounded-full"><X size={14} className="text-red-500" /></button>
              )}
            </div>

            <div className="h-8 w-[1px] bg-theme-muted/20 hidden md:block mx-1"></div>

            <div className="flex gap-2 flex-wrap md:flex-nowrap w-full md:w-auto">
              {['All', 'Mixed', 'Unsorted'].map((type) => (
                <button 
                  key={type}
                  onClick={() => setActiveTypeFilter(type)}
                  className={`flex-1 md:flex-none px-5 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest border transition-all duration-300
                    ${activeTypeFilter === type ? 'bg-theme-accent border-theme-accent text-white shadow-lg scale-105' : 'bg-white text-theme-muted border-white/50 hover:border-theme-accent'}`}
                >
                  {type === 'All' ? 'All Types' : `${type} Waste`}
                </button>
              ))}
            </div>
         </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* LEFT SECTION */}
        <div className="flex-[2] flex flex-col gap-8 min-w-0">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {VIOLATION_STATS.map((stat, i) => {
              const icons = [
                <AlertTriangle size={16} className="text-theme-accent" />, 
                <Clock size={16} className="text-theme-accent" />, 
                <ShieldCheck size={16} className="text-theme-accent" />, 
                <CheckCircle2 size={16} className="text-theme-accent" />
              ];
              const isNegative = stat.trend?.includes('-');
              return (
                <div key={i} className="bg-theme-card rounded-3xl p-6 shadow-sm flex flex-col justify-between border border-white/40 group hover:border-theme-accent transition-all cursor-pointer" onClick={() => alert("Loading violation category...")}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2 text-theme-text font-bold text-sm">
                      {icons[i]} <span>{stat.label}</span>
                    </div>
                    <div className="text-theme-muted font-bold tracking-widest leading-none opacity-50 group-hover:opacity-100 transition-opacity">...</div>
                  </div>
                  <div>
                    <h3 className={`text-4xl font-bold mb-2 ${stat.color || 'text-theme-accent'}`}>{stat.value}</h3>
                    <div className="flex items-center gap-1 text-xs font-semibold text-theme-text opacity-80">
                      {isNegative ? <ArrowDownRight size={14} className="text-red-500" /> : <ArrowUpRight size={14} className="text-theme-accent" />}
                      <span className={isNegative ? 'text-red-500' : 'text-theme-accent'}>{stat.trend}</span>
                      <span className="text-theme-muted ml-1">vs last month</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-theme-card rounded-[40px] shadow-sm border border-white/40 overflow-hidden">
             <div className="px-8 py-6 border-b border-white/30 flex flex-col sm:flex-row justify-between items-center gap-4">
               <h4 className="font-serif font-bold text-theme-text text-xl">Violation Table</h4>
               <span className="bg-theme-sidebar px-4 py-1.5 rounded-full text-[10px] font-bold text-theme-muted border border-white/50">{filteredViolations.length} Active Incidents</span>
             </div>
             <div className="overflow-x-auto p-2">
               <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] uppercase font-black text-theme-muted tracking-widest border-b border-white/30">
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
                        <tr key={i} className="border-b border-white/20 hover:bg-white/30 transition-all duration-300">
                          <td className="px-6 py-5 font-bold text-theme-muted">{row.date}</td>
                          <td className="px-6 py-5 font-black text-theme-text">{row.type}</td>
                          <td className="px-6 py-5 font-bold text-theme-muted">{row.resident}</td>
                          <td className="px-6 py-5"><StatusBadge status={row.status} /></td>
                          <td className="px-6 py-5 text-right font-black flex items-center justify-end gap-3 text-theme-text">
                            {row.score} 
                            <div className={`w-4 h-4 rounded-full border-4 ${row.score > 90 ? 'border-theme-accent bg-emerald-50' : 'border-white bg-slate-100 shadow-inner'}`} />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan="5" className="px-6 py-20 text-center text-theme-muted italic font-medium tracking-tight">No violations match your current filters.</td></tr>
                    )}
                  </tbody>
               </table>
             </div>
          </div>

          <div className="bg-theme-card p-7 rounded-[40px] shadow-sm border border-white/40">
             <div className="flex items-center gap-2 mb-5">
                <MapPin size={16} className="text-theme-accent"/>
                <h4 className="font-serif font-bold text-theme-text text-xl">Violation Reported Locations</h4>
             </div>
             <div className="h-80 rounded-[30px] overflow-hidden border border-white/50 z-0 shadow-inner">
                <MapContainer center={[6.9145, 79.8650]} zoom={14} className="h-full w-full relative z-0">
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

        {/* RIGHT SECTION */}
        <div className="w-full lg:w-[360px] flex flex-col gap-6 shrink-0">
           <div className="bg-theme-sidebar p-7 rounded-[35px] shadow-sm border border-white/40">
              <h5 className="text-[10px] font-black uppercase text-theme-muted/70 mb-8 tracking-[0.2em] text-center border-b border-white/50 pb-4">Sorting Accuracy Metrics</h5>
              <div className="h-40 flex items-end justify-between px-3 gap-2">
                 {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                   <div 
                    key={i} 
                    style={{ height: `${h}%` }} 
                    className={`flex-1 rounded-full transition-all duration-1000 ${h > 75 ? 'bg-theme-accent shadow-md' : 'bg-white/50'}`} 
                   />
                 ))}
              </div>
              <div className="flex justify-between mt-5 text-[9px] font-black text-theme-muted/70 uppercase px-1 tracking-widest">
                <span>Mon</span><span>Wed</span><span>Fri</span><span>Sun</span>
              </div>
           </div>

           <div className="flex items-center justify-between px-4">
            <h5 className="text-[10px] font-black uppercase text-theme-accent bg-theme-sidebar border border-white/50 px-4 py-2 rounded-2xl tracking-tighter shadow-sm">AI Review Queue</h5>
            <button className="text-[10px] font-black text-theme-muted uppercase hover:text-theme-accent transition-all">Expand All</button>
           </div>
           
           {[1, 2].map(i => (
             <div key={i} className="bg-theme-card p-6 rounded-[35px] shadow-sm border border-white/40 hover:border-theme-accent transition-all duration-300 group">
                <div className="flex justify-between items-center mb-5">
                   <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-theme-sidebar rounded-2xl flex items-center justify-center text-theme-accent font-black border border-white/50 text-sm shadow-inner group-hover:bg-white transition-colors">
                        {i === 1 ? '12' : '08'}
                      </div>
                      <div>
                        <p className="text-sm font-black text-theme-text tracking-tight">Unit_{i === 1 ? '12' : '08'}</p>
                        <p className="text-[9px] text-theme-muted font-bold uppercase tracking-tighter">AI-Detected Log</p>
                      </div>
                   </div>
                   <MoreHorizontal size={20} className="text-theme-muted/40 group-hover:text-theme-muted" />
                </div>
                <div className="h-44 bg-theme-sidebar rounded-[28px] mb-5 overflow-hidden border border-white/40 relative">
                   <img 
                    src={`https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=60&w=400`} 
                    className="w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:scale-110 transition-transform duration-700" 
                    alt="Violation" 
                   />
                   <div className="absolute top-4 left-4 bg-red-500/90 text-white text-[8px] font-black px-2 py-1 rounded-lg flex items-center gap-1 uppercase backdrop-blur-sm shadow-sm">
                     <AlertTriangle size={8}/> 94% Confidence
                   </div>
                </div>
                <div className="space-y-1.5 mb-6 px-1">
                  <p className="text-[11px] font-black text-theme-text uppercase tracking-widest">Incident: 2025112{i}SW</p>
                  <div className="flex items-center gap-2 text-theme-muted">
                    <MapPin size={12}/>
                    <p className="text-[10px] font-bold">Colombo 06 • 14:20 PM</p>
                  </div>
                </div>
                <div className="flex gap-3">
                   <button className="flex-[0.8] py-3 rounded-2xl bg-white text-[10px] font-black uppercase text-theme-text border border-white/50 shadow-sm hover:bg-theme-main transition-all tracking-widest">Details</button>
                   <button className="flex-1 py-3 rounded-2xl bg-theme-accent text-[10px] font-black uppercase text-white shadow-md hover:opacity-90 transition-all flex items-center justify-center gap-2 tracking-widest"><ShieldCheck size={14}/> Confirm</button>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}