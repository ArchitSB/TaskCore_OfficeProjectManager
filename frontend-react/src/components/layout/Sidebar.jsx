import React from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';

const NAV_ITEMS = [
  { path: ROUTES.DASHBOARD, icon: 'grid_view', label: 'Dashboard' },
  { path: ROUTES.PROJECTS, icon: 'account_tree', label: 'Projects' },
  { path: '#', icon: 'groups', label: 'Team' },
  { path: ROUTES.TASKS, icon: 'inventory_2', label: 'Backlog' },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full w-60 border-r border-[#2A3441] bg-[#121821] flex flex-col z-50">
      <div className="p-lg flex items-center gap-3">
        <div className="w-8 h-8 bg-amber-500 rounded flex items-center justify-center">
          <span className="material-symbols-outlined text-background" style={{ fontVariationSettings: "'FILL' 1" }}>account_tree</span>
        </div>
        <div>
          <h2 className="text-amber-500 font-black text-body-base leading-none">Engineering</h2>
          <span className="text-slate-400 text-[10px] uppercase tracking-widest font-bold">Global Team</span>
        </div>
      </div>
      <nav className="flex-1 mt-md flex flex-col gap-1">
        <div className="px-md mb-xs">
          <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">General</span>
        </div>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 font-inter text-xs font-medium tracking-wide uppercase transition-all duration-150 ${
                isActive && item.path !== '#'
                  ? 'text-amber-500 border-l-2 border-amber-500 bg-[#1B2430]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#161D27] border-l-2 border-transparent'
              }`
            }
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto border-t border-[#2A3441]">
        <NavLink to={ROUTES.HOME} className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-slate-200 hover:bg-[#161D27] font-inter text-xs font-medium tracking-wide uppercase transition-all duration-150">
          <span className="material-symbols-outlined">logout</span>
          <span>Logout</span>
        </NavLink>
      </div>
    </aside>
  );
}
