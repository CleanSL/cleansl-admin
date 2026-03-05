import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Mail, Phone, MapPin, Building2, ShieldCheck, 
  Globe, CheckCircle2, Edit3, Clock, Key, Smartphone, 
  LogOut, ShieldAlert, Upload, HardDrive, Save, X, Check
} from 'lucide-react';
import './Settings.css'; 
import './Profile.css';  

export default function Profile() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [isEditingOverview, setIsEditingOverview] = useState(false);
  const navigate = useNavigate();

  // --- State for Overview ---
  const [personalInfo, setPersonalInfo] = useState({
    fullName: 'Kasun Perera',
    email: 'kasun.p@cleansl.gov.lk',
    phone: '+94 11 268 1198',
    location: 'Colombo Central',
    department: 'IT Operations',
    role: 'System Admin',
    language: 'English (UK)',
    joinDate: '01/01/2024'
  });

  // --- State for Security ---
  const [securityInfo, setSecurityInfo] = useState({
    passwordStatus: 'Last changed 3 months ago',
    is2FAEnabled: false,
    recoveryEmail: 'admin-recovery@cleansl.gov.lk'
  });

  const [editStates, setEditStates] = useState({
    email: false,
    password: false
  });

  const [emailInput, setEmailInput] = useState(securityInfo.recoveryEmail);

  // --- Logic Handlers ---
  const handleEditProfileClick = () => {
    setActiveTab('Overview');
    setIsEditingOverview(true);
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^\+?[\d\s-]{7,15}$/.test(phone);

  const saveOverview = () => {
    if (!validateEmail(personalInfo.email)) return alert("Invalid email format");
    if (!validatePhone(personalInfo.phone)) return alert("Invalid phone format");
    setIsEditingOverview(false);
  };

  const updateRecoveryEmail = () => {
    if (!validateEmail(emailInput)) return alert("Invalid recovery email format");
    setSecurityInfo({ ...securityInfo, recoveryEmail: emailInput });
    setEditStates({ ...editStates, email: false });
  };

  // --- Security Tab Renderer ---
  const renderSecurity = () => (
    <div className="cs-col">
      <div className="cs-card">
        <div className="cs-card-header" style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '16px', marginBottom: '24px' }}>
          <div>
            <h2>Security & Authentication</h2>
            <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#64748b' }}>Manage your credentials and account protection.</p>
          </div>
        </div>

        <div className="cs-info-grid" style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '24px' }}>
          <div className="cs-info-item">
            <label>Password Status</label>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <span><Key size={14} style={{ marginRight: '8px' }} /> {securityInfo.passwordStatus}</span>
              <button 
                className="cs-btn cs-btn-outline" 
                onClick={() => setSecurityInfo({...securityInfo, passwordStatus: 'Changed just now'})}
                style={{ padding: '4px 12px', fontSize: '12px', minWidth: '80px' }}
              >
                Change
              </button>
            </div>
          </div>

          <div className="cs-info-item">
            <label>Two-Factor Auth</label>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <span style={{ color: securityInfo.is2FAEnabled ? '#10b981' : '#ef4444' }}>
                {securityInfo.is2FAEnabled ? <Check size={14} style={{marginRight: '8px'}}/> : <ShieldAlert size={14} style={{ marginRight: '8px' }} />} 
                {securityInfo.is2FAEnabled ? 'Enabled' : 'Currently Disabled'}
              </span>
              <button 
                className="cs-btn cs-btn-outline" 
                onClick={() => setSecurityInfo({...securityInfo, is2FAEnabled: !securityInfo.is2FAEnabled})}
                style={{ padding: '4px 12px', fontSize: '12px', minWidth: '80px' }}
              >
                {securityInfo.is2FAEnabled ? 'Disable' : 'Setup'}
              </button>
            </div>
          </div>

          <div className="cs-info-item">
            <label>Recovery Email</label>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              {editStates.email ? (
                <input 
                  className="cs-edit-input" 
                  value={emailInput} 
                  onChange={(e) => setEmailInput(e.target.value)}
                  style={{ flex: 1, marginRight: '10px' }}
                />
              ) : (
                <span><Mail size={14} style={{ marginRight: '8px' }} /> {securityInfo.recoveryEmail}</span>
              )}
              
              <div style={{ display: 'flex', gap: '5px' }}>
                {editStates.email ? (
                  <>
                    <button className="cs-btn cs-btn-outline" onClick={updateRecoveryEmail} style={{ padding: '4px' }}><Check size={14}/></button>
                    <button className="cs-btn cs-btn-outline" onClick={() => setEditStates({...editStates, email: false})} style={{ padding: '4px' }}><X size={14}/></button>
                  </>
                ) : (
                  <button className="cs-btn cs-btn-outline" onClick={() => setEditStates({...editStates, email: true})} style={{ padding: '4px 12px', fontSize: '12px', minWidth: '80px' }}>Change</button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ color: '#64748b' }}><Smartphone size={18} /></div>
            <div style={{ fontSize: '13px', color: '#475569', fontWeight: '500' }}>Active Sessions: <span style={{ color: '#0f172a' }}>2 Devices</span></div>
          </div>
          <button className="cs-btn-text" style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '12px' }}>
            Terminate All
          </button>
        </div>
      </div>
    </div>
  );

  const renderActivity = () => (
    <div className="cs-col">
      <div className="cs-card">
        <div className="cs-card-header" style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '16px', marginBottom: '24px' }}>
          <div>
            <h2>System Activity Log</h2>
            <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#64748b' }}>A chronological record of your administrative actions.</p>
          </div>
        </div>
        <div className="cs-activity-list" style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {[
            { act: 'System Configuration Export', time: 'Today, 10:45 AM', icon: <Upload size={14} />, color: '#3b82f6' },
            { act: 'Modified Fleet Schedule: Zone 04', time: 'Yesterday, 02:30 PM', icon: <HardDrive size={14} />, color: '#10b981' },
            { act: 'New Admin Login Detected', time: 'Mar 02, 2026', icon: <ShieldCheck size={14} />, color: '#f59e0b' },
            { act: 'Password Changed Successfully', time: 'Jan 22, 2026', icon: <Key size={14} />, color: '#64748b' }
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '16px', padding: '16px', borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.color, border: '1px solid #e2e8f0' }}>
                {item.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>{item.act}</div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>{item.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="cs-wrapper">
      {/* Updated Header Section */}
      <div className="cs-header" style={{ alignItems: 'flex-start', marginBottom: '32px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.60rem', fontWeight: '700', color: '#0f172a' }}>Profile</h1>
          <div style={{ marginTop: '12px' }}>
            <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>Kasun Perera</h3>
            <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>System Administrator • IT Operations</p>
          </div>
        </div>
        <div className="cs-actions">
            <button
              className="cs-btn cs-btn-outline"
              onClick={() => navigate('/settings')}
              style={{ marginRight: '8px' }}
            >
              <ShieldCheck size={16} /> System Settings
            </button>
            {!isEditingOverview ? (
              <button className="cs-btn cs-btn-outline" onClick={handleEditProfileClick}>
                <Edit3 size={16} /> Edit Profile
              </button>
            ) : (
              <div style={{display: 'flex', gap: '10px'}}>
                <button className="cs-btn cs-btn-outline" onClick={() => setIsEditingOverview(false)}>Cancel</button>
                <button className="cs-btn cs-btn-dark" onClick={saveOverview}><Save size={16} /> Save Changes</button>
              </div>
            )}
        </div>
      </div>

      <div className="cs-tabs-container" style={{ marginBottom: '24px' }}>
        {['Overview', 'Security', 'Activity'].map((tab) => (
          <button 
            key={tab} 
            disabled={isEditingOverview}
            onClick={() => setActiveTab(tab)} 
            className={`cs-tab ${activeTab === tab ? 'active' : ''}`}
            style={{opacity: isEditingOverview ? 0.5 : 1}}
          >
            {tab === 'Overview' && <User size={16} />}
            {tab === 'Security' && <ShieldCheck size={16} />}
            {tab === 'Activity' && <Clock size={16} />}
            <span style={{ marginLeft: '8px' }}>{tab}</span>
          </button>
        ))}
      </div>

      {activeTab === 'Overview' && (
        <div className="cs-col">
          <div className="cs-card">
            <div className="cs-card-header" style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '16px', marginBottom: '24px' }}>
              <div><h2>Personal Information</h2><p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#64748b' }}>Your account details and contact information.</p></div>
            </div>
            <div className="cs-info-grid">
              <div className="cs-info-item">
                <label>Full Name</label>
                {isEditingOverview ? <input className="cs-edit-input" value={personalInfo.fullName} onChange={e => setPersonalInfo({...personalInfo, fullName: e.target.value})}/> : <span><User size={14} /> {personalInfo.fullName}</span>}
              </div>
              <div className="cs-info-item">
                <label>Email Address</label>
                {isEditingOverview ? <input className="cs-edit-input" type="email" value={personalInfo.email} onChange={e => setPersonalInfo({...personalInfo, email: e.target.value})}/> : <span><Mail size={14} /> {personalInfo.email}</span>}
              </div>
              <div className="cs-info-item">
                <label>Phone Number</label>
                {isEditingOverview ? <input className="cs-edit-input" value={personalInfo.phone} onChange={e => setPersonalInfo({...personalInfo, phone: e.target.value})}/> : <span><Phone size={14} /> {personalInfo.phone}</span>}
              </div>
              <div className="cs-info-item">
                <label>Work Location</label>
                {isEditingOverview ? <input className="cs-edit-input" value={personalInfo.location} onChange={e => setPersonalInfo({...personalInfo, location: e.target.value})}/> : <span><MapPin size={14} /> {personalInfo.location}</span>}
              </div>
              <div className="cs-info-item"><label>Department</label><span><Building2 size={14} /> {personalInfo.department}</span></div>
              <div className="cs-info-item"><label>Role</label><span><ShieldCheck size={14} /> {personalInfo.role}</span></div>
              <div className="cs-info-item">
                <label>Language</label>
                {isEditingOverview ? <input className="cs-edit-input" value={personalInfo.language} onChange={e => setPersonalInfo({...personalInfo, language: e.target.value})}/> : <span><Globe size={14} /> {personalInfo.language}</span>}
              </div>
              <div className="cs-info-item"><label>Join Date</label><span><CheckCircle2 size={14} /> {personalInfo.joinDate}</span></div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Security' && renderSecurity()}
      {activeTab === 'Activity' && renderActivity()}
    </div>
  );
}