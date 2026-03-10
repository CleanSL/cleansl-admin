import React, { useState } from 'react';
import { 
  Search, 
  Calendar, 
  ChevronDown, 
  Download, 
  MoreHorizontal,
  ChevronRight,
  Maximize2,
  MapPin,
  Clock
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DRIVER_LIST_DATA, CITIES_PROGRESS_DATA, SUCCESS_RATE_DATA } from '../data/mockData';

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

// Reusable Components
const AvatarGroup = ({ count }) => (
  <div className="flex -space-x-2 items-center">
    {[1, 2, 3].map(i => (
      <div key={i} className="w-8 h-8 rounded-full border-2 border-theme-sidebar bg-slate-200 overflow-hidden shadow-sm">
        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="avatar" />
      </div>
    ))}
    {count && <span className="text-xs font-bold text-theme-muted ml-3">+{count}</span>}
  </div>
);

const DriverSummaryCard = ({ title, extraLabel, extraColor, avatars }) => (
  <div className="bg-theme-sidebar p-5 rounded-2xl border border-white/30 shadow-sm flex flex-col gap-3">
    <div className="flex justify-between items-center">
      <h4 className="text-sm font-black text-theme-text">{title}</h4>
      {avatars && <AvatarGroup count={avatars} />}
    </div>
    {extraLabel && (
      <button className={`text-[11px] font-bold flex items-center gap-1 hover:opacity-75 transition-opacity ${extraColor || 'text-theme-accent'}`} onClick={() => alert("Loading details...")}>
        {extraLabel}
      </button>
    )}
  </div>
);

