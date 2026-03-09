import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Search, Filter, Calendar, User, MapPin, MoreHorizontal, ExternalLink, ShieldCheck } from 'lucide-react';
import { VIOLATION_STATS, VIOLATIONS_TABLE, VIOLATION_LOCATIONS } from '../data/mockData';

const StatusBadge = ({ status }) => {
  const styles = {
    Pending: "bg-pink-100 text-pink-600",
    Disputed: "bg-purple-100 text-purple-600",
    Resolved: "bg-emerald-100 text-emerald-600",
    Confirmed: "bg-orange-100 text-orange-600"
  };
  return <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${styles[status]}`}>{status}</span>;
};

export default function Violations() {
  return (
    <div className="flex flex-col gap-6 bg-[#FDFCF0] p-6 h-full overflow-y-auto">
      {/* Header & Filters */}
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
         <div className="relative w-96">
            <Search className="absolute left-4 top-2.5 text-slate-300" size={18} />
            <input type="text" placeholder="Waste Sorting Violation Dashboard" className="w-full pl-12 pr-4 py-2 bg-[#F8FAFC] rounded-xl text-sm border-none focus:ring-2 focus:ring-[#2D5A27]" />
         </div>
         <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#F8FAFC] rounded-xl text-xs font-bold text-slate-500 border border-slate-100"><Calendar size={14}/> Date</button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#F8FAFC] rounded-xl text-xs font-bold text-slate-500 border border-slate-100"><User size={14}/> Driver</button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#F8FAFC] rounded-xl text-xs font-bold text-slate-500 border border-slate-100"><MapPin size={14}/> Area</button>
         </div>
      </div>

      <div className="flex gap-6">
        {/* LEFT COLUMN */}
        <div className="flex-[2] flex flex-col gap-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-4">
            {VIOLATION_STATS.map((stat, i) => (
              <div key={i} className="bg-white p-5 rounded-[24px] shadow-sm border border-slate-100 relative overflow-hidden">
                <div className="flex justify-between items-center mb-2">
                   <p className="text-[11px] font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                     <div className="w-1.5 h-1.5 bg-slate-800 rounded-full" /> {stat.label}
                   </p>
                   <MoreHorizontal size={14} className="text-slate-300" />
                </div>
                <div className="flex items-baseline gap-3">
                  <span className={`text-3xl font-black ${stat.color}`}>{stat.value}</span>
                  {stat.trend && <span className="text-[10px] font-bold text-slate-400">{stat.trend}</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Violation Table */}
          <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
             <div className="p-6 border-b border-slate-50"><h4 className="font-black text-slate-800 tracking-tight">Violation Table</h4></div>
             <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#F9FAFB] text-[10px] uppercase font-black text-slate-400">
                    <th className="px-6 py-4"><Calendar size={14} className="inline mr-2"/> Date</th>
                    <th className="px-6 py-4"><Filter size={14} className="inline mr-2"/> Violation Type</th>
                    <th className="px-6 py-4"><User size={14} className="inline mr-2"/> Resident</th>
                    <th className="px-6 py-4"><ShieldCheck size={14} className="inline mr-2"/> Status</th>
                    <th className="px-6 py-4 text-right">AI Score</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {VIOLATIONS_TABLE.map((row, i) => (
                    <tr key={i} className="border-b border-slate-50 hover:bg-slate-50">
                      <td className="px-6 py-4 font-bold text-slate-500">{row.date}</td>
                      <td className="px-6 py-4 font-black text-slate-800">{row.type}</td>
                      <td className="px-6 py-4 font-bold text-slate-500">{row.resident}</td>
                      <td className="px-6 py-4"><StatusBadge status={row.status} /></td>
                      <td className="px-6 py-4 text-right font-black flex items-center justify-end gap-2">
                        {row.score} <div className={`w-3 h-3 rounded-full border-2 ${row.score > 90 ? 'border-emerald-500' : 'border-slate-300'}`} />
                      </td>
                    </tr>
                  ))}
                </tbody>
             </table>
          </div>

          {/* Reported Locations Map */}
          <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100">
             <h4 className="font-black text-slate-800 tracking-tight mb-4 uppercase text-xs">Violation Reported Locations</h4>
             <div className="h-64 rounded-2xl overflow-hidden border border-slate-100">
                <MapContainer center={[6.8950, 79.8700]} zoom={14} className="h-full w-full">
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  {VIOLATION_LOCATIONS.map((pos, i) => <Marker key={i} position={pos} />)}
                </MapContainer>
             </div>
          </div>
        </div>

        {/* RIGHT COLUMN: AI Reports */}
        <div className="w-[340px] flex flex-col gap-4">
           <div className="bg-white p-5 rounded-[24px] shadow-sm border border-slate-100">
              <h5 className="text-[10px] font-black uppercase text-slate-400 mb-4 tracking-widest">Sorting Violations</h5>
              {/* Simplified Sparkline Placeholder */}
              <div className="h-32 bg-emerald-50 rounded-xl border border-emerald-100 flex items-end px-2 py-4 gap-1">
                 {[40, 70, 45, 90, 65, 80].map((h, i) => (
                   <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-emerald-400 rounded-sm opacity-60" />
                 ))}
              </div>
           </div>

           <h5 className="text-[10px] font-black uppercase text-[#2D5A27] bg-[#E9F2E8] px-4 py-2 rounded-xl w-fit">Unsorted Garbage Reports</h5>
           
           {/* Report Card */}
           {[1, 2].map(i => (
             <div key={i} className="bg-white p-4 rounded-[24px] shadow-sm border border-slate-100">
                <div className="flex justify-between items-center mb-3">
                   <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-purple-100 rounded-full" />
                      <div>
                        <p className="text-[10px] font-black">Driver_{i === 1 ? '12' : '08'}</p>
                        <p className="text-[8px] text-slate-400 font-bold uppercase">Sorting Violation Report</p>
                      </div>
                   </div>
                   <button className="text-slate-300">⋮</button>
                </div>
                <div className="h-32 bg-slate-100 rounded-xl mb-3 overflow-hidden">
                   <img src={`https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=60&w=400`} className="w-full h-full object-cover grayscale opacity-80" alt="Garbage Report" />
                </div>
                <p className="text-[10px] font-bold text-slate-800">Report ID : 2025112{i}SW</p>
                <p className="text-[9px] text-slate-400 mb-4">St. Lawrence Road, Wellawatte, Colombo 06</p>
                <div className="flex gap-2">
                   <button className="flex-1 py-2 rounded-lg bg-slate-50 text-[10px] font-black uppercase text-slate-600 border border-slate-100 flex items-center justify-center gap-1"><ExternalLink size={12}/> More Details</button>
                   <button className="flex-1 py-2 rounded-lg bg-[#2D5A27] text-[10px] font-black uppercase text-white shadow-sm flex items-center justify-center gap-1"><ShieldCheck size={12}/> Review</button>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}