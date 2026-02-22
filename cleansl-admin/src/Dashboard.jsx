import React from 'react';
import { LayoutDashboard, Truck, AlertCircle, Map as MapIcon, Settings, BarChart3 } from 'lucide-react';
import NavItem from './components/NavItem';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* SIDEBAR - The Navigation */}
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

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* TOP BAR */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <h2 className="text-lg font-semibold text-slate-700">Morning, User</h2>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium">CMC Supervisor</p>
              <p className="text-xs text-slate-500 text-green-500">System Online</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold">
              IF
            </div>
          </div>
        </header>

        {/* PAGE CONTENT - This is where the magic happens */}
        <section className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">City Overview</h3>
            
            {/* We will put our Stat Cards and Tables here next! */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
               {/* Stat Cards will go here */}
               <div className="h-32 bg-white rounded-xl border border-dashed border-slate-300 flex items-center justify-center text-slate-400">
                 Stat Card Space
               </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;