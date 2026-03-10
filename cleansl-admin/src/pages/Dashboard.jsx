import React, { useState, useMemo } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutGrid, Map, FileText, AlertTriangle, Truck, 
  PieChart, Settings as SettingsIcon, User, Search, 
  Calendar, ArrowUpRight, ArrowDownRight, CheckCircle2 
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart as RechartsPie, Pie, Cell } from 'recharts';
import { MOCK_STATS, MOCK_OPERATIONS } from '../data/mockData';

// --- Reusable Navigation Item ---
const NavItem = ({ icon, label, to, active }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(to)}
      className={`w-full flex items-center gap-3 px-4 py-3 mb-2 rounded-2xl transition-all ${
        active 
          ? 'bg-theme-accent text-white shadow-md font-bold' 
          : 'text-theme-text hover:bg-theme-card hover:text-theme-text font-medium'
      }`}
    >
      <div className={`${active ? 'text-white' : 'text-theme-accent'}`}>
        {icon}
      </div>
      <span className="text-sm">{label}</span>
    </button>
  );
};

// --- Reusable Stat Card ---
const StatCard = ({ title, value, trend, isNegative, icon, subtitle }) => (
  <div className="bg-theme-card rounded-3xl p-6 shadow-sm flex flex-col justify-between border border-white/40">
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center gap-2 text-theme-text font-bold text-sm">
        {icon} <span>{title}</span>
      </div>
      <div className="text-theme-muted font-bold tracking-widest leading-none">...</div>
    </div>
    <div>
      <h3 className="text-4xl font-bold text-theme-accent mb-2">{value}</h3>
      <div className="flex items-center gap-1 text-xs font-semibold text-theme-text opacity-80">
        {isNegative ? <ArrowDownRight size={14} /> : trend.includes('+') ? <ArrowUpRight size={14} /> : <CheckCircle2 size={14} />}
        <span>{trend} {subtitle}</span>
      </div>
    </div>
  </div>
);

