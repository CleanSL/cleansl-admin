import React, { useState } from 'react';
import { 
  User, Mail, Phone, MapPin, Building2, ShieldCheck, 
  Globe, CheckCircle2, Edit3, Clock, Key, Smartphone, 
  LogOut, ShieldAlert, Upload, HardDrive, Save, X
} from 'lucide-react';
import './Settings.css'; 
import './Profile.css';  

export default function Profile() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [isEditing, setIsEditing] = useState(false);
  
  // Local state for profile data
  const [formData, setFormData] = useState({
    fullName: 'Kasun Perera',
    email: 'kasun.p@cleansl.gov.lk',
    phone: '+94 11 268 1198',
    location: 'Colombo Central',
    department: 'IT Operations',
    role: 'System Admin',
    language: 'English (UK)',
    joinDate: '01/01/2024'
  });

  const handleEditToggle = () => {
    setActiveTab('Overview'); // Force go to Overview
    setIsEditing(true);
  };

  const handleSave = () => {
    // Simple Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }
    setIsEditing(false);
    console.log("Saved Data:", formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // --- Overview Tab Renderer (Updated for Edit Mode) ---
  const renderOverview = () => (
    <div className="cs-col">
      <div className="cs-card">
        <div className="cs-card-header" style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '16px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2>Personal Information</h2>
            <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#64748b' }}>
              {isEditing ? "Update your details below." : "Your account details and contact information."}
            </p>
          </div>
          {isEditing && (
            <div style={{ display: 'flex', gap: '8px' }}>
               <button className="cs-btn cs-btn-outline" onClick={() => setIsEditing(false)} style={{ padding: '6px 12px', fontSize: '12px' }}>
                <X size={14} style={{ marginRight: '4px' }} /> Cancel
              </button>
              <button className="cs-btn cs-btn-dark" onClick={handleSave} style={{ padding: '6px 12px', fontSize: '12px' }}>
                <Save size={14} style={{ marginRight: '4px' }} /> Save Changes
              </button>
            </div>
          )}
        </div>

        <div className="cs-info-grid">
          {/* Full Name */}
          <div className="cs-info-item">
            <label>Full Name</label>
            {isEditing ? (
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="cs-edit-input" />
            ) : (
              <span><User size={14} /> {formData.fullName}</span>
            )}
          </div>

          {/* Email Address */}
          <div className="cs-info-item">
            <label>Email Address</label>
            {isEditing ? (
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="cs-edit-input" />
            ) : (
              <span><Mail size={14} /> {formData.email}</span>
            )}
          </div>

          {/* Phone Number */}
          <div className="cs-info-item">
            <label>Phone Number</label>
            {isEditing ? (
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="cs-edit-input" />
            ) : (
              <span><Phone size={14} /> {formData.phone}</span>
            )}
          </div>

          {/* Location */}
          <div className="cs-info-item">
            <label>Work Location</label>
            {isEditing ? (
              <select name="location" value={formData.location} onChange={handleChange} className="cs-edit-input">
                <option value="Colombo Central">Colombo Central</option>
                <option value="Colombo North">Colombo North</option>
                <option value="Colombo South">Colombo South</option>
              </select>
            ) : (
              <span><MapPin size={14} /> {formData.location}</span>
            )}
          </div>

          <div className="cs-info-item"><label>Department</label><span><Building2 size={14} /> {formData.department}</span></div>
          <div className="cs-info-item"><label>Role</label><span><ShieldCheck size={14} /> {formData.role}</span></div>
          
          <div className="cs-info-item">
            <label>Language</label>
            {isEditing ? (
              <select name="language" value={formData.language} onChange={handleChange} className="cs-edit-input">
                <option value="English (UK)">English (UK)</option>
                <option value="Sinhala">Sinhala</option>
                <option value="Tamil">Tamil</option>
              </select>
            ) : (
              <span><Globe size={14} /> {formData.language}</span>
            )}
          </div>
          
          <div className="cs-info-item"><label>Join Date</label><span><CheckCircle2 size={14} /> {formData.joinDate}</span></div>
        </div>
      </div>
    </div>
  );

  // --- Security & Activity stay the same ---
  // (Assuming renderSecurity and renderActivity functions from previous step are here)

  return (
    <div className="cs-wrapper">
      <div className="cs-header" style={{ alignItems: 'flex-start', marginBottom: '32px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.875rem', fontWeight: '700', color: '#0f172a' }}>Profile</h1>
          <div style={{ marginTop: '12px' }}>
            <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>{formData.fullName}</h3>
            <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>{formData.role} • {formData.department}</p>
          </div>
        </div>
        <div className="cs-actions">
          {!isEditing && (
            <button className="cs-btn cs-btn-outline" onClick={handleEditToggle}>
              <Edit3 size={16} /> Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="cs-tabs-container" style={{ marginBottom: '24px' }}>
        {['Overview', 'Security', 'Activity'].map((tab) => (
          <button key={tab} disabled={isEditing} onClick={() => setActiveTab(tab)} className={`cs-tab ${activeTab === tab ? 'active' : ''}`}>
             {tab === 'Overview' && <User size={16} />}
             {tab === 'Security' && <ShieldCheck size={16} />}
             {tab === 'Activity' && <Clock size={16} />}
             <span style={{ marginLeft: '8px' }}>{tab}</span>
          </button>
        ))}
      </div>

      {activeTab === 'Overview' && renderOverview()}
      {/* ... call renderSecurity() and renderActivity() based on activeTab ... */}
    </div>
  );
}