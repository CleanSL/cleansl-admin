import React from 'react';
import StatCard from '../components/StatCard';
import { Truck, AlertCircle } from 'lucide-react';
import { MOCK_STATS } from '../data/mockData';

const Overview = () => {
  // no interactive filter/search yet; keep state here if needed later
  const [query, setQuery] = React.useState('');

  return (
    <section className="flex-1 overflow-y-auto p-8">
        <h3 className="text-2xl font-bold text-slate-800 mb-6">City Overview</h3>
        <div className="flex flex-row gap-6 mb-10 items-stretch">
          <div style={{ flex: '1 1 240px' }}>
            <StatCard
              title="Total Pickups"
              value={MOCK_STATS.totalPickups.toLocaleString()}
              trend="+12%"
              icon={<Truck size={20} />}
            />
          </div>
          <div style={{ flex: '1 1 240px' }}>
            <StatCard
              title="Missed Pickups"
              value={MOCK_STATS.missedPickups}
              trend="-2%"
              isNegative={true}
              icon={<AlertCircle size={20} />}
            />
          </div>
          <div style={{ flex: '1 1 240px' }}>
            <StatCard
              title="Active Trucks"
              value={MOCK_STATS.activeTrucks}
              trend="Steady"
              icon={<Truck size={20} />}
            />
          </div>
          <div style={{ flex: '1 1 240px' }}>
            <StatCard
              title="New Complaints"
              value={MOCK_STATS.newComplaints}
              trend="+1"
              isNegative={true}
              icon={<AlertCircle size={20} />}
            />
          </div>
        </div>

        <br />
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
                onFocus={(e) => {
                  e.target.style.outline = 'none';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>
          {/* additional content from before could be added here */}
        </div>
      </section>
  );
};

export default Overview;
