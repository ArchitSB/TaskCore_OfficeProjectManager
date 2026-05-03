import React from 'react';

export function Input({ icon, className = '', ...props }) {
  return (
    <div className={`relative ${className}`}>
      {icon && (
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
          {icon}
        </span>
      )}
      <input
        className={`bg-[#1B2430] border border-[#2A3441] rounded h-8 ${icon ? 'pl-10' : 'pl-4'} pr-4 text-xs font-body-sm w-full focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-on-surface`}
        {...props}
      />
    </div>
  );
}
