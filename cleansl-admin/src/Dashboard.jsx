import React from 'react';
import StatCard from './components/StatCard';
import { LayoutDashboard, Truck, AlertCircle, Map as MapIcon, Settings, BarChart3 } from 'lucide-react';
import NavItem from './components/NavItem';
import { MOCK_STATS, MOCK_COMPLAINTS } from './data/mockData';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-green-400">CleanSL</h1>
          <p className="text-xs text-slate-400">Admin Command Center</p>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <NavItem icon={<LayoutDashboard size={20} />} label="Overview" active />
          <NavItem icon={<MapIcon size={20} />} label="Live Map" />
          <NavItem icon={<AlertCircle size={20} />} label="Complaints" />
          <NavItem icon={<Truck size={20} />} label="Fleet Status" />
          <NavItem icon={<BarChart3 size={20} />} label="Analytics" />
        </nav>
        <div className="p-4 border-t border-slate-800">
          <NavItem icon={<Settings size={20} />} label="Settings" />
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <h2 className="text-lg font-semibold text-slate-700">Morning, User</h2>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium">CMC Supervisor</p>
              <p className="text-xs text-slate-500 text-green-500">System Online</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold">IF</div>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto p-8">
          <h3 className="text-2xl font-bold text-slate-800 mb-6">City Overview</h3>
          
          {/* DYNAMIC STAT CARDS - Linked to mockData.js */}
          <div className="flex flex-row gap-6 mb-10 items-stretch">
            <div style={{flex: '1 1 240px'}}>
              <StatCard
                title="Total Pickups"
                value={MOCK_STATS.totalPickups.toLocaleString()}
                trend="+12%"
                icon={<Truck size={20} />}
              />
            </div>
            <div style={{flex: '1 1 240px'}}>
              <StatCard
                title="Missed Pickups"
                value={MOCK_STATS.missedPickups}
                trend="-2%"
                isNegative={true}
                icon={<AlertCircle size={20} />}
              />
            </div>
            <div style={{flex: '1 1 240px'}}>
              <StatCard
                title="Active Trucks"
                value={MOCK_STATS.activeTrucks}
                trend="Steady"
                icon={<Truck size={20} />}
              />
            </div>
            <div style={{flex: '1 1 240px'}}>
              <StatCard
                title="New Complaints"
                value={MOCK_STATS.newComplaints}
                trend="+1"
                isNegative={true}
                icon={<AlertCircle size={20} />}
              />
            </div>
          </div>
          
          {/* LIVE FEED */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h4 className="font-bold text-slate-800">Live Operations Feed</h4>
              <span className="text-xs font-medium text-green-500 bg-green-50 px-2 py-1 rounded-full flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div> Live
              </span>
            </div>
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                <tr>
                  <th className="px-6 py-4">Event</th>
                  <th className="px-6 py-4">Location / Detail</th>
                  <th className="px-6 py-4">Time</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <FeedRow event="Truck En Route" detail="Truck T-05 | Ward 37: Kollupitiya" time="Just now" status="Moving" color="blue" />
                <FeedRow event="Collection Success" detail="Truck T-01 | Ward 07: Cinnamon Gardens" time="2 mins ago" status="Verified" color="green" />
                <FeedRow event="AI Violation" detail="Unsorted Waste | No. 15, Flower Rd" time="14 mins ago" status="Violation" color="red" />
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

const FeedRow = ({ event, detail, time, status, color }) => (
  <tr className="hover:bg-slate-50 transition-colors">
    <td className="px-6 py-4 font-medium text-slate-800">{event}</td>
    <td className="px-6 py-4 text-slate-500 text-sm">{detail}</td>
    <td className="px-6 py-4 text-slate-400 text-sm">{time}</td>
    <td className="px-6 py-4">
      <span className={`px-2 py-1 rounded-md text-xs font-bold bg-${color}-50 text-${color}-600 uppercase`}>
        {status}
      </span>
    </td>
  </tr>
);

export default Dashboard;