// --- Operations Feed Row ---
const FeedRow = ({ num, event, detail, time, status, color }) => {
  // Map generic tailwind colors from mockData to our new theme
  let badgeColor = 'bg-slate-200 text-slate-700';
  if (color?.includes('green') || status === 'Verified') badgeColor = 'bg-theme-accent text-white';
  if (color?.includes('red') || status === 'Violation') badgeColor = 'bg-red-400 text-white';
  if (color?.includes('blue') || status === 'Moving') badgeColor = 'bg-blue-400 text-white';
  if (color?.includes('yellow') || status === 'Pending') badgeColor = 'bg-amber-300 text-theme-text';

  return (
    <tr className="border-b border-white/20 hover:bg-white/30 transition-colors">
      <td className="px-6 py-4 text-xs text-theme-muted font-bold">{num}</td>
      <td className="px-6 py-4 text-sm font-bold text-theme-text flex items-center gap-2">
        {event.includes('Truck') ? <Truck size={14} className="text-theme-muted"/> : 
         event.includes('Violation') ? <AlertTriangle size={14} className="text-red-400"/> : 
         event.includes('Complaint') ? <FileText size={14} className="text-amber-400"/> :
         <CheckCircle2 size={14} className="text-theme-accent"/>}
        {event}
      </td>
      <td className="px-6 py-4 text-sm text-theme-muted">{detail}</td>
      <td className="px-6 py-4 text-sm font-medium text-theme-muted">{time}</td>
      <td className="px-6 py-4">
        <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${badgeColor}`}>
          {status}
        </span>
      </td>
    </tr>
  );
};

// --- Main Dashboard Component ---
const Dashboard = () => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const location = useLocation();
  const navigate = useNavigate();

  // Mock Data for Area Chart
  const chartData = [
    { name: 'Dec 01', tons: 8 }, { name: 'Dec 05', tons: 16 },
    { name: 'Dec 10', tons: 13 }, { name: 'Dec 15', tons: 5 },
    { name: 'Dec 20', tons: 20 }, { name: 'Dec 25', tons: 10 },
    { name: 'Dec 30', tons: 18 }
  ];

  // Gauge Data
  const gaugeData = [{ name: 'Efficiency', value: 72 }, { name: 'Remainder', value: 28 }];
  const COLORS = ['#3EC0A0', '#DDE8CD'];

  const filteredOperations = useMemo(() => {
    const q = (query || '').trim().toLowerCase();
    return MOCK_OPERATIONS.filter((op) => {
      if (filter === 'pickups' && !op.event.toLowerCase().includes('pickup')) return false;
      if (filter === 'violations' && !op.event.toLowerCase().includes('violation')) return false;
      if (!q) return true;
      return `${op.event} ${op.detail} ${op.status}`.toLowerCase().includes(q);
    });
  }, [query, filter]);

  const isOverview = location.pathname === '/' || location.pathname === '/overview';

  return (
    <div className="flex h-screen bg-theme-main font-sans text-theme-text selection:bg-theme-accent selection:text-white">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-[280px] bg-theme-sidebar flex flex-col p-6 m-4 rounded-[40px] shadow-sm border border-white/50">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 bg-theme-accent text-white rounded-full flex items-center justify-center font-serif text-2xl font-bold shadow-md">
            C
          </div>
          <div>
            <h1 className="text-xl font-bold font-serif text-theme-text leading-tight">CleanSL</h1>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          <NavItem icon={<LayoutGrid size={20} />} label="Dashboard" to="/" active={isOverview} />
          <NavItem icon={<Map size={20} />} label="Live Map" to="/live-map" active={location.pathname === '/live-map'} />
          <NavItem icon={<PieChart size={20} />} label="Analytics" to="/analytics" active={location.pathname === '/analytics'} />
          <NavItem icon={<FileText size={20} />} label="Complaints" to="/complaints" active={location.pathname === '/complaints'} />
          <NavItem icon={<Truck size={20} />} label="Fleet Tracking" to="/fleet" active={location.pathname === '/fleet'} />
          <NavItem icon={<AlertTriangle size={20} />} label="Violations" to="/violations" active={location.pathname === '/violations'} />
        </nav>

        <div className="mt-8 pt-8 border-t border-theme-card space-y-1">
          <NavItem icon={<SettingsIcon size={20} />} label="Settings" to="/settings" active={location.pathname === '/settings'} />
          <NavItem icon={<User size={20} />} label="Profile" to="/profile" active={location.pathname === '/profile'} />
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col overflow-hidden py-4 pr-4">
        
        {/* TOP HEADER */}
        <header className="h-20 flex items-center justify-between px-6 shrink-0 rounded-[32px] mb-4">
          <h2 className="text-3xl font-serif text-theme-text">Good Morning, <span className="text-theme-muted font-sans font-medium text-2xl">User</span></h2>
          
          <div className="flex items-center gap-6">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Dashboard..." 
                className="w-64 bg-theme-sidebar border-none text-sm rounded-full pl-6 pr-10 py-3 focus:ring-2 focus:ring-theme-accent focus:outline-none placeholder-theme-muted/50 font-medium"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-theme-accent opacity-50" size={18} />
            </div>

            <div className="flex bg-theme-sidebar p-1.5 rounded-full">
              {['Day', 'Week', 'Month', 'Year'].map(t => (
                <button key={t} className={`px-4 py-1.5 rounded-full text-xs font-bold ${t === 'Month' ? 'bg-theme-accent text-white shadow-md' : 'text-theme-muted hover:text-theme-text'}`}>
                  {t}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 bg-theme-sidebar px-4 py-2 rounded-full text-xs font-bold text-theme-muted">
              <Calendar size={14} className="text-theme-muted" />
              1 Dec 2026 - 31 Dec 2026
            </div>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto px-6 pb-8 custom-scrollbar">
          {isOverview ? (
            <div className="max-w-[1400px] mx-auto">
              
              {/* TOP 4 STAT CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                <StatCard 
                  title="Total Pickups" 
                  value="1,240" 
                  trend="+12%" 
                  subtitle="this week"
                  icon={<Truck size={16} />} 
                />
                <StatCard 
                  title="Missed Pickups" 
                  value="14" 
                  trend="-2%" 
                  subtitle="this week"
                  isNegative={true} 
                  icon={<AlertTriangle size={16} />} 
                />
                <StatCard 
                  title="Active Trucks" 
                  value="08" 
                  trend="8 trucks" 
                  subtitle="are active right now."
                  icon={<Map size={16} />} 
                />
                <StatCard 
                  title="New Complaints" 
                  value="05" 
                  trend="view all" 
                  subtitle=""
                  icon={<FileText size={16} />} 
                />
              </div>

              {/* MIDDLE CHARTS ROW */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
                
                {/* AREA CHART */}
                <div className="xl:col-span-2 bg-theme-card rounded-[32px] p-8 shadow-sm border border-white/40">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-theme-text font-serif text-xl">Total Waste Collected</h3>
                    <select className="bg-transparent text-theme-muted text-sm font-semibold p-1 outline-none cursor-pointer">
                      <option>Last 30 Days</option>
                      <option>Last 7 Days</option>
                    </select>
                  </div>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorTons" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'var(--text-muted)', fontSize: 12, fontWeight: 500}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: 'var(--text-muted)', fontSize: 12, fontWeight: 500}} tickFormatter={(t) => `${t}t`} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: 'var(--bg-main)', borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                          itemStyle={{ color: 'var(--text-dark)', fontWeight: 'bold' }}
                        />
                        <Area type="monotone" dataKey="tons" stroke="var(--accent)" strokeWidth={3} fillOpacity={1} fill="url(#colorTons)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* GAUGE & EFFICIENCY */}
                <div className="bg-theme-card rounded-[32px] p-8 shadow-sm border border-white/40 flex flex-col">
                  <div className="mb-2">
                    <h3 className="font-bold text-theme-text font-serif text-xl">System Efficiency</h3>
                    <p className="text-sm font-medium text-theme-muted">Live Performance</p>
                  </div>
                  <div className="flex items-center gap-2 text-theme-text font-semibold text-sm mb-4">
                    <ArrowUpRight size={16} /> 35% Increase vs. Manual Collection
                  </div>
                  
                  <div className="relative h-48 w-full flex items-center justify-center translate-y-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPie>
                        <Pie
                          data={gaugeData}
                          cx="50%"
                          cy="100%"
                          startAngle={180}
                          endAngle={0}
                          innerRadius={80}
                          outerRadius={100}
                          paddingAngle={0}
                          dataKey="value"
                          stroke="none"
                          cornerRadius={40}
                        >
                          {gaugeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                      </RechartsPie>
                    </ResponsiveContainer>
                    <div className="absolute bottom-4 text-5xl font-bold font-serif text-theme-text">
                      72%
                    </div>
                  </div>

                  <div className="flex justify-between mt-auto pt-6 border-t border-white/30">
                    <div>
                      <p className="font-bold text-theme-text font-serif text-lg mb-1">Active Residence</p>
                      <p className="text-2xl font-bold text-theme-accent">1, 245</p>
                      <p className="text-xs font-semibold text-theme-text">+12 this week</p>
                    </div>
                    <div>
                      <p className="font-bold text-theme-text font-serif text-lg mb-1">App Usage</p>
                      <p className="text-2xl font-bold text-theme-accent">92%</p>
                      <p className="text-xs font-semibold text-theme-text">Excellent</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* LIVE OPERATIONS TABLE */}
              <div className="bg-theme-card rounded-[32px] shadow-sm border border-white/40 overflow-hidden">
                <div className="px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                  <h4 className="font-bold text-theme-text font-serif text-xl">Live Operations Feed</h4>
                  
                  <div className="flex items-center bg-theme-sidebar rounded-full flex-1 max-w-sm px-4 py-2 mx-8 shadow-inner border border-white/50">
                    <Search className="text-theme-muted mr-3" size={16} />
                    <input
                      placeholder="Search..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="bg-transparent border-none text-sm w-full focus:outline-none text-theme-text placeholder-theme-muted/70 font-medium"
                    />
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-4 text-sm font-semibold">
                      <button onClick={() => setFilter('all')} className={`${filter === 'all' ? 'text-theme-text font-bold' : 'text-theme-muted hover:text-theme-text'}`}>All Activities</button>
                      <button onClick={() => setFilter('pickups')} className={`${filter === 'pickups' ? 'text-theme-text font-bold' : 'text-theme-muted hover:text-theme-text'}`}>Pickups</button>
                      <button onClick={() => setFilter('violations')} className={`${filter === 'violations' ? 'text-theme-text font-bold' : 'text-theme-muted hover:text-theme-text'}`}>Violations</button>
                    </div>
                    <button className="flex items-center gap-2 text-theme-muted font-bold text-sm bg-white/40 px-4 py-2 rounded-xl hover:bg-white/60 transition-colors">
                      Add Filter
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="text-theme-muted text-sm font-bold border-b border-white/30">
                        <th className="px-6 py-4 w-16">Num.</th>
                        <th className="px-6 py-4">Event</th>
                        <th className="px-6 py-4">Source / Detail</th>
                        <th className="px-6 py-4">Time</th>
                        <th className="px-6 py-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOperations.length === 0 ? (
                        <tr><td colSpan={5} className="px-6 py-12 text-center text-theme-muted font-medium italic">No operations found...</td></tr>
                      ) : (
                        filteredOperations.slice(0, 4).map((op, idx) => (
                          <FeedRow key={op.id || idx} num={idx + 1} {...op} />
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          ) : (
            <Outlet />
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;