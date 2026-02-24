import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// This data matches your Figma (Dec 01 to Dec 30)
const data = [
  { day: 'Dec 01', tons: 5 }, { day: 'Dec 05', tons: 15 },
  { day: 'Dec 10', tons: 8 }, { day: 'Dec 15', tons: 12 },
  { day: 'Dec 20', tons: 20 }, { day: 'Dec 25', tons: 10 },
  { day: 'Dec 30', tons: 18 },
];

const WasteChart = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-80">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-700">Total Waste Collected</h3>
        <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded">Last 30 Days</span>
      </div>
      
      <ResponsiveContainer width="100%" height="80%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorTons" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2D5A27" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#2D5A27" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94A3B8'}} />
          <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94A3B8'}} unit="t" />
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          />
          <Area 
            type="monotone" 
            dataKey="tons" 
            stroke="#2D5A27" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorTons)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WasteChart;