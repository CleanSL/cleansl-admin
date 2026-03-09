import React, { useState } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { Search, Calendar, Download, Users, Truck, Recycle, Star } from 'lucide-react';
import { 
  ANALYTICS_TOTALS, MONTHLY_TRENDS, WASTE_DISTRIBUTION, 
  DRIVER_PERFORMANCE, USER_GROWTH 
} from '../data/mockData';

const AnalyticsCard = ({ title, value, trend, icon, color }) => (
  <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-50 flex-1 flex justify-between items-center group hover:border-[#2D5A27] transition-all">
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-2">{title}</p>
      <h3 className="text-3xl font-black text-slate-800">{value}</h3>
      <p className="text-[11px] font-bold text-green-500 mt-1">{trend} <span className="text-slate-300">vs last month</span></p>
    </div>
    <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center text-white shadow-lg`}>
      {icon}
    </div>
  </div>
);

export default function ReportsAnalytics() {
  const [activeTab, setActiveTab] = useState('collection'); // 'collection', 'driver', 'user'

  return (
    <div className="flex flex-col gap-6 bg-[#FDFCF0] p-8 h-full overflow-y-auto font-sans">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Reports & Analytics</h1>
          <p className="text-sm text-slate-500 font-medium">Comprehensive insights and performance metrics</p>
        </div>
        <div className="flex gap-4 items-center">
          <div className="relative w-72">
            <Search className="absolute left-4 top-3 text-slate-300" size={18} />
            <input type="text" placeholder="Reports & Analytics" className="w-full pl-12 pr-4 py-3 bg-white border border-slate-100 rounded-full text-sm shadow-sm outline-none focus:ring-2 focus:ring-[#2D5A27]" />
          </div>
          <button className="flex items-center gap-2 px-5 py-3 bg-white rounded-2xl text-xs font-black text-slate-600 border border-slate-100 shadow-sm"><Calendar size={16}/> This Month</button>
          <button className="flex items-center gap-2 px-6 py-3 bg-[#5DAE54] rounded-2xl text-xs font-black text-white shadow-lg hover:bg-[#2D5A27] transition-all"><Download size={16}/> Export</button>
        </div>
      </div>

      {/* Top Banner Stats */}
      <div className="flex gap-6">
        <AnalyticsCard title="Waste Collected" value={ANALYTICS_TOTALS.waste.value} trend={ANALYTICS_TOTALS.waste.trend} icon={<Recycle size={24}/>} color="bg-[#A3D99F]" />
        <AnalyticsCard title="Total Pickups" value={ANALYTICS_TOTALS.pickups.value} trend={ANALYTICS_TOTALS.pickups.trend} icon={<Truck size={24}/>} color="bg-[#D1FAE5] !text-[#2D5A27]" />
        <AnalyticsCard title="Active Users" value={ANALYTICS_TOTALS.users.value} trend={ANALYTICS_TOTALS.users.trend} icon={<Users size={24}/>} color="bg-[#E9F2E8] !text-[#2D5A27]" />
      </div>

      {/* Sub-Tab Navigation */}
      <div className="flex gap-2">
        <TabButton label="Collection Analytics" active={activeTab === 'collection'} onClick={() => setActiveTab('collection')} />
        <TabButton label="Driver Performance" active={activeTab === 'driver'} onClick={() => setActiveTab('driver')} />
        <TabButton label="User Growth" active={activeTab === 'user'} onClick={() => setActiveTab('user')} />
      </div>

      {/* Dynamic Content Area */}
      <div className="flex-1 min-h-0">
        {activeTab === 'collection' && <CollectionAnalyticsView />}
        {activeTab === 'driver' && <DriverPerformanceView />}
        {activeTab === 'user' && <UserGrowthView />}
      </div>
    </div>
  );
}

// --- SUB-VIEWS ---

const CollectionAnalyticsView = () => (
  <div className="grid grid-cols-3 gap-6 h-full pb-8">
    <div className="col-span-2 bg-white p-8 rounded-[40px] shadow-sm border border-slate-50">
      <h4 className="font-black text-slate-800 mb-8 uppercase text-xs tracking-widest flex items-center gap-2"><div className="w-2 h-2 bg-emerald-400 rounded-full"/> Monthly Collection Trends</h4>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={MONTHLY_TRENDS}>
          <defs>
            <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#2D5A27" stopOpacity={0.3}/><stop offset="95%" stopColor="#2D5A27" stopOpacity={0}/></linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700}} dy={10} />
          <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700}} />
          <Tooltip />
          <Area type="monotone" dataKey="value" stroke="#2D5A27" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
    <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-50 flex flex-col">
      <h4 className="font-black text-slate-800 mb-4 uppercase text-xs tracking-widest">Waste Category Distribution</h4>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={WASTE_DISTRIBUTION} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
            {WASTE_DISTRIBUTION.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const DriverPerformanceView = () => (
  <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-50">
    <h4 className="font-black text-slate-800 mb-8 uppercase text-xs tracking-widest flex items-center gap-2"><div className="w-2 h-2 bg-emerald-400 rounded-full"/> Driver Performance Metrics</h4>
    <div className="space-y-6">
      {DRIVER_PERFORMANCE.map((driver, i) => (
        <div key={i} className="flex flex-col gap-2">
          <div className="flex justify-between items-center text-sm font-bold text-slate-700">
            <span>{driver.name} <span className="text-slate-400 font-medium ml-2">{driver.pickups} pickups • Rating: {driver.rating}/5</span></span>
            <span className="bg-[#E9F2E8] px-3 py-1 rounded-full text-[#2D5A27] text-xs">{driver.efficiency}%</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="bg-[#2D5A27] h-full rounded-full transition-all duration-1000" style={{ width: `${driver.efficiency}%` }} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const UserGrowthView = () => (
  <div className="flex flex-col gap-6">
    <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-50">
      <h4 className="font-black text-slate-800 mb-8 uppercase text-xs tracking-widest flex items-center gap-2"><Users size={16} className="text-emerald-500"/> User Growth Over Time</h4>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={USER_GROWTH}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700}} dy={10} />
          <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700}} />
          <Tooltip />
          <Line type="monotone" dataKey="total" stroke="#2D5A27" strokeWidth={4} dot={{ r: 6, fill: '#2D5A27' }} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
    <div className="grid grid-cols-3 gap-6 pb-8">
      <StatBox label="Total Users" value="1,264" sub="+419 new this year" />
      <StatBox label="Avg. Monthly Growth" value="+38" sub="3.1% growth rate" />
      <StatBox label="Retention Rate" value="89%" sub="+2.3% vs last quarter" />
    </div>
  </div>
);

// --- HELPERS ---

const TabButton = ({ label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`px-6 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all
      ${active ? 'bg-[#2D5A27] text-white shadow-lg' : 'bg-white text-slate-400 border border-slate-50 hover:bg-slate-50'}`}
  >
    {label}
  </button>
);

const StatBox = ({ label, value, sub }) => (
  <div className="bg-[#E9F2E8]/40 p-6 rounded-[30px] border border-[#2D5A27]/10 text-center">
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{label}</p>
    <p className="text-3xl font-black text-slate-800">{value}</p>
    <p className="text-[10px] font-bold text-[#2D5A27] mt-1 uppercase">{sub}</p>
  </div>
);