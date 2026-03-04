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

  // --- STATIC DATA ---
  const zones = ['Colombo Central', 'Colombo North', 'Borella', 'Kollupitiya'];
  
  const orgData = {
    hotline: '+94 11 268 1198', deployed: '01/01/2024', province: 'Western Province',
    email: 'admin@cleansl.gov.lk', regNo: 'CMC-WM-2026', councilId: 'CMC-001',
    portal: 'cleansl.gov.lk', fleet: '142 Trucks'
  };

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
      </div>
    </div>
  );
}