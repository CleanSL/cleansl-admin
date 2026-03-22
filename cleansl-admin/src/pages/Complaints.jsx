import React, { useState, useMemo } from 'react';
import { 
  Search, 
  ChevronDown, 
  Eye, 
  MoreHorizontal, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  XCircle,
  FileText
} from 'lucide-react';
import { COMPLAINT_STATS, COMPLAINTS_LIST } from '../data/mockData';
import { complaintAPI } from '../services/api';

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
    Resolved: <CheckCircle2 size={12} className="text-theme-accent" />,
    Closed: <XCircle size={12} className="text-theme-muted" />
  };
  return (
    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-theme-muted">
      {icons[status]} {status}
    </div>
  );
};

export default function Complaints() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [priorityFilter, setPriorityFilter] = useState('All Priority');

  const [complaints, setComplaints] = useState(COMPLAINTS_LIST);
  const [stats, setStats] = useState(COMPLAINT_STATS);

  React.useEffect(() => {
    complaintAPI.getAll().then(data => {
      if (data && Array.isArray(data)) {
        const merged = [...data, ...COMPLAINTS_LIST];
        const unique = Array.from(new Map(merged.map(item => [item.id, item])).values());
        setComplaints(unique);
      }
    }).catch(e => console.log('Using mock complaints list', e));

    complaintAPI.getStats().then(data => {
      if (data && Array.isArray(data) && data.length > 0) setStats(data);
    }).catch(e => console.log('Using mock complaints stats', e));
  }, []);

  const filteredComplaints = useMemo(() => {
    return complaints.filter(item => {
      const matchesSearch = 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'All Status' || item.status === statusFilter;
      const matchesPriority = priorityFilter === 'All Priority' || item.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [searchTerm, statusFilter, priorityFilter]);

  return (
    <div className="flex flex-col gap-6 bg-theme-main font-sans selection:bg-theme-accent selection:text-white pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif font-black text-theme-text tracking-tight">Complaint Management</h1>
          <p className="text-sm text-theme-muted font-medium mt-1">Track and resolve customer complaints</p>
        </div>
        <div className="flex items-center bg-theme-sidebar px-4 py-2 rounded-full text-xs font-bold text-theme-muted border border-white/50">
          Total: {complaints.length}
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          let StatIcon = FileText;
          if (stat.label === "Pending") StatIcon = Clock;
          if (stat.label === "In Progress") StatIcon = AlertCircle;
          if (stat.label === "Resolved") StatIcon = CheckCircle2;
          
          return (
            <div key={i} className="bg-theme-card p-6 rounded-[28px] shadow-sm border border-white/40 flex items-center gap-4">
              <div className="text-2xl bg-theme-sidebar w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner text-theme-accent">
                <StatIcon size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-theme-muted uppercase tracking-widest leading-none mb-2">{stat.label}</p>
                <p className={`text-2xl font-black ${stat.color || 'text-theme-text'}`}>{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Responsive Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center bg-theme-sidebar p-4 rounded-[24px] border border-white/40 shadow-sm">
        <div className="flex-1 relative w-full">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted" size={16} />
           <input 
              type="text" 
              placeholder="Search complaints by ID, name..." 
              className="w-full pl-11 pr-4 py-3 bg-white border border-white/50 shadow-inner rounded-xl text-xs focus:ring-2 focus:ring-theme-accent outline-none text-theme-text placeholder-theme-muted/50 font-bold"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
           />
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          {/* Status Dropdown */}
          <div className="relative group flex-1 md:flex-none">
            <select 
              className="w-full appearance-none pl-4 pr-10 py-3 bg-white rounded-xl text-xs font-bold text-theme-text border border-white/50 shadow-inner cursor-pointer outline-none focus:ring-2 focus:ring-theme-accent"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All Status</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-theme-muted pointer-events-none" />
          </div>

          {/* Priority Dropdown */}
          <div className="relative group flex-1 md:flex-none">
            <select 
              className="w-full appearance-none pl-4 pr-10 py-3 bg-white rounded-xl text-xs font-bold text-theme-text border border-white/50 shadow-inner cursor-pointer outline-none focus:ring-2 focus:ring-theme-accent"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option>All Priority</option>
              <option>Critical</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-theme-muted pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Dynamic Complaint List */}
      <div className="flex flex-col gap-4">
        {filteredComplaints.length > 0 ? (
          filteredComplaints.map((comp) => (
            <div key={comp.id} className="bg-theme-card p-6 rounded-[32px] shadow-sm border border-white/40 hover:border-theme-accent transition-all group">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <h3 className="text-sm font-black text-theme-text tracking-tight">{comp.title}</h3>
                  <PriorityBadge level={comp.priority} />
                </div>
                <StatusLabel status={comp.status} />
              </div>
              
              <p className="text-xs text-theme-muted font-medium mb-4 line-clamp-2 md:line-clamp-none pr-4">{comp.description}</p>
              
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between pt-4 border-t border-white/30 gap-4">
                <div className="flex flex-wrap gap-4 text-[10px] font-bold text-theme-muted uppercase tracking-tighter">
                  <span>ID: <span className="text-theme-text">{comp.id}</span></span>
                  <span>Customer: <span className="text-theme-text">{comp.customer}</span></span>
                  <span>Category: <span className="text-theme-text">{comp.category}</span></span>
                  <span>Date: <span className="text-theme-text">{comp.date}</span></span>
                  {comp.assignedTo && <span>Assigned: <span className="text-theme-text">{comp.assignedTo}</span></span>}
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto mt-2 md:mt-0">
                  <button className="p-2 bg-theme-sidebar rounded-lg text-theme-muted hover:text-theme-accent transition-colors">
                    <MoreHorizontal size={16}/>
                  </button>
                  <button className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2 bg-theme-accent text-white text-[10px] font-black uppercase rounded-lg hover:opacity-90 transition-all shadow-md">
                    <Eye size={12}/> View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-theme-sidebar rounded-[32px] border border-dashed border-theme-muted/30">
            <p className="text-theme-muted font-medium italic">No complaints found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}