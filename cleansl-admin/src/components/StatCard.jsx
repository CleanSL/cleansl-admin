import React from 'react';

// This is a "Reusable Component" - like a single Lego brick
const StatCard = ({ title, value, icon, trend, isNegative }) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
        </div>
        <div className="p-3 bg-slate-50 rounded-lg text-slate-600">
          {icon}
        </div>
      </div>
      <div className="mt-4 flex items-center">
        {/* If isNegative is true (like for missed pickups), we show red text */}
        <span className={`text-xs font-bold ${isNegative ? 'text-red-500' : 'text-green-500'}`}>
          {trend}
        </span>
        <span className="text-xs text-slate-400 ml-2">vs last week</span>
      </div>
    </div>
  );
};

export default StatCard;