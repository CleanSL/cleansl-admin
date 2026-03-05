import React, { useState } from 'react';
import { 
  User, Mail, Phone, MapPin, Building2, 
  ShieldCheck, Globe, CheckCircle2, Edit3, Clock 
} from 'lucide-react';
import './Settings.css'; 
import './Profile.css';  

export default function Profile() {
  // activeTab state controls what content is visible
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="cs-wrapper">
      {/* Header Section */}
      <div className="cs-header" style={{ alignItems: 'flex-start', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ 
            width: '64px', height: '64px', borderRadius: '12px', 
            background: '#0f172a', display: 'flex', alignItems: 'center', 
            justifyContent: 'center', color: '#fff' 
          }}>
            <User size={32} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700', color: '#1e293b' }}>
              Kasun Perera
            </h3>
            <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>
              System Administrator • IT Operations
            </p>
          </div>
        </div>
        <div className="cs-actions">
          <button className="cs-btn cs-btn-outline">
            <Edit3 size={16} /> Edit Profile
          </button>
        </div>
      </div>

      {/* Tab Navigation - All tabs visible, only Overview is functional */}
      <div className="cs-tabs-container" style={{ marginBottom: '24px' }}>
        {['Overview', 'Security', 'Activity'].map((tab) => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)} 
            className={`cs-tab ${activeTab === tab ? 'active' : ''}`}
          >
            {tab === 'Overview' && <User size={16} />}
            {tab === 'Security' && <ShieldCheck size={16} />}
            {tab === 'Activity' && <Clock size={16} />}
            <span style={{ marginLeft: '8px' }}>{tab}</span>
          </button>
        ))}
      </div>

      {/* Overview Content - Only displays when activeTab is 'Overview' */}
      {activeTab === 'Overview' && (
        <div className="cs-col">
          <div className="cs-card">
            <div className="cs-card-header" style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '16px', marginBottom: '24px' }}>
              <div>
                <h2>Personal Information</h2>
                <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#64748b' }}>
                  Your account details and contact information.
                </p>
              </div>
            </div>
            
            <div className="cs-info-grid">
              <div className="cs-info-item">
                <label>Full Name</label>
                <span><User size={14} /> Kasun Perera</span>
              </div>
              <div className="cs-info-item">
                <label>Email Address</label>
                <span><Mail size={14} /> kasun.p@cleansl.gov.lk</span>
              </div>
              <div className="cs-info-item">
                <label>Phone Number</label>
                <span><Phone size={14} /> +94 11 268 1198</span>
              </div>
              <div className="cs-info-item">
                <label>Work Location</label>
                <span><MapPin size={14} /> Colombo Central</span>
              </div>
              <div className="cs-info-item">
                <label>Department</label>
                <span><Building2 size={14} /> IT Operations</span>
              </div>
              <div className="cs-info-item">
                <label>Role</label>
                <span><ShieldCheck size={14} /> System Admin</span>
              </div>
              <div className="cs-info-item">
                <label>Language</label>
                <span><Globe size={14} /> English (UK)</span>
              </div>
              <div className="cs-info-item">
                <label>Join Date</label>
                <span><CheckCircle2 size={14} /> 01/01/2024</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security and Activity slots are ready for future commits */}
      {activeTab === 'Security' && <div className="cs-col"></div>}
      {activeTab === 'Activity' && <div className="cs-col"></div>}
    </div>
  );
}