import React, { useState } from 'react';
import './Settings.css';
import { 
  Upload, Plus, Building2, Users, Link as LinkIcon, FileText, 
  Phone, Calendar, Mail, Clock, Shield, MapPin, Truck,
  MoreVertical, ToggleRight, ToggleLeft, FileCheck, AlertCircle,
  Radio, Map, MessageSquare
} from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('Organization');

  const zones = ['Colombo Central', 'Colombo North', 'Borella', 'Kollupitiya'];
  const orgData = {
    hotline: '+94 11 268 1198', deployed: '01/01/2024', province: 'Western Province',
    email: 'admin@cleansl.gov.lk', regNo: 'CMC-WM-2026', councilId: 'CMC-001',
    portal: 'cleansl.gov.lk', fleet: '142 Trucks'
  };

  const usersList = [
    { name: 'Kasun Perera', email: 'kasun.p@cleansl.gov.lk', dept: 'IT Operations', role: 'System Admin', status: 'Active' },
    { name: 'Nimali Silva', email: 'n.silva@cleansl.gov.lk', dept: 'Logistics', role: 'Fleet Dispatcher', status: 'Active' },
    { name: 'Amila Fernando', email: 'amila.f@cleansl.gov.lk', dept: 'Public Relations', role: 'Complaint Manager', status: 'Pending' },
    { name: 'Ruwan Kumara', email: 'ruwan.k@cleansl.gov.lk', dept: 'Field Staff', role: 'Truck Supervisor', status: 'Active' }
  ];

  const integrationsList = [
    { id: 'gps', name: 'Live Fleet GPS API', desc: 'Real-time telemetry from garbage trucks (Coordinates, Speed, Fuel).', icon: <MapPin color="#0f172a" />, active: true },
    { id: 'iot', name: 'Smart Bin LoRaWAN', desc: 'Syncs fill-level sensor data from public smart bins across the city.', icon: <Radio color="#0f172a" />, active: true },
    { id: 'lgn', name: 'Lanka Gov Network', desc: 'Secure VPN connection for municipal data reporting and audits.', icon: <Shield color="#0f172a" />, active: true },
    { id: 'sms', name: 'Citizen Alert SMS', desc: 'Automated SMS alerts to citizens for collection delays or shifts.', icon: <Mail color="#0f172a" />, active: false }
  ];

  const docsList = [
    { name: 'Environmental Clearance Certificate (CEA)', date: 'Exp: 12 Dec 2026', status: 'Valid', icon: <FileCheck size={20} color="#0f172a" /> },
    { name: 'Karadiyana Dump Site Authorized Permit', date: 'Exp: 30 Jun 2026', status: 'Valid', icon: <FileCheck size={20} color="#0f172a" /> },
    { name: 'Fleet Vehicle Insurance Policies', date: 'Exp: 04 Mar 2026', status: 'Expiring Soon', icon: <AlertCircle size={20} color="#f59e0b" /> }
  ];

  const renderOrganizationTab = () => (
    <div className="cs-col">
      <div className="cs-card">
        <div className="cs-card-header" style={{ alignItems: 'center', flexWrap: 'nowrap', marginBottom: '16px' }}>
          <div>
            <h2>Council Zones Management</h2>
            <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#64748b' }}>Manage geographical dispatch zones and operational boundaries for the fleet.</p>
          </div>
          <button className="cs-btn cs-btn-outline"><Plus size={16} /> Add Council Zone</button>
        </div>
        <div className="cs-billing-freq">
          {zones.map((z, i) => <div key={i} className="cs-freq-box" style={{ background: '#f8fafc', color: '#0f172a' }}>{z}</div>)}
        </div>
      </div>
      
      <div className="cs-card">
        <div className="cs-card-header" style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '16px', marginBottom: '24px' }}>
          <div>
            <h2>Operational Information</h2>
            <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#64748b' }}>Primary details and system parameters for the municipal council.</p>
          </div>
        </div>
        <div className="cs-info-grid">
          <div className="cs-info-item"><label>Hotline</label><span><Phone /> {orgData.hotline}</span></div>
          <div className="cs-info-item"><label>System Deployed</label><span><Calendar /> {orgData.deployed}</span></div>
          <div className="cs-info-item"><label>Province</label><span>{orgData.province}</span></div>
          <div className="cs-info-item"><label>Support Email</label><span><Mail /> {orgData.email}</span></div>
          <div className="cs-info-item"><label>Council Reg No.</label><span><FileText /> {orgData.regNo}</span></div>
          <div className="cs-info-item"><label>Council ID</label><span>{orgData.councilId}</span></div>
          <div className="cs-info-item"><label>Web Portal</label><span><LinkIcon /> {orgData.portal}</span></div>
          <div className="cs-info-item"><label>Fleet Size</label><span><Truck size={16} /> {orgData.fleet}</span></div>
        </div>
      </div>
    </div>
  );

  const renderUsersTab = () => (
    <div className="cs-col">
      <div className="cs-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="cs-card-header" style={{ padding: '24px', margin: 0, borderBottom: '1px solid #e2e8f0', alignItems: 'center' }}>
          <div>
            <h2>Staff Directory</h2>
            <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#64748b' }}>Manage dashboard access for dispatchers, drivers, and supervisors.</p>
          </div>
          <button className="cs-btn cs-btn-outline"><Plus size={16} /> Add Staff</button>
        </div>
        <div className="cs-table-wrapper" style={{ margin: 0 }}>
          <table className="cs-table">
            <thead>
              <tr>
                <th>USER</th><th>DEPARTMENT</th><th>ROLE</th><th>STATUS</th><th style={{ textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {usersList.map((user, idx) => (
                <tr key={idx}>
                  <td style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>{user.name[0]}</div>
                    <div><div style={{ fontWeight: '500' }}>{user.name}</div><div style={{ fontSize: '12px', color: '#64748b' }}>{user.email}</div></div>
                  </td>
                  <td style={{ color: '#64748b' }}>{user.dept}</td>
                  <td><div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#475569' }}><Shield size={14} color="#94a3b8"/> {user.role}</div></td>
                  <td>
                    <span className={`cs-badge ${user.status === 'Active' ? 'active' : user.status === 'Pending' ? 'pending' : ''}`}>
                      {user.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}><MoreVertical size={18} color="#94a3b8" style={{ cursor: 'pointer' }}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderIntegrationsTab = () => (
    <div className="cs-col">
      <div className="cs-card">
        <div className="cs-card-header" style={{ alignItems: 'center' }}>
          <div>
            <h2>Integration Management</h2>
            <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#64748b' }}>Manage data pipelines between CleanSL and external city infrastructure.</p>
          </div>
          <button className="cs-btn cs-btn-outline">
            <Plus size={16} /> Add Integration
          </button>
        </div>
      </div>

      <div className="cs-integ-grid">
        {integrationsList.map((app) => (
          <div key={app.id} className="cs-card cs-integ-card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="cs-integ-header">
              <div className="cs-integ-icon">{app.icon}</div>
              <div style={{ padding: 0 }}>
                {app.active ? <ToggleRight size={32} color="#10b981" /> : <ToggleLeft size={32} color="#cbd5e1" />}
              </div>
            </div>
            <h3>{app.name}</h3>
            <p style={{ flexGrow: 1 }}>{app.desc}</p>
            <div className="cs-integ-footer">
              <span style={{ fontSize: '12px', fontWeight: '600', color: app.active ? '#0f172a' : '#94a3b8' }}>{app.active ? 'Connected' : 'Disconnected'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderComplianceTab = () => (
    <div className="cs-col">
      <div className="cs-card">
        <div className="cs-card-header" style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '16px', alignItems: 'center' }}>
          <div>
            <h2>Operational Compliance Documents</h2>
            <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#64748b' }}>Required documentation for municipal fleet and waste operation.</p>
          </div>
          <button className="cs-btn cs-btn-outline"><Plus size={16} /> Add Document</button>
        </div>
        
        <div className="cs-comp-list">
          {docsList.map((doc, idx) => (
            <div key={idx} className="cs-comp-item">
              <div className="cs-comp-info">
                <div className="cs-comp-icon">{doc.icon}</div>
                <div><div style={{ fontSize: '14px', fontWeight: '500' }}>{doc.name}</div><div style={{ fontSize: '12px', color: '#64748b' }}>{doc.date}</div></div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span className={`cs-badge ${doc.status === 'Valid' ? 'active' : 'pending'}`}>
                  {doc.status}
                </span>
                <button className="cs-btn cs-btn-outline" style={{ padding: '6px 12px', fontSize: '13px' }}>View</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="cs-wrapper">
      <div className="cs-header" style={{ alignItems: 'flex-start' }}>
        <h3 style={{ margin: 0, fontSize: '1.5rem', lineHeight: '2rem', fontWeight: '700', color: '#1e293b' }}>
          System Settings
        </h3>
        <div className="cs-actions" style={{ marginTop: '2px' }}>
          <button className="cs-btn cs-btn-outline"><Upload size={16} /> Export Logs</button>
        </div>
      </div>

      <div className="cs-tabs-container">
        {[
          { id: 'Organization', icon: Building2 },
          { id: 'User & Permissions', icon: Users },
          { id: 'Integration', icon: LinkIcon },
          { id: 'Compliance', icon: FileText }
        ].map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`cs-tab ${activeTab === tab.id ? 'active' : ''}`}
          >
            <tab.icon size={16} /> {tab.id}
          </button>
        ))}
      </div>

      <div>
        {activeTab === 'Organization' && renderOrganizationTab()}
        {activeTab === 'User & Permissions' && renderUsersTab()}
        {activeTab === 'Integration' && renderIntegrationsTab()}
        {activeTab === 'Compliance' && renderComplianceTab()}
      </div>
    </div>
  );
}