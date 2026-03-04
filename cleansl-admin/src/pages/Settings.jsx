import React, { useState } from 'react';
import './Settings.css';
import { 
  Upload, Plus, Building2, Users, Link as LinkIcon, FileText, 
  Phone, Calendar, Mail, Clock, Shield, MapPin, Truck,
  MoreVertical, ToggleRight, ToggleLeft, FileCheck, AlertCircle,
  Radio, Map, MessageSquare, Pencil, X, CheckCircle2
} from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('Organization');

  // --- UNIVERSAL LOGIC: Generates ID & Truck Count for ANY Council ---
  const getCouncilMetrics = (name) => {
    const initials = name.split(' ').map(word => word[0]).join('').toUpperCase();
    const hash = name.length * 7; 
    return {
      id: `${initials}-${hash}`,
      fleet: 20 + (name.length % 50) + (name.charCodeAt(0) % 30)
    };
  };

  // --- STATE: Operational Info ---
  const [isEditingOrg, setIsEditingOrg] = useState(false);
  const [activeZone, setActiveZone] = useState('Colombo Central');
  
  const [orgData, setOrgData] = useState({
    hotline: '+94 11 268 1198', 
    deployed: '2024-01-01', 
    province: 'Western Province', 
    email: 'admin@cleansl.gov.lk', 
    regNo: 'CMC-WM-2026', 
    councilId: 'CMC-001',
    portal: 'cleansl.gov.lk', 
    fleet: 142 
  });
  const [tempOrgData, setTempOrgData] = useState({ ...orgData });

  // --- STATE: Council Zones ---
  const [zones, setZones] = useState(['Colombo Central', 'Colombo North', 'Borella', 'Kollupitiya']);
  const [isAddingZone, setIsAddingZone] = useState(false);
  const [newZone, setNewZone] = useState('');

  const COUNCILS_BY_PROVINCE = {
    'Western Province': ['Colombo Central', 'Colombo North', 'Borella', 'Kollupitiya', 'Dehiwala-Mount Lavinia MC', 'Sri Jayawardenepura Kotte MC', 'Moratuwa MC', 'Gampaha MC', 'Negombo MC', 'Kalutara UC'],
    'Central Province': ['Kandy MC', 'Matale MC', 'Dambulla MC', 'Gampola UC', 'Nuwara Eliya MC'],
    'Southern Province': ['Galle MC', 'Matara MC', 'Hambantota MC', 'Weligama UC'],
    'Northern Province': ['Jaffna MC', 'Point Pedro UC', 'Vavuniya UC', 'Mannar UC'],
    'Eastern Province': ['Batticaloa MC', 'Kalmunai MC', 'Trincomalee UC', 'Ampara UC'],
    'North Western Province': ['Kurunegala MC', 'Chilaw UC', 'Puttalam UC', 'Kuliyapitiya UC'],
    'North Central Province': ['Anuradhapura MC', 'Polonnaruwa MC', 'Hingurakgoda UC'],
    'Uva Province': ['Badulla MC', 'Bandarawela MC', 'Haputale UC', 'Monaragala UC'],
    'Sabaragamuwa Province': ['Ratnapura MC', 'Kegalle UC', 'Mawanella PS', 'Balangoda UC', 'Pelmadulla UC']
  };

  const activeProvinceCouncils = COUNCILS_BY_PROVINCE[orgData.province] || [];
  const availableCouncils = activeProvinceCouncils.filter(council => !zones.includes(council));
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(tempOrgData.email);

  // --- HANDLERS ---
  const handleZoneSelect = (zoneName) => {
    setActiveZone(zoneName);
    const metrics = getCouncilMetrics(zoneName);
    setOrgData(prev => ({
      ...prev,
      councilId: metrics.id,
      fleet: metrics.fleet
    }));
  };

  const handleRemoveZone = (e, zoneToRemove) => {
    e.stopPropagation();
    const updatedZones = zones.filter(z => z !== zoneToRemove);
    setZones(updatedZones);
    if (activeZone === zoneToRemove && updatedZones.length > 0) {
      handleZoneSelect(updatedZones[0]);
    }
  };

  const displayDate = (isoString) => isoString.split('-').reverse().join('/');

  // --- INLINE STYLES ---
  const inputStyle = { padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', color: '#0f172a', outline: 'none', backgroundColor: '#f8fafc', width: '100%', boxSizing: 'border-box' };
  const saveBtnStyle = { background: '#0f172a', color: '#fff', border: 'none', padding: '6px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '500' };
  const cancelBtnStyle = { background: '#f8fafc', color: '#475569', border: '1px solid #e2e8f0', padding: '6px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '500' };

  // --- STATIC DATA FOR OTHER TABS ---
  const usersList = [
    { name: 'Kasun Perera', email: 'kasun.p@cleansl.gov.lk', dept: 'IT Operations', role: 'System Admin', status: 'Active' },
    { name: 'Nimali Silva', email: 'n.silva@cleansl.gov.lk', dept: 'Logistics', role: 'Fleet Dispatcher', status: 'Active' },
    { name: 'Amila Fernando', email: 'amila.f@cleansl.gov.lk', dept: 'Public Relations', role: 'Complaint Manager', status: 'Pending' },
    { name: 'Ruwan Kumara', email: 'ruwan.k@cleansl.gov.lk', dept: 'Field Staff', role: 'Truck Supervisor', status: 'Active' }
  ];

  const integrationsList = [
    { id: 'gps', name: 'Live Fleet GPS API', desc: 'Real-time telemetry from garbage trucks.', icon: <MapPin color="#0f172a" />, active: true },
    { id: 'iot', name: 'Smart Bin LoRaWAN', desc: 'Syncs fill-level sensor data from public smart bins.', icon: <Radio color="#0f172a" />, active: true },
    { id: 'lgn', name: 'Lanka Gov Network', desc: 'Secure VPN connection for municipal data reporting.', icon: <Shield color="#0f172a" />, active: true },
    { id: 'sms', name: 'Citizen Alert SMS', desc: 'Automated SMS alerts to citizens.', icon: <Mail color="#0f172a" />, active: false }
  ];

  const docsList = [
    { name: 'Environmental Clearance Certificate (CEA)', date: 'Exp: 12 Dec 2026', status: 'Valid', icon: <FileCheck size={20} color="#0f172a" /> },
    { name: 'Karadiyana Dump Site Authorized Permit', date: 'Exp: 30 Jun 2026', status: 'Valid', icon: <FileCheck size={20} color="#0f172a" /> },
    { name: 'Fleet Vehicle Insurance Policies', date: 'Exp: 04 Mar 2026', status: 'Expiring Soon', icon: <AlertCircle size={20} color="#f59e0b" /> }
  ];

  // --- RENDERERS ---

  const renderOrganizationTab = () => (
    <div className="cs-col">
      <div className="cs-card">
        <div className="cs-card-header" style={{ alignItems: 'center', flexWrap: 'nowrap', marginBottom: '16px' }}>
          <div>
            <h2>Council Zones Management</h2>
            <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#64748b' }}>Showing zones for <strong>{orgData.province}</strong>.</p>
          </div>
          {isAddingZone ? (
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <select style={{...inputStyle, width: '220px'}} value={newZone} onChange={e => setNewZone(e.target.value)}>
                <option value="" disabled>Select a Council / Zone</option>
                {availableCouncils.map((council, i) => <option key={i} value={council}>{council}</option>)}
              </select>
              <button style={saveBtnStyle} onClick={() => { if(newZone) { setZones([...zones, newZone]); setIsAddingZone(false); setNewZone(''); }}}>Save</button>
              <button style={cancelBtnStyle} onClick={() => { setIsAddingZone(false); setNewZone(''); }}>Cancel</button>
            </div>
          ) : (
            <button className="cs-btn cs-btn-outline" onClick={() => setIsAddingZone(true)}><Plus size={16} /> Add Council Zone</button>
          )}
        </div>
        <div className="cs-billing-freq" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {zones.map((z, i) => (
            <div key={i} onClick={() => handleZoneSelect(z)} style={{ 
                background: activeZone === z ? '#0f172a' : '#f8fafc', color: activeZone === z ? '#ffffff' : '#0f172a',
                padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px',
                fontSize: '13px', fontWeight: '600', border: '1px solid #e2e8f0'
            }}>
              {activeZone === z && <CheckCircle2 size={14} />}
              {z}
              <X size={14} style={{ marginLeft: '4px', opacity: 0.6 }} onClick={(e) => handleRemoveZone(e, z)} />
            </div>
          ))}
        </div>
      </div>
      
      <div className="cs-card">
        <div className="cs-card-header" style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '16px', marginBottom: '24px', alignItems: 'center' }}>
          <div><h2>Operational Information</h2><p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#64748b' }}>Primary details for <b>{activeZone}</b>.</p></div>
          {isEditingOrg ? (
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={cancelBtnStyle} onClick={() => setIsEditingOrg(false)}>Cancel</button>
              <button style={{...saveBtnStyle, opacity: isValidEmail ? 1 : 0.5}} disabled={!isValidEmail} onClick={() => { 
                if(orgData.province !== tempOrgData.province) setZones([]); setOrgData(tempOrgData); setIsEditingOrg(false); 
              }}>Save Changes</button>
            </div>
          ) : <button className="cs-btn cs-btn-outline" style={{ padding: '8px' }} onClick={() => { setTempOrgData({...orgData}); setIsEditingOrg(true); }}><Pencil size={16} color="#64748b" /></button>}
        </div>
        <div className="cs-info-grid">
          <div className="cs-info-item"><label>Hotline</label>{isEditingOrg ? <input type="tel" style={inputStyle} value={tempOrgData.hotline} onChange={e => setTempOrgData({...tempOrgData, hotline: e.target.value})} /> : <span><Phone size={14} /> {orgData.hotline}</span>}</div>
          <div className="cs-info-item"><label>System Deployed</label>{isEditingOrg ? <input type="date" style={inputStyle} value={tempOrgData.deployed} onChange={e => setTempOrgData({...tempOrgData, deployed: e.target.value})} /> : <span><Calendar size={14} /> {displayDate(orgData.deployed)}</span>}</div>
          <div className="cs-info-item"><label>Province</label>{isEditingOrg ? <select style={inputStyle} value={tempOrgData.province} onChange={e => setTempOrgData({...tempOrgData, province: e.target.value})}>{Object.keys(COUNCILS_BY_PROVINCE).map(p => <option key={p}>{p}</option>)}</select> : <span>{orgData.province}</span>}</div>
          <div className="cs-info-item"><label>Support Email</label>{isEditingOrg ? <input type="email" style={inputStyle} value={tempOrgData.email} onChange={e => setTempOrgData({...tempOrgData, email: e.target.value})} /> : <span><Mail size={14} /> {orgData.email}</span>}</div>
          <div className="cs-info-item"><label>Council Reg No.</label>{isEditingOrg ? <input type="text" style={inputStyle} value={tempOrgData.regNo} onChange={e => setTempOrgData({...tempOrgData, regNo: e.target.value})} /> : <span><FileText size={14} /> {orgData.regNo}</span>}</div>
          <div className="cs-info-item"><label>Council ID</label>{isEditingOrg ? <input type="text" style={inputStyle} value={tempOrgData.councilId} onChange={e => setTempOrgData({...tempOrgData, councilId: e.target.value})} /> : <span style={{ fontWeight: '700' }}>{orgData.councilId}</span>}</div>
          <div className="cs-info-item"><label>Web Portal</label>{isEditingOrg ? <input type="url" style={inputStyle} value={tempOrgData.portal} onChange={e => setTempOrgData({...tempOrgData, portal: e.target.value})} /> : <span><LinkIcon size={14} /> {orgData.portal}</span>}</div>
          <div className="cs-info-item"><label>Fleet Size</label>{isEditingOrg ? <input type="number" style={inputStyle} value={tempOrgData.fleet} onChange={e => setTempOrgData({...tempOrgData, fleet: e.target.value})} /> : <span style={{ fontWeight: '700' }}><Truck size={14} /> {orgData.fleet} Trucks</span>}</div>
        </div>
      </div>
    </div>
  );

  const renderUsersTab = () => (
    <div className="cs-col">
      <div className="cs-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="cs-card-header" style={{ padding: '24px', margin: 0, borderBottom: '1px solid #e2e8f0', alignItems: 'center' }}>
          <div><h2>Staff Directory</h2><p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#64748b' }}>Manage dashboard access for staff.</p></div>
          <button className="cs-btn cs-btn-outline"><Plus size={16} /> Add Staff</button>
        </div>
        <div className="cs-table-wrapper" style={{ margin: 0 }}><table className="cs-table"><thead><tr><th>USER</th><th>DEPARTMENT</th><th>ROLE</th><th>STATUS</th><th style={{ textAlign: 'right' }}>ACTIONS</th></tr></thead><tbody>
          {usersList.map((user, idx) => (
            <tr key={idx}><td style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>{user.name[0]}</div><div><div style={{ fontWeight: '500' }}>{user.name}</div><div style={{ fontSize: '12px', color: '#64748b' }}>{user.email}</div></div></td><td style={{ color: '#64748b' }}>{user.dept}</td><td><div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#475569' }}><Shield size={14} color="#94a3b8"/> {user.role}</div></td><td><span className={`cs-badge ${user.status === 'Active' ? 'active' : 'pending'}`}>{user.status}</span></td><td style={{ textAlign: 'right' }}><MoreVertical size={18} color="#94a3b8" style={{ cursor: 'pointer' }}/></td></tr>
          ))}</tbody></table></div>
      </div>
    </div>
  );

  const renderIntegrationsTab = () => (
    <div className="cs-col">
      <div className="cs-card"><div className="cs-card-header" style={{ alignItems: 'center' }}><div><h2>Integration Management</h2><p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#64748b' }}>Manage data pipelines between CleanSL and infrastructure.</p></div><button className="cs-btn cs-btn-outline"><Plus size={16} /> Add Integration</button></div></div>
      <div className="cs-integ-grid">{integrationsList.map((app) => (
        <div key={app.id} className="cs-card cs-integ-card" style={{ display: 'flex', flexDirection: 'column' }}><div className="cs-integ-header"><div className="cs-integ-icon">{app.icon}</div><div style={{ padding: 0 }}>{app.active ? <ToggleRight size={32} color="#10b981" /> : <ToggleLeft size={32} color="#cbd5e1" />}</div></div><h3>{app.name}</h3><p style={{ flexGrow: 1 }}>{app.desc}</p><div className="cs-integ-footer"><span style={{ fontSize: '12px', fontWeight: '600', color: app.active ? '#0f172a' : '#94a3b8' }}>{app.active ? 'Connected' : 'Disconnected'}</span></div></div>
      ))}</div>
    </div>
  );

  const renderComplianceTab = () => (
    <div className="cs-col">
      <div className="cs-card">
        <div className="cs-card-header" style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '16px', alignItems: 'center' }}><div><h2>Operational Compliance Documents</h2><p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#64748b' }}>Required documentation for municipal fleet.</p></div><button className="cs-btn cs-btn-outline"><Plus size={16} /> Add Document</button></div>
        <div className="cs-comp-list">{docsList.map((doc, idx) => (
          <div key={idx} className="cs-comp-item"><div className="cs-comp-info"><div className="cs-comp-icon">{doc.icon}</div><div><div style={{ fontSize: '14px', fontWeight: '500' }}>{doc.name}</div><div style={{ fontSize: '12px', color: '#64748b' }}>{doc.date}</div></div></div><div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}><span className={`cs-badge ${doc.status === 'Valid' ? 'active' : 'pending'}`}>{doc.status}</span><button className="cs-btn cs-btn-outline" style={{ padding: '6px 12px', fontSize: '13px' }}>View</button></div></div>
        ))}</div>
      </div>
    </div>
  );

  return (
    <div className="cs-wrapper">
      <div className="cs-header" style={{ alignItems: 'flex-start' }}><h3 style={{ margin: 0, fontSize: '1.5rem', lineHeight: '2rem', fontWeight: '700', color: '#1e293b' }}>System Settings</h3><div className="cs-actions" style={{ marginTop: '2px' }}><button className="cs-btn cs-btn-outline"><Upload size={16} /> Export Logs</button></div></div>
      <div className="cs-tabs-container">{[{ id: 'Organization', icon: Building2 }, { id: 'User & Permissions', icon: Users }, { id: 'Integration', icon: LinkIcon }, { id: 'Compliance', icon: FileText }].map((tab) => (
        <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`cs-tab ${activeTab === tab.id ? 'active' : ''}`}><tab.icon size={16} /> {tab.id}</button>
      ))}</div>
      <div>
        {activeTab === 'Organization' && renderOrganizationTab()}
        {activeTab === 'User & Permissions' && renderUsersTab()}
        {activeTab === 'Integration' && renderIntegrationsTab()}
        {activeTab === 'Compliance' && renderComplianceTab()}
      </div>
    </div>
  );
}