export default function FleetStatus() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex flex-col gap-6 bg-theme-main p-8 h-full overflow-y-auto font-sans selection:bg-theme-accent selection:text-white">
      {/* Header & Global Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-theme-muted/10 pb-6 shrink-0">
        <div>
           <h1 className="text-3xl font-serif font-black text-theme-text tracking-tight">Drive Log Dashboard</h1>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto custom-scrollbar pb-2 md:pb-0">
          <div className="relative flex-1 md:w-72 min-w-[200px]">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-theme-muted" size={16} />
            <input 
              type="text" 
              placeholder="Drive Log Dashboard" 
              className="w-full pl-6 pr-12 py-2.5 bg-theme-sidebar border border-white/40 rounded-full text-sm font-bold text-theme-text placeholder-theme-muted/60 focus:ring-2 focus:ring-theme-accent outline-none shadow-inner"
            />
          </div>
          
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-[11px] font-bold text-theme-muted">Filter by</span>
            <button className="flex items-center gap-2 bg-theme-sidebar border border-white/40 px-4 py-2 rounded-xl text-xs font-bold text-theme-text shadow-sm hover:border-theme-accent transition-colors" onClick={() => alert("Calendar popup not implemented")}>
              Date <Calendar size={14} className="text-theme-muted ml-2"/>
            </button>
            <button className="flex items-center gap-2 bg-theme-sidebar border border-white/40 px-4 py-2 rounded-xl text-xs font-bold text-theme-text shadow-sm hover:border-theme-accent transition-colors">
              Driver <ChevronDown size={14} className="text-theme-muted ml-2"/>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="flex flex-col xl:flex-row gap-6">
        
        {/* Left Column (Table + Map) */}
        <div className="flex-[2] flex flex-col gap-6 min-w-0">
          
          {/* Driver List Table */}
          <div className="bg-theme-card rounded-[32px] border border-white/30 shadow-sm overflow-hidden flex flex-col">
             {/* Table Output Controls */}
             <div className="p-5 flex justify-between items-center border-b border-white/20 bg-theme-sidebar/50">
                <button className="flex items-center gap-2 border border-theme-muted/20 bg-theme-sidebar px-4 py-2 rounded-xl text-[10px] font-black uppercase text-theme-muted tracking-widest hover:border-theme-muted/50 transition-colors" onClick={() => alert("Downloading CSV...")}>
                  <Download size={14} /> Export
                </button>
                <div className="flex gap-4 items-center">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-muted/50" size={14} />
                    <input 
                      type="text" 
                      placeholder="Search Drivers"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 pr-4 py-2 bg-theme-sidebar rounded-xl text-xs outline-none border border-white/30 focus:border-theme-accent w-48 shadow-inner"
                    />
                  </div>
                  <button className="flex items-center gap-1.5 bg-theme-accent text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-md hover:bg-theme-accent/90 transition-colors" onClick={() => alert("Add Driver Modal")}>
                     Add Driver
                  </button>
                </div>
             </div>

             {/* Table Data */}
             <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead className="bg-theme-sidebar">
                    <tr className="text-[9px] uppercase font-black text-theme-muted tracking-[0.2em] border-b border-white/20">
                      <th className="px-6 py-4 w-10">
                        <div className="w-4 h-4 rounded border-2 border-theme-muted/30"></div>
                      </th>
                      <th className="px-3 py-4">Driver</th>
                      <th className="px-3 py-4 text-center">Average Week Active Hours</th>
                      <th className="px-3 py-4 text-center">Vehicle</th>
                      <th className="px-3 py-4">Route</th>
                      <th className="px-3 py-4">Status</th>
                      <th className="px-3 py-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {DRIVER_LIST_DATA.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase())).map((driver, i) => (
                      <tr key={i} className="border-b border-white/10 hover:bg-theme-sidebar transition-colors">
                        <td className="px-6 py-4">
                           <div className="w-4 h-4 rounded border-2 border-theme-accent flex items-center justify-center">
                             {i === 2 && <div className="w-2 h-2 bg-theme-accent rounded-sm"/>}
                           </div>
                        </td>
                        <td className="px-3 py-4 flex items-center gap-3">
                           <img src={`https://i.pravatar.cc/150?u=${driver.id}`} alt="driver" className="w-8 h-8 rounded-full object-cover shadow-sm" />
                           <div>
                             <p className="text-xs font-black text-theme-text">{driver.name}</p>
                             <p className="text-[10px] text-theme-accent font-bold tracking-tighter">{driver.username}</p>
                           </div>
                        </td>
                        <td className="px-3 py-4 text-center text-xs font-bold text-theme-accent/80">{driver.hours}</td>
                        <td className="px-3 py-4 text-center text-xs font-bold text-theme-accent">{driver.vehicle}</td>
                        <td className="px-3 py-4 text-xs font-bold text-theme-text">{driver.route}</td>
                        <td className="px-3 py-4">
                           <span className={`text-[10px] font-black italic tracking-widest ${driver.status === 'Active' ? 'text-theme-accent' : 'text-red-400'}`}>
                             {driver.status}
                           </span>
                        </td>
                        <td className="px-3 py-4 text-center">
                           <button className="p-1.5 hover:bg-theme-card rounded-full transition-colors text-theme-muted">
                             <MoreHorizontal size={16} />
                           </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
               </table>
             </div>
             
             {/* Pagination */}
             <div className="p-4 flex justify-end items-center gap-6 text-[11px] font-bold text-theme-muted border-t border-white/20 bg-theme-sidebar/50">
               <div className="flex items-center gap-2">
                 <span>Rows per page:</span>
                 <select className="bg-transparent font-black text-theme-text outline-none cursor-pointer">
                   <option>10</option>
                 </select>
               </div>
               <span>1-5 of 13</span>
               <div className="flex gap-2">
                 <button className="text-theme-muted hover:text-theme-text"><ChevronRight size={16} className="rotate-180" /></button>
                 <button className="text-theme-text hover:text-theme-accent"><ChevronRight size={16} /></button>
               </div>
             </div>
          </div>

          {/* Map Section */}
          <div className="bg-theme-card rounded-[32px] p-6 shadow-sm border border-white/30">
             <h3 className="font-serif font-black text-xl text-theme-text mb-4">Driver GPS Location Tracking</h3>
             <div className="h-[400px] w-full rounded-[24px] overflow-hidden border border-white shadow-inner relative z-0">
               <MapContainer center={[6.9145, 79.8650]} zoom={14} className="h-full w-full">
                 <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                 <Polyline positions={[[6.9145, 79.8650], [6.9080, 79.8700], [6.8900, 79.8600]]} color="var(--accent)" weight={6} opacity={0.6} lineCap="round" />
                 
                 <Marker position={[6.9080, 79.8700]}>
                   <Popup className="rounded-2xl overflow-hidden shadow-xl border-none p-0">
                     <div className="p-3 min-w-[160px] bg-theme-sidebar">
                       <div className="flex items-center gap-3 mb-3 border-b border-white/50 pb-3">
                         <img src="https://i.pravatar.cc/150?u=4" alt="Driver" className="w-10 h-10 rounded-full border-2 border-theme-accent shadow-sm" />
                         <div>
                            <p className="text-xs font-black text-theme-text">Driver_22</p>
                            <p className="text-[10px] text-theme-muted font-bold">Truck_004</p>
                         </div>
                       </div>
                       <div className="space-y-1.5 text-[10px]">
                         <p className="text-theme-accent font-bold flex items-center gap-1.5"><MapPin size={12}/> Pamankada East</p>
                         <p className="text-theme-muted italic pl-4">last updated: 30 secs ago</p>
                         <p className="text-blue-500 font-bold flex items-center gap-1.5 mt-2"><Clock size={12}/> 12 kms, 1 hrs 24 mins</p>
                       </div>
                     </div>
                   </Popup>
                 </Marker>
               </MapContainer>
               
               <button className="absolute bottom-4 right-4 z-[1000] bg-theme-sidebar p-2.5 rounded-xl shadow-lg border border-white/50 text-theme-text hover:text-theme-accent hover:bg-white transition-colors" onClick={() => alert("Expanding Map")}>
                  <Maximize2 size={16} />
               </button>
             </div>
          </div>
        </div>

        {/* Right Column (Widgets) */}
        <div className="w-full xl:w-[320px] shrink-0 flex flex-col gap-4">
           {/* Top Info Cards */}
           <div className="grid grid-cols-1 gap-4">
             <DriverSummaryCard title="85% Route Coverd" avatars="9" />
             <DriverSummaryCard title="12 Active Drivers" extraLabel="▶ View Drivers" />
             <DriverSummaryCard title="4 Total Drivers" avatars="1" />
             <DriverSummaryCard title="Driver Violations" extraLabel="▶ View Violation Details" extraColor="text-red-400" />
           </div>

           {/* Cities Progress */}
           <div className="bg-theme-card rounded-[24px] p-5 shadow-sm border border-white/30 flex-1">
             <div className="flex justify-between items-center mb-6 border-b border-white/30 pb-4">
               <h4 className="font-serif font-black text-theme-text opacity-90">Cities covered by the day</h4>
             </div>
             
             <div className="overflow-x-auto">
               <table className="w-full text-left text-[9px] uppercase tracking-widest font-black text-theme-muted mb-4">
                 <thead>
                   <tr className="border-b border-white/20">
                     <th className="pb-3 px-2">City</th>
                     <th className="pb-3 px-2">Progress</th>
                     <th className="pb-3 px-2 text-center">Violations</th>
                   </tr>
                 </thead>
                 <tbody className="text-xs normal-case tracking-normal">
                   {CITIES_PROGRESS_DATA.map((city, i) => (
                     <tr key={i} className="border-b border-white/10 hover:bg-theme-sidebar transition-colors cursor-pointer">
                       <td className="py-3 px-2 flex items-center gap-3">
                         <div className="w-6 h-6 rounded-full overflow-hidden bg-theme-sidebar shrink-0 border border-white/50">
                           <img src="https://images.unsplash.com/photo-1546436836-07a91091f160?w=100&q=80" alt="city" className="w-full h-full object-cover mix-blend-luminosity opacity-80" />
                         </div>
                         <div className="min-w-0">
                           <p className="font-black text-theme-text truncate text-[11px]">{city.name}</p>
                           <p className="text-[8px] text-theme-muted uppercase tracking-widest mt-0.5">{city.type}</p>
                         </div>
                       </td>
                       <td className="py-3 px-2">
                         <div className="flex flex-col gap-1 w-20">
                           <span className={`text-[10px] font-black ${city.progress < 50 ? 'text-red-400' : 'text-theme-accent'}`}>{city.progress}%</span>
                           <div className="h-1.5 bg-theme-sidebar border border-white/40 rounded-full w-full overflow-hidden shadow-inner">
                             <div className={`h-full ${city.color}`} style={{ width: `${city.progress}%` }}></div>
                           </div>
                         </div>
                       </td>
                       <td className="py-3 px-2 text-[10px] font-bold text-center">
                         <span className={city.violations !== 'None' ? 'text-red-500 bg-red-50 px-2 py-0.5 rounded-md' : 'text-theme-muted'}>{city.violations}</span>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
             
             <div className="flex justify-end items-center gap-4 text-[9px] font-bold text-theme-muted mt-2">
               <div className="flex items-center gap-1">
                 <span>Rows per page:</span>
                 <select className="bg-transparent font-black text-theme-text outline-none"><option>7</option></select>
               </div>
               <span>1-5 of 3</span>
               <div className="flex gap-1.5">
                 <button className="hover:text-theme-text"><ChevronRight size={12} className="rotate-180" /></button>
                 <button className="hover:text-theme-text"><ChevronRight size={12} /></button>
               </div>
             </div>
           </div>

           {/* Success Rate Chart */}
           <div className="bg-theme-card p-5 rounded-[24px] shadow-sm border border-white/30 h-64 flex flex-col">
             <h4 className="font-serif font-black text-theme-text opacity-90 mb-4 px-1">Driver Success Rate</h4>
             <div className="flex-1 w-full min-h-0">
               <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={SUCCESS_RATE_DATA} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff" strokeOpacity={0.6} />
                   <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 9, fontWeight: 700, fill: 'var(--text-muted)'}} dy={5} />
                   <YAxis axisLine={false} tickLine={false} tick={{fontSize: 9, fontWeight: 700, fill: 'var(--text-muted)'}} tickFormatter={(v) => `${v}%`} />
                   <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold' }} />
                   <Line type="monotone" dataKey="rate" stroke="var(--accent)" strokeWidth={3} dot={{ r: 4, fill: '#ef4444', strokeWidth: 0 }} activeDot={{ r: 6, fill: 'var(--accent)' }} />
                 </LineChart>
               </ResponsiveContainer>
             </div>
           </div>
           
        </div>
      </div>
    </div>
  );
}
