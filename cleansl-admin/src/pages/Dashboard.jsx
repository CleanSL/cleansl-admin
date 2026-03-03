import React, { useState, useMemo } from 'react';
import StatCard from '../components/StatCard';
import { LayoutDashboard, Truck, AlertCircle, Map as MapIcon, Settings, BarChart3 } from 'lucide-react';
import NavItem from '../components/NavItem';
import { MOCK_STATS, MOCK_COMPLAINTS, MOCK_OPERATIONS } from '../data/mockData';

const Dashboard = () => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [activePage, setActivePage] = useState('overview');

  const filteredOperations = useMemo(() => {
    const q = (query || '').trim().toLowerCase();
    return MOCK_OPERATIONS.filter((op) => {
      // filter by button
      if (filter === 'pickups') {
        const isPickup = (op.event && op.event.toLowerCase().includes('pickup')) || (op.detail && op.detail.toLowerCase().includes('pickup'));
        if (!isPickup) return false;
      } else if (filter === 'violations') {
        const isViolation = (op.event && op.event.toLowerCase().includes('violation')) || (op.detail && op.detail.toLowerCase().includes('violation')) || (op.status && op.status.toLowerCase().includes('violation'));
        if (!isViolation) return false;
      }

      // search query across event/detail/status/time
      if (!q) return true;
      const hay = [op.event, op.detail, op.status, op.time].filter(Boolean).join(' ').toLowerCase();
      return hay.includes(q);
    });
  }, [query, filter]);

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-green-400">CleanSL</h1>
          <p className="text-xs text-slate-400">Admin Dashboard Center</p>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <NavItem icon={<LayoutDashboard size={20} />} label="Overview" active />
          <NavItem icon={<MapIcon size={20} />} label="Live Map" />
          <NavItem icon={<AlertCircle size={20} />} label="Complaints" />
          <NavItem icon={<Truck size={20} />} label="Fleet Status" />
          <NavItem icon={<BarChart3 size={20} />} label="Analytics" />
        </nav>
        <div 
          className="p-4 border-t border-slate-800"
          onClick={() => setActivePage('settings')}
        >
          <NavItem icon={<Settings size={20} />} label="Settings"  active={activePage === 'settings'} />
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <h2 className="text-lg font-semibold text-slate-700">Good Morning, User</h2>
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => setActivePage('profile')}>
            <div className="text-right">
              <p className="text-sm font-medium">CMC Supervisor</p>
              <p className="text-xs text-slate-500 text-green-500">System Online</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold">CMC</div>
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

          <br></br>
          {/* LIVE FEED */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden w-full">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center">
              <div className="flex-1">
                <h4 className="font-bold text-slate-800">Live Operations Feed</h4>
              </div>
              <div className="flex-1 flex justify-center">
                <input
                  placeholder="Search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-2/3 md:w-1/2 bg-slate-50 text-sm rounded-full px-4 py-2 text-slate-600"
                  style={{ border: 'none', outline: 'none', boxShadow: 'none' }}
                  onFocus={(e) => { e.target.style.outline = 'none'; e.target.style.boxShadow = 'none'; }}
                />
              </div>
              <div className="flex-1 flex justify-end items-center gap-6 text-slate-600 text-sm">
                <nav className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setFilter('all')}
                    className={`px-4 py-1 rounded-md text-sm font-medium transition ${filter === 'all' ? 'bg-slate-100 text-slate-700' : 'text-slate-500'}`}
                    style={{ border: 'none', outline: 'none', boxShadow: 'none' }}
                    onFocus={(e) => { e.currentTarget.style.outline = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    All Activities
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilter('pickups')}
                    className={`px-4 py-1 rounded-md text-sm font-medium transition ${filter === 'pickups' ? 'bg-slate-100 text-slate-700' : 'text-slate-500'}`}
                    style={{ border: 'none', outline: 'none', boxShadow: 'none' }}
                    onFocus={(e) => { e.currentTarget.style.outline = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    Pickups
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilter('violations')}
                    className={`px-4 py-1 rounded-md text-sm font-medium transition ${filter === 'violations' ? 'bg-slate-100 text-slate-700' : 'text-slate-500'}`}
                    style={{ border: 'none', outline: 'none', boxShadow: 'none' }}
                    onFocus={(e) => { e.currentTarget.style.outline = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    Violations
                  </button>
                </nav>
              </div>
            </div>

            <div className="p-4 overflow-x-auto">
                <table className="w-full table-fixed text-left border-collapse">
                <colgroup>
                  <col style={{ width: '6%' }} />
                  <col style={{ width: '18%' }} />
                  <col style={{ width: '48%' }} />
                  <col style={{ width: '12%' }} />
                  <col style={{ width: '16%' }} />
                </colgroup>
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                  <tr>
                    <th className="px-4 py-4">Num.</th>
                    <th className="px-4 py-4">Event</th>
                    <th className="px-4 py-4">Source / Detail</th>
                    <th className="px-4 py-4">Time</th>
                    <th className="px-4 py-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOperations.length === 0 ? (
                    <tr>
                      <td className="px-4 py-6 text-center text-slate-400" colSpan={5}>
                        No results
                      </td>
                    </tr>
                  ) : (
                    filteredOperations.map((op, idx) => (
                      <FeedRow
                        key={op.id || idx}
                        num={idx + 1}
                        event={op.event}
                        detail={op.detail}
                        time={op.time}
                        status={op.status}
                        color={op.color}
                      />
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

const FeedRow = ({ num, event, detail, time, status, color }) => {
  const colorMap = {
    blue: { bg: '#EFF6FF', text: '#1E40AF' },
    green: { bg: '#ECFDF5', text: '#065F46' },
    red: { bg: '#FEF2F2', text: '#991B1B' },
    amber: { bg: '#FFFBEB', text: '#92400E' },
    yellow: { bg: '#FFFBEB', text: '#92400E' },
    default: { bg: '#F8FAFC', text: '#334155' }
  };

  const { bg, text } = colorMap[color] || colorMap.default;

  return (
    <tr className="bg-white hover:bg-slate-50 transition-colors rounded-md">
      <td className="px-4 py-4 font-medium text-slate-800">{num}</td>
      <td className="px-4 py-4 font-medium text-slate-800">{event}</td>
      <td className="px-4 py-4 text-slate-500 text-sm">{detail}</td>
      <td className="px-4 py-4 text-slate-400 text-sm">{time}</td>
      <td className="px-4 py-4">
        <span className="px-2 py-1 rounded-md text-xs font-bold uppercase" style={{ backgroundColor: bg, color: text }}>
          {status}
        </span>
      </td>
    </tr>
  );
};

export default Dashboard;