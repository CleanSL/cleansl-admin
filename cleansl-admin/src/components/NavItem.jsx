import React from 'react';
import { NavLink } from 'react-router-dom';

// NavItem optionally works as a link when a `to` prop is provided.
// The `isActive` state from NavLink handles the styling automatically.
const NavItem = ({ icon, label, to }) => {
  if (to) {
    return (
      <NavLink
        to={to}
        end={to === '/'}
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            isActive ? 'bg-green-500 text-white' : 'text-slate-300 hover:bg-slate-800'
          }`
        }
      >
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </NavLink>
    );
  }

  // Fallback case if no `to` prop is specified; renders as plain div.
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300">
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
};

export default NavItem;
