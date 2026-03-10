import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Efficiency', value: 72 },
  { name: 'Remaining', value: 28 },
];
const COLORS = ['#2D5A27', '#F1F5F9'];

const EfficiencyGauge = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-80 flex flex-col items-center">
      <h3 className="font-bold text-gray-700 self-start mb-2">System Efficiency</h3>
      <p className="text-xs text-gray-400 self-start mb-4">Live Performance</p>
      
      <div className="relative w-full h-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%" cy="50%"
              innerRadius={60}
              outerRadius={80}
              startAngle={180}
              endAngle={0}
              paddingAngle={0}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} cornerRadius={10} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute top-1/2 text-center">
          <span className="text-3xl font-bold text-gray-800">73%</span>
        </div>
      </div>
    </div>
  );
};

export default EfficiencyGauge;