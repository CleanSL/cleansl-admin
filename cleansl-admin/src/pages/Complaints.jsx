import React from 'react';
import { Search, Filter, ChevronDown, Eye, MoreHorizontal, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { COMPLAINT_STATS, COMPLAINTS_LIST } from '../data/mockData';

const PriorityBadge = ({ level }) => {
  const styles = {
    High: "bg-orange-100 text-orange-600",
    Medium: "bg-yellow-100 text-yellow-700",
    Critical: "bg-red-100 text-red-600",
    Low: "bg-blue-100 text-blue-600"
  };
  return <span className={`px-2 py-0.5 rounded text-[10px] font-bold ml-2 ${styles[level]}`}>{level}</span>;
};

const StatusLabel = ({ status }) => {
  const icons = {
    Pending: <Clock size={12} className="text-orange-500" />,
    "In Progress": <AlertCircle size={12} className="text-blue-500" />,
    Resolved: <CheckCircle2 size={12} className="text-green-500" />
  };
  return (
    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
      {icons[status]} {status}
    </div>
  );
};

export default function Complaints() {
  return (
    <div className="flex flex-col gap-6 bg-[#FDFCF0] p-8 h-full overflow-y-auto font-sans">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Complaint Management</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Track and resolve customer complaints</p>
        </div>
        <div className="relative w-80">
          <Search className="absolute left-4 top-3 text-slate-300" size={18} />
          <input type="text" placeholder="Search complaints..." className="w-full pl-12 pr-4 py-3 bg-white border border-slate-100 rounded-full text-sm shadow-sm focus:ring-2 focus:ring-green-400 outline-none" />
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-4 gap-6">
        {COMPLAINT_STATS.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[28px] shadow-sm border border-slate-50 flex items-center gap-4">
            <div className="text-2xl bg-slate-50 w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner">{stat.icon}</div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">{stat.label}</p>
              <p className={`text-2xl font-black ${stat.color || 'text-slate-800'}`}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
           <Search className="absolute left-4 top-2.5 text-slate-300" size={16} />
           <input type="text" placeholder="Search complaints by ID, name..." className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-100 rounded-xl text-xs" />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl text-xs font-bold text-slate-600 border border-slate-100 shadow-sm"><Filter size={14}/> Filters</button>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl text-xs font-bold text-slate-600 border border-slate-100 shadow-sm">All Status <ChevronDown size={14}/></button>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl text-xs font-bold text-slate-600 border border-slate-100 shadow-sm">All Priority <ChevronDown size={14}/></button>
      </div>

      {/* Complaint List */}
      <div className="flex flex-col gap-4">
        {COMPLAINTS_LIST.map((comp) => (
          <div key={comp.id} className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 hover:border-green-200 transition-all group">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center">
                <h3 className="text-sm font-black text-slate-800 tracking-tight">{comp.title}</h3>
                <PriorityBadge level={comp.priority} />
              </div>
              <StatusLabel status={comp.status} />
            </div>
            
            <p className="text-xs text-slate-500 font-medium mb-4 line-clamp-2">{comp.description}</p>
            
            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
              <div className="flex gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                <span>ID: <span className="text-slate-800">{comp.id}</span></span>
                <span>Customer: <span className="text-slate-800">{comp.customer}</span></span>
                <span>Category: <span className="text-slate-800">{comp.category}</span></span>
                <span>Date: <span className="text-slate-800">{comp.date}</span></span>
                {comp.assignedTo && <span>Assigned: <span className="text-slate-800">{comp.assignedTo}</span></span>}
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 transition-colors"><MoreHorizontal size={16}/></button>
                <button className="flex items-center gap-1.5 px-4 py-1.5 bg-slate-50 text-[10px] font-black uppercase text-slate-600 rounded-lg border border-slate-100 hover:bg-slate-100 transition-all">
                  <Eye size={12}/> View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}