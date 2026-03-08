import React, { useState } from 'react';
import { 
  Truck, MapPin, Clock, Search, Filter, 
  Download, MoreVertical, Map, Users, ArrowUpRight, 
  AlertCircle, Activity
} from 'lucide-react';
import './Settings.css'; // Global Styles
import './DriverLogs.css'; // Specific Styles

export default function DriverLogs() {
  const [searchTerm, setSearchTerm] = useState('');

  const driverLogs = [
    { id: 'DRV-001', name: 'Saman Kumara', vehicle: 'Truck 052', route: 'Colombo Central', status: 'Active', activeHours: '6h 12m', progress: 85 },
    { id: 'DRV-002', name: 'Priyasath Silva', vehicle: 'Truck 018', route: 'Kollupitiya', status: 'Active', activeHours: '5h 45m', progress: 60 },
    { id: 'DRV-003', name: 'Nalin Perera', vehicle: 'Truck 004', route: 'Borella North', status: 'In Break', activeHours: '4h 20m', progress: 40 },
    { id: 'DRV-004', name: 'Sunil Hettiarachchi', vehicle: 'Truck 081', route: 'Colombo North', status: 'Active', activeHours: '7h 05m', progress: 92 },
    { id: 'DRV-005', name: 'Ruwan Wijesinghe', vehicle: 'Truck 022', route: 'Dematagoda', status: 'Offline', activeHours: '2h 15m', progress: 15 },
  ];

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Active': return 'active';
      case 'In Break': return 'pending';
      case 'Offline': return 'suspended';
      default: return '';
    }
  };

  return (
    <div className="cs-wrapper">
      {/* Page Header - Matches Profile/Settings Style */}
      <div className="cs-header" style={{ alignItems: 'flex-start', marginBottom: '32px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.875rem', fontWeight: '700', color: '#0f172a' }}>Driver Logs</h1>
          <div style={{ marginTop: '12px' }}>
            <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>Operational Dashboard</h3>
            <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>Real-time monitoring of fleet personnel and route progress.</p>
          </div>
        </div>
        <div className="cs-actions">
          <button className="cs-btn cs-btn-outline"><Download size={16} /> Export Report</button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="cs-metrics-grid">
        {[
          { label: 'Active Drivers', val: '12', sub: 'From 15 Total', icon: <Users size={20} />, color: '#3b82f6' },
          { label: 'Avg. Activity', val: '5h 45m', sub: '+12% shift avg', icon: <Activity size={20} />, color: '#10b981' },
          { label: 'Violations', val: '02', sub: 'Speeding alerts', icon: <AlertCircle size={20} />, color: '#ef4444' }
        ].map((m, i) => (
          <div key={i} className="cs-metric-card">
            <div className="cs-metric-icon-box" style={{ background: `${m.color}15`, color: m.color }}>{m.icon}</div>
            <div>
              <div className="cs-metric-label">{m.label}</div>
              <div className="cs-metric-value">{m.val}</div>
              <div className="cs-metric-sub" style={{ color: m.color }}>{m.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="cs-log-layout">
        <div className="cs-col">
          {/* Header Card matching Features/Documents style */}
          <div className="cs-card">
            <div className="cs-card-header" style={{ alignItems: 'center' }}>
              <div>
                <h2>Live Driver Status</h2>
                <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#64748b' }}>Current shifts and vehicle assignments.</p>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <div className="cs-search-wrapper">
                  <Search size={14} className="cs-search-icon" />
                  <input 
                    type="text" 
                    placeholder="Search Driver..." 
                    className="cs-search-input"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="cs-btn cs-btn-outline" style={{ padding: '8px' }}><Filter size={16} /></button>
              </div>
            </div>
          </div>

          {/* Table Card */}
          <div className="cs-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div className="cs-table-wrapper" style={{ margin: 0 }}>
              <table className="cs-table">
                <thead>
                  <tr>
                    <th>DRIVER</th>
                    <th>VEHICLE</th>
                    <th>ROUTE</th>
                    <th>ACTIVE HOURS</th>
                    <th>STATUS</th>
                    <th style={{ textAlign: 'right' }}>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {driverLogs.map((log) => (
                    <tr key={log.id}>
                      <td style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div className="cs-avatar-small">{log.name[0]}</div>
                        <div>
                          <div style={{ fontWeight: '600', fontSize: '14px' }}>{log.name}</div>
                          <div style={{ fontSize: '12px', color: '#94a3b8' }}>{log.id}</div>
                        </div>
                      </td>
                      <td><div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#475569' }}><Truck size={14} /> {log.vehicle}</div></td>
                      <td style={{ color: '#64748b' }}>{log.route}</td>
                      <td style={{ fontWeight: '500' }}>{log.activeHours}</td>
                      <td><span className={`cs-badge ${getStatusBadge(log.status)}`}>{log.status}</span></td>
                      <td style={{ textAlign: 'right' }}><MoreVertical size={16} style={{ cursor: 'pointer', color: '#94a3b8' }} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="cs-col">
          {/* Progress Tracking Sidebar */}
          <div className="cs-card">
            <div className="cs-card-header" style={{ marginBottom: '20px' }}>
              <h2>Route Completion</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {driverLogs.slice(0, 4).map((log) => (
                <div key={log.id} className="cs-progress-container">
                  <div className="cs-progress-label">
                    <span>{log.route}</span>
                    <span style={{ color: '#64748b' }}>{log.progress}%</span>
                  </div>
                  <div className="cs-progress-bar-bg">
                    <div 
                      className="cs-progress-bar-fill" 
                      style={{ width: `${log.progress}%`, background: log.progress > 80 ? '#10b981' : '#3b82f6' }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <button className="cs-btn cs-btn-outline" style={{ width: '100%', marginTop: '12px', justifyContent: 'center' }}>
              View Analytics <ArrowUpRight size={14} style={{ marginLeft: '6px' }} />
            </button>
          </div>

          {/* Map Preview Placeholder */}
          <div className="cs-card cs-map-card">
            <Map size={32} className="cs-map-icon" />
            <h3>Live Map Tracking</h3>
            <p>View all active trucks on the geographic dispatch interface.</p>
            <button className="cs-btn cs-btn-dark" style={{ marginTop: '16px', width: '100%' }}>Open Map</button>
          </div>
        </div>
      </div>
    </div>
  );
}