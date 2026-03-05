import React, { useState, useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Truck, AlertCircle, Map as MapIcon, Settings as SettingsIcon, BarChart3 } from 'lucide-react';
import NavItem from '../components/NavItem';
import StatCard from '../components/StatCard';
import { MOCK_STATS, MOCK_OPERATIONS } from '../data/mockData';

// Helper component for the Feed Table rows
const FeedRow = ({ num, event, detail, time, status, color }) => (
  <tr className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
    <td className="px-4 py-4 text-xs text-slate-400 font-medium">{num}</td>
    <td className="px-4 py-4 text-sm font-bold text-slate-700">{event}</td>
    <td className="px-4 py-4 text-sm text-slate-500 truncate">{detail}</td>
    <td className="px-4 py-4 text-sm text-slate-400">{time}</td>
    <td className="px-4 py-4">
      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${color}`}>
        {status}
      </span>
    </td>
  </tr>
);

const Dashboard = () => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const location = useLocation();

  // Logic from Aakif: Filter the live feed based on search and buttons
  const filteredOperations = useMemo(() => {
    const q = (query || '').trim().toLowerCase();
    return MOCK_OPERATIONS.filter((op) => {
      if (filter === 'pickups') {
        const isPickup = op.event?.toLowerCase().includes('pickup') || op.detail?.toLowerCase().includes('pickup');
        if (!isPickup) return false;
      } else if (filter === 'violations') {
        const isViolation = op.event?.toLowerCase().includes('violation') || op.detail?.toLowerCase().includes('violation') || op.status?.toLowerCase().includes('violation');
        if (!isViolation) return false;
      }
      if (!q) return true;
      const hay = [op.event, op.detail, op.status, op.time].filter(Boolean).join(' ').toLowerCase();
      return hay.includes(q);
    });
  }, [query, filter]);

  // Determine if we are on the main overview page
  const isOverview = location.pathname === '/' || location.pathname === '/overview';

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* SIDEBAR - Merged NavItems */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-green-400 tracking-tighter">CleanSL</h1>
          <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mt-1">Admin Center</p>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <NavItem icon={<LayoutDashboard size={20} />} label="Overview" to="/" active={isOverview} />
          <NavItem icon={<MapIcon size={20} />} label="Live Map" to="/live-map" />
          <NavItem icon={<AlertCircle size={20} />} label="Complaints" to="/complaints" />
          <NavItem icon={<Truck size={20} />} label="Fleet Status" to="/fleet" />
          <NavItem icon={<BarChart3 size={20} />} label="Analytics" to="/analytics" />
        </nav>
        <div className="p-4 border-t border-slate-800">
          <NavItem icon={<SettingsIcon size={20} />} label="Settings" to="/settings" />
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <h2 className="text-lg font-bold text-slate-700">Good Morning, Admin</h2>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-black text-slate-800">CMC Supervisor</p>
              <p className="text-[10px] text-green-500 font-bold uppercase tracking-tighter italic">System Online</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-2xl flex items-center justify-center text-green-700 font-black shadow-sm border border-green-200">
              CMC
            </div>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto p-8 bg-[#FDFCF0]/50">
          {/* If we are at the root, show the Overview content from Aakif's code */}
          {isOverview ? (
            <>
              <h3 className="text-2xl font-black text-slate-800 mb-8 tracking-tight">City Overview</h3>
              
              {/* Dynamic Stat Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatCard title="Total Pickups" value={MOCK_STATS.totalPickups.toLocaleString()} trend="+12%" icon={<Truck size={20} />} />
                <StatCard title="Missed Pickups" value={MOCK_STATS.missedPickups} trend="-2%" isNegative={true} icon={<AlertCircle size={20} />} />
                <StatCard title="Active Trucks" value={MOCK_STATS.activeTrucks} trend="Steady" icon={<Truck size={20} />} />
                <StatCard title="New Complaints" value={MOCK_STATS.newComplaints} trend="+1" isNegative={true} icon={<AlertCircle size={20} />} />
              </div>

              {/* Live Operations Feed Table */}
              <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
                <div className="px-8 py-6 border-b border-slate-50 flex flex-col md:flex-row items-center gap-4">
                  <h4 className="font-black text-slate-800 flex-1 uppercase tracking-tight">Live Operations Feed</h4>
                  <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
                    {['all', 'pickups', 'violations'].map((f) => (
                      <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${filter === f ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                  <input
                    placeholder="Search feed..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full md:w-64 bg-slate-50 border border-slate-100 text-sm rounded-xl px-4 py-2 focus:ring-2 focus:ring-green-400 outline-none transition-all"
                  />
                </div>

                <div className="overflow-x-auto p-2">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="text-slate-400 text-[10px] uppercase font-black tracking-widest border-b border-slate-50">
                        <th className="px-6 py-4 w-16">#</th>
                        <th className="px-6 py-4">Event Type</th>
                        <th className="px-6 py-4">Detail Information</th>
                        <th className="px-6 py-4">Time</th>
                        <th className="px-6 py-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOperations.length === 0 ? (
                        <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-400 font-medium italic">No operational data matches your search...</td></tr>
                      ) : (
                        filteredOperations.map((op, idx) => (
                          <FeedRow key={op.id || idx} num={idx + 1} {...op} />
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            /* Otherwise, render the child page (LiveMap, Complaints, etc.) */
            <Outlet />
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;