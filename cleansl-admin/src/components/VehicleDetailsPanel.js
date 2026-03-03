import React from 'react';
import { User, ShieldCheck, Zap, Truck } from 'lucide-react';

export default function VehicleDetailsPanel() {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 grid grid-cols-4 gap-8 mt-4">
      {/* 1. Route Info */}
      <div className="border-r border-gray-100 pr-4">
        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Route Info</h4>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <p className="text-xs font-semibold text-gray-700">Start: Depot A (06:00 AM)</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
            <p className="text-xs font-semibold text-gray-700">Next: Rosmead Place</p>
          </div>
        </div>
      </div>

      {/* 2. Vehicle Status (The Truck Image Section) */}
      <div className="border-r border-gray-100 pr-4">
        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 text-center">Vehicle Status</h4>
        <div className="flex flex-col items-center">
          {/* Replace URL with your actual asset path */}
          <img 
            src="https://raw.githubusercontent.com/CleanSL/cleansl-admin/main/public/truck-sidebar.png" 
            alt="Truck Model" 
            className="h-16 object-contain mb-2"
          />
          <p className="text-[10px] text-gray-400">Vehicle Model</p>
          <p className="text-xs font-bold text-gray-800 uppercase">Isuzu Giga Compactor</p>
          <div className="w-full bg-gray-100 h-1.5 rounded-full mt-2 overflow-hidden">
             <div className="bg-[#2D5A27] h-full w-[65%]"></div>
          </div>
          <p className="text-[9px] text-gray-500 mt-1">Waste Load: 65% / 100%</p>
        </div>
      </div>

      {/* 3. Driver Profile */}
      <div className="border-r border-gray-100 pr-4">
        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Driver Profile</h4>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
            <User size={20} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-800">Net Weight</p>
            <p className="text-[10px] text-gray-500">4,250 kg</p>
            <p className="text-xs font-bold text-gray-800 mt-1">Registration No.</p>
            <p className="text-[10px] text-gray-500">WP NA-4589</p>
          </div>
        </div>
      </div>

      {/* 4. AI Logs */}
      <div>
        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">AI Logs</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between bg-green-50 p-2 rounded-lg">
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-green-600" />
              <span className="text-[10px] font-medium text-green-700">Bin Detected</span>
            </div>
            <span className="text-[10px] text-green-600">99% Conf.</span>
          </div>
          <div className="flex items-center justify-between bg-blue-50 p-2 rounded-lg">
            <div className="flex items-center gap-2">
              <Zap size={14} className="text-blue-600" />
              <span className="text-[10px] font-medium text-blue-700">Path Optimized</span>
            </div>
            <span className="text-[10px] text-blue-600">Saved 2km</span>
          </div>
        </div>
      </div>
    </div>
  );
}