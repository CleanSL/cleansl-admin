import React from 'react';
import { LayoutDashboard, Map as MapIcon, Truck, AlertCircle, Settings, BarChart3 } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import NavItem from '../components/NavItem';

const Dashboard = () => {
  // layout only; actual page content is rendered by child routes via Outlet
  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-green-400">CleanSL</h1>
          <p className="text-xs text-slate-400">Admin Dashboard Center</p>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <NavItem icon={<LayoutDashboard size={20} />} label="Overview" to="/" />
          <NavItem icon={<MapIcon size={20} />} label="Live Map" to="/live-map" />
          <NavItem icon={<AlertCircle size={20} />} label="Complaints" to="/complaints" />
          <NavItem icon={<Truck size={20} />} label="Fleet Status" to="/fleet" />
          <NavItem icon={<BarChart3 size={20} />} label="Analytics" to="/analytics" />
        </nav>
        <div className="p-4 border-t border-slate-800">
          <NavItem icon={<Settings size={20} />} label="Settings" />
        </div>
      </aside>

      {/* MAIN AREA - child pages go here */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <h2 className="text-lg font-semibold text-slate-700">Good Morning, User</h2>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium">CMC Supervisor</p>
              <p className="text-xs text-slate-500 text-green-500">System Online</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold">CMC</div>
          </div>
        </header>
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;