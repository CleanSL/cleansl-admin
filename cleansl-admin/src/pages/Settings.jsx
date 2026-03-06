import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Settings.css';
import { 
  Upload, Plus, Building2, Users, Link as LinkIcon, FileText, 
  Phone, Calendar, Mail, Shield, Truck, MapPin,
  ToggleRight, ToggleLeft, FileCheck, AlertCircle,
  Radio, Pencil, X, CheckCircle2, Trash2,
  Eye, FileWarning, User
} from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('Organization');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // --- UNIVERSAL LOGIC ---
  const getCouncilMetrics = (name) => {
    const initials = name.split(' ').map(word => word[0]).join('').toUpperCase();
    const hash = name.length * 7; 
    return {
      id: `${initials}-${hash}`,
      fleet: 20 + (name.length % 50) + (name.charCodeAt(0) % 30)
    };
  };

  // --- NEW: EXPORT LOGS LOGIC ---
  const handleExportLogs = () => {
    const timestamp = new Date().toLocaleString();
    const logContent = `
CLEAN SL SYSTEM SETTINGS LOG
Generated: ${timestamp}
---------------------------------------

ORGANIZATION SUMMARY:
- Active Council: ${activeZone}
- Council ID: ${orgData.councilId}
- Province: ${orgData.province}
- Fleet Size: ${orgData.fleet} Trucks
- Registered Zones: ${zones.join(', ')}

STAFF SUMMARY:
- Total Registered Personnel: ${users.length}
- Active Users: ${users.filter(u => u.status === 'Active').length}

DOCUMENT STATUS:
${docsList.map(doc => `- ${doc.name}: Expires ${doc.expiry} (${getDocStatus(doc.expiry).label})`).join('\n')}

FEATURES STATE:
${integrations.map(i => `- ${i.name}: ${i.active ? 'ONLINE' : 'OFFLINE'}`).join('\n')}

---------------------------------------
END OF LOG
    `;

    const blob = new Blob([logContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CleanSL_Settings_Log_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // --- STATE: Operational Info (No changes) ---
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

  // --- STATE: Council Zones (No changes) ---
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

  // --- STATE: Users & Permissions (No changes) ---
  const [users, setUsers] = useState([
    { id: 1, name: 'Kasun Perera', email: 'kasun.p@cleansl.gov.lk', dept: 'IT Operations', role: 'System Admin', status: 'Active' },
    { id: 2, name: 'Nimali Silva', email: 'n.silva@cleansl.gov.lk', dept: 'Logistics', role: 'Fleet Dispatcher', status: 'Active' },
    { id: 3, name: 'Amila Fernando', email: 'amila.f@cleansl.gov.lk', dept: 'Public Relations', role: 'Complaint Manager', status: 'On Leave' },
    { id: 4, name: 'Ruwan Kumara', email: 'ruwan.k@cleansl.gov.lk', dept: 'Field Staff', role: 'Truck Supervisor', status: 'Suspended' }
  ]);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [userData, setUserData] = useState({ name: '', email: '', dept: 'IT Operations', role: 'System Admin', status: 'Active' });

  // --- STATE: Features ---
  const [integrations, setIntegrations] = useState([
    { id: 'gps', name: 'Live Fleet GPS API', desc: 'Real-time telemetry from garbage trucks.', icon: <MapPin color="#0f172a" />, active: true },
    { id: 'iot', name: 'Smart Bin LoRaWAN', desc: 'Syncs fill-level sensor data from public smart bins.', icon: <Radio color="#0f172a" />, active: true },
    { id: 'lgn', name: 'Lanka Gov Network', desc: 'Secure VPN connection for municipal data reporting.', icon: <Shield color="#0f172a" />, active: true },
    { id: 'sms', name: 'Citizen Alert SMS', desc: 'Automated SMS alerts to citizens.', icon: <Mail color="#0f172a" />, active: false }
  ]);

  // --- STATE: Documents ---
  const [docsList, setDocsList] = useState([
    { id: 1, name: 'Environmental Clearance Certificate (CEA)', renewed: '2023-12-12', expiry: '2026-12-12', file: null },
    { id: 2, name: 'Karadiyana Dump Site Authorized Permit', renewed: '2024-01-01', expiry: '2026-06-30', file: null },
    { id: 3, name: 'Fleet Vehicle Insurance Policies', renewed: '2025-03-04', expiry: '2026-03-04', file: null }
  ]);
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [newDoc, setNewDoc] = useState({ name: '', renewed: '', expiry: '', file: null });

  // --- HANDLERS: Organization (No changes) ---
  const handleZoneSelect = (zoneName) => {
    setActiveZone(zoneName);
    const metrics = getCouncilMetrics(zoneName);
    setOrgData(prev => ({ ...prev, councilId: metrics.id, fleet: metrics.fleet }));
  };

  const handleRemoveZone = (e, zoneToRemove) => {
    e.stopPropagation();
    const updatedZones = zones.filter(z => z !== zoneToRemove);
    setZones(updatedZones);
    if (activeZone === zoneToRemove && updatedZones.length > 0) handleZoneSelect(updatedZones[0]);
  };

  const displayDate = (isoString) => isoString.split('-').reverse().join('/');

  // --- HANDLERS: Users (No changes) ---
  const handleAddOrUpdateUser = () => {
    if (editingUserId) {
      setUsers(users.map(u => u.id === editingUserId ? { ...userData, id: editingUserId } : u));
    } else {
      setUsers([...users, { ...userData, id: Date.now() }]);
    }
    setIsUserModalOpen(false);
    setEditingUserId(null);
    setUserData({ name: '', email: '', dept: 'IT Operations', role: 'System Admin', status: 'Active' });
  };

  const startEditUser = (user) => {
    setEditingUserId(user.id);
    setUserData({ name: user.name, email: user.email, dept: user.dept, role: user.role, status: user.status });
    setIsUserModalOpen(true);
  };

  const deleteUser = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'Active': return 'active';
      case 'Suspended': return 'suspended';
      case 'On Leave': return 'pending';
      case 'Terminated': return 'fired';
      default: return '';
    }
  };

  // --- HANDLERS: Features ---
  const toggleIntegration = (id) => {
    setIntegrations(integrations.map(item => item.id === id ? { ...item, active: !item.active } : item));
  };

  const addNewIntegration = () => {
    const name = prompt("Enter Feature Name:");
    if (name) {
      setIntegrations([...integrations, { id: Date.now(), name, desc: 'Newly added online data service.', icon: <LinkIcon color="#0f172a" />, active: false }]);
    }
  };

  // --- HANDLERS: Documents ---
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) setNewDoc({ ...newDoc, name: file.name.split('.')[0], file: file });
  };

  const saveDocument = () => {
    if (newDoc.name && newDoc.expiry) {
      setDocsList([...docsList, { ...newDoc, id: Date.now() }]);
      setIsDocModalOpen(false);
      setNewDoc({ name: '', renewed: '', expiry: '', file: null });
    }
  };

  const deleteDoc = (id) => setDocsList(docsList.filter(d => d.id !== id));

  const renameDoc = (id) => {
    const newName = prompt("Enter new filename:");
    if (newName) setDocsList(docsList.map(d => d.id === id ? { ...d, name: newName } : d));
  };

  const getDocStatus = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return { label: 'Expired', class: 'fired', icon: <FileWarning size={14} /> };
    if (diffDays <= 30) return { label: 'Expiring Soon', class: 'pending', icon: <AlertCircle size={14} /> };
    return { label: 'Valid', class: 'active', icon: <FileCheck size={14} /> };
  };

  // --- STYLES (No changes) ---
  const inputStyle = { padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', color: '#0f172a', outline: 'none', backgroundColor: '#f8fafc', width: '100%', boxSizing: 'border-box' };
  const saveBtnStyle = { background: '#0f172a', color: '#fff', border: 'none', padding: '6px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '500' };
  const cancelBtnStyle = { background: '#f8fafc', color: '#475569', border: '1px solid #e2e8f0', padding: '6px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '500' };

  // --- RENDERERS (Unchanged) ---
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
      {isUserModalOpen && (
        <div className="cs-card" style={{ marginBottom: '20px', border: '1px solid #0f172a' }}>
          <div className="cs-card-header">
            <h3>{editingUserId ? 'Edit Staff Member' : 'Register New Staff'}</h3>
            <X size={18} style={{ cursor: 'pointer' }} onClick={() => setIsUserModalOpen(false)} />
          </div>
          <div className="cs-info-grid" style={{ padding: '10px 0' }}>
            <div className="cs-info-item"><label>Full Name</label><input type="text" style={inputStyle} value={userData.name} onChange={e => setUserData({...userData, name: e.target.value})} /></div>
            <div className="cs-info-item"><label>Email Address</label><input type="email" style={inputStyle} value={userData.email} onChange={e => setUserData({...userData, email: e.target.value})} /></div>
            <div className="cs-info-item"><label>Department</label><select style={inputStyle} value={userData.dept} onChange={e => setUserData({...userData, dept: e.target.value})}><option>IT Operations</option><option>Logistics</option><option>Public Relations</option><option>Field Staff</option></select></div>
            <div className="cs-info-item"><label>Role</label><select style={inputStyle} value={userData.role} onChange={e => setUserData({...userData, role: e.target.value})}><option>System Admin</option><option>Fleet Dispatcher</option><option>Complaint Manager</option><option>Truck Supervisor</option></select></div>
            <div className="cs-info-item"><label>Employment Status</label>
              <select style={inputStyle} value={userData.status} onChange={e => setUserData({...userData, status: e.target.value})}>
                <option>Active</option>
                <option>On Leave</option>
                <option>Suspended</option>
                <option>Terminated</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
            <button style={saveBtnStyle} onClick={handleAddOrUpdateUser}>{editingUserId ? 'Update Record' : 'Save Record'}</button>
            <button style={cancelBtnStyle} onClick={() => { setIsUserModalOpen(false); setEditingUserId(null); }}>Cancel</button>
          </div>
        </div>
      )}

      {/* NEW: Dedicated Header Card matching Features Tab */}
      <div className="cs-card">
        <div className="cs-card-header" style={{ alignItems: 'center' }}>
          <div>
            <h2>Staff Directory</h2>
            <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#64748b' }}>Current fleet management and administrative personnel.</p>
          </div>
          <button className="cs-btn cs-btn-outline" onClick={() => { 
            setIsUserModalOpen(true); 
            setEditingUserId(null); 
            setUserData({ name: '', email: '', dept: 'IT Operations', role: 'System Admin', status: 'Active' }); 
          }}>
            <Plus size={16} /> Add Staff
          </button>
        </div>
      </div>

      {/* Directory Table Card */}
      <div className="cs-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="cs-table-wrapper" style={{ margin: 0 }}>
          <table className="cs-table">
            <thead>
              <tr>
                <th>USER</th>
                <th>DEPARTMENT</th>
                <th>ROLE</th>
                <th>STATUS</th>
                <th style={{ textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>{user.name[0]}</div>
                    <div><div style={{ fontWeight: '500' }}>{user.name}</div><div style={{ fontSize: '12px', color: '#64748b' }}>{user.email}</div></div>
                  </td>
                  <td style={{ color: '#64748b' }}>{user.dept}</td>
                  <td><div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#475569' }}><Shield size={14} color="#94a3b8"/> {user.role}</div></td>
                  <td><span className={`cs-badge ${getStatusClass(user.status)}`}>{user.status}</span></td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                      <Pencil size={16} color="#64748b" style={{ cursor: 'pointer' }} title="Edit" onClick={() => startEditUser(user)} />
                      <Trash2 size={16} color="#ef4444" style={{ cursor: 'pointer' }} title="Remove" onClick={() => deleteUser(user.id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderFeaturesTab = () => (
    <div className="cs-col">
      <div className="cs-card"><div className="cs-card-header" style={{ alignItems: 'center' }}><div><h2>Feature Management</h2><p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#64748b' }}>Show the features that are online now and offline.</p></div><button className="cs-btn cs-btn-outline" onClick={addNewIntegration}><Plus size={16} /> Add Feature</button></div></div>
      <div className="cs-integ-grid">{integrations.map((app) => (
        <div key={app.id} className="cs-card cs-integ-card" style={{ display: 'flex', flexDirection: 'column' }}><div className="cs-integ-header"><div className="cs-integ-icon">{app.icon}</div><div style={{ padding: 0, cursor: 'pointer' }} onClick={() => toggleIntegration(app.id)}>{app.active ? <ToggleRight size={32} color="#10b981" /> : <ToggleLeft size={32} color="#cbd5e1" />}</div></div><h3>{app.name}</h3><p style={{ flexGrow: 1 }}>{app.desc}</p><div className="cs-integ-footer"><span style={{ fontSize: '12px', fontWeight: '600', color: app.active ? '#0f172a' : '#94a3b8' }}>{app.active ? 'Online' : 'Offline'}</span></div></div>
      ))}</div>
    </div>
  );

  const renderDocumentsTab = () => (
    <div className="cs-col">
      {isDocModalOpen && (
        <div className="cs-card" style={{ marginBottom: '20px', border: '1px solid #0f172a' }}>
          <div className="cs-card-header"><h3>Upload Document</h3><X size={18} style={{ cursor: 'pointer' }} onClick={() => setIsDocModalOpen(false)} /></div>
          <div className="cs-info-grid" style={{ padding: '10px 0' }}>
            <div className="cs-info-item"><label>Document Name</label><input type="text" style={inputStyle} value={newDoc.name} onChange={e => setNewDoc({...newDoc, name: e.target.value})} /></div>
            <div className="cs-info-item"><label>Renewed Date</label><input type="date" style={inputStyle} value={newDoc.renewed} onChange={e => setNewDoc({...newDoc, renewed: e.target.value})} /></div>
            <div className="cs-info-item"><label>Expiry Date</label><input type="date" style={inputStyle} value={newDoc.expiry} onChange={e => setNewDoc({...newDoc, expiry: e.target.value})} /></div>
            <div className="cs-info-item"><label>Select File</label><div onClick={() => fileInputRef.current.click()} style={{ ...inputStyle, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', background: '#fff' }}><Upload size={14} /> {newDoc.file ? newDoc.file.name : 'Choose file...'}</div><input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileUpload} /></div>
          </div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}><button style={saveBtnStyle} onClick={saveDocument}>Save</button><button style={cancelBtnStyle} onClick={() => setIsDocModalOpen(false)}>Cancel</button></div>
        </div>
      )}

      {/* Updated Header Part to match Features Tab */}
      <div className="cs-card">
        <div className="cs-card-header" style={{ alignItems: 'center' }}>
          <div>
            <h2>Operational Documents</h2>
            <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#64748b' }}>Manage certifications and permits.</p>
          </div>
          <button className="cs-btn cs-btn-outline" onClick={() => setIsDocModalOpen(true)}>
            <Plus size={16} /> Add Document
          </button>
        </div>
      </div>

      <div className="cs-card">
        <div className="cs-comp-list">
          {docsList.map((doc) => {
            const status = getDocStatus(doc.expiry);
            return (
              <div key={doc.id} className="cs-comp-item">
                <div className="cs-comp-info">
                  <div className="cs-comp-icon"><FileText color="#0f172a" /></div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {doc.name} 
                      <Pencil size={12} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => renameDoc(doc.id)} />
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>Exp: {displayDate(doc.expiry)}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span className={`cs-badge ${status.class}`} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {status.icon} {status.label}
                  </span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="cs-btn cs-btn-outline" style={{ padding: '6px' }} onClick={() => alert(`Opening: ${doc.name}`)}><Eye size={16} /></button>
                    <button className="cs-btn cs-btn-outline" style={{ padding: '6px' }} onClick={() => deleteDoc(doc.id)}><Trash2 size={16} color="#ef4444" /></button>
                  </div>
                </div>
              </div>
            );
          })}
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
          <button className="cs-btn cs-btn-outline" onClick={() => navigate('/profile')}>
            <User size={16} /> View Profile
          </button>
          <button className="cs-btn cs-btn-outline" onClick={handleExportLogs}>
            <Upload size={16} /> Export Logs
          </button>
        </div>
      </div>
      <div className="cs-tabs-container">{[{ id: 'Organization', icon: Building2 }, { id: 'User & Permissions', icon: Users }, { id: 'Features', icon: LinkIcon }, { id: 'Documents', icon: FileText }].map((tab) => (
        <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`cs-tab ${activeTab === tab.id ? 'active' : ''}`}><tab.icon size={16} /> {tab.id}</button>
      ))}</div>
      <div>
        {activeTab === 'Organization' && renderOrganizationTab()}
        {activeTab === 'User & Permissions' && renderUsersTab()}
        {activeTab === 'Features' && renderFeaturesTab()}
        {activeTab === 'Documents' && renderDocumentsTab()}
      </div>
    </div>
  );
}