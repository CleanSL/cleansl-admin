import React from 'react';
import { Truck, MapPin, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';

export default function FleetStatus() {
  const fleetData = [
    { id: 'WL-8492', driver: 'Kamal Perera', status: 'Active', zone: 'Colombo Central', load: '85%', lastUpdate: '2 mins ago' },
    { id: 'WP-1254', driver: 'Nimal Fernando', status: 'Maintenance', zone: 'Garage', load: '0%', lastUpdate: '1 hr ago' },
    { id: 'WP-7721', driver: 'Sunil Silva', status: 'Active', zone: 'Borella', load: '45%', lastUpdate: '5 mins ago' },
    { id: 'WL-9033', driver: 'Ravi Kumar', status: 'Delayed', zone: 'Kollupitiya', load: '60%', lastUpdate: '15 mins ago' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'text-emerald-500 bg-emerald-50';
      case 'Maintenance': return 'text-amber-500 bg-amber-50';
      case 'Delayed': return 'text-red-500 bg-red-50';
      default: return 'text-slate-500 bg-slate-50';
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Fleet Status</h2>
        <p className="mt-2 text-sm text-slate-500">Monitor real-time status and telemetry of all garbage collection vehicles.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Truck size={24} /></div>
          <div><p className="text-sm font-semibold text-slate-500">Total Fleet</p><p className="text-2xl font-black text-slate-800">142</p></div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><CheckCircle2 size={24} /></div>
          <div><p className="text-sm font-semibold text-slate-500">Active Now</p><p className="text-2xl font-black text-slate-800">118</p></div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><Clock size={24} /></div>
          <div><p className="text-sm font-semibold text-slate-500">Maintenance</p><p className="text-2xl font-black text-slate-800">15</p></div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-red-50 text-red-600 rounded-xl"><AlertCircle size={24} /></div>
          <div><p className="text-sm font-semibold text-slate-500">Delayed</p><p className="text-2xl font-black text-slate-800">9</p></div>
        </div>
      </div>

      <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-50">
          <h3 className="font-black text-slate-800 uppercase tracking-tight flex-1">Active Vehicle Roster</h3>
        </div>
        <div className="overflow-x-auto p-2">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-slate-400 text-[10px] uppercase font-black tracking-widest border-b border-slate-50">
                <th className="px-6 py-4">Vehicle ID</th>
                <th className="px-6 py-4">Driver</th>
                <th className="px-6 py-4">Current Zone</th>
                <th className="px-6 py-4">Capacity Load</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Last Telemetry</th>
              </tr>
            </thead>
            <tbody>
              {fleetData.map((truck) => (
                <tr key={truck.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-slate-700 flex items-center gap-2"><Truck size={16} className="text-slate-400" /> {truck.id}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{truck.driver}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 flex items-center gap-1"><MapPin size={14} className="text-slate-400" /> {truck.zone}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-24 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${parseInt(truck.load) > 80 ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: truck.load }}></div>
                      </div>
                      <span className="text-xs font-bold text-slate-600">{truck.load}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(truck.status)}`}>
                      {truck.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-400">{truck.lastUpdate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
