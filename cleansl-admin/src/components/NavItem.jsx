import React from 'react';

const NavItem = ({ icon, label, active = false }) => {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${
        active
          ? 'bg-green-500 text-white'
          : 'text-slate-300 hover:bg-slate-800'
      }`}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
};

export default NavItem;
