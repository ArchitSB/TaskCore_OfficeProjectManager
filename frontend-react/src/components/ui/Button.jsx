import React from 'react';

export function Button({ children, variant = 'primary', className = '', icon, ...props }) {
  const baseClasses = "flex items-center gap-2 rounded font-bold uppercase tracking-wider transition-colors";
  
  const variants = {
    primary: "bg-amber-500 text-background hover:bg-amber-400 px-md py-sm text-xs",
    secondary: "bg-[#1B2430] border border-[#2A3441] text-on-surface hover:bg-[#2A3441] px-md py-sm text-xs",
    icon: "w-8 h-8 flex items-center justify-center text-slate-400 hover:bg-[#1B2430] rounded",
    ghost: "text-slate-400 hover:text-amber-500 p-1"
  };

  return (
    <button className={`${baseClasses} ${variants[variant]} ${className}`} {...props}>
      {icon && <span className="material-symbols-outlined text-[16px]" style={variant === 'primary' ? { fontVariationSettings: "'FILL' 1" } : {}}>{icon}</span>}
      {children}
    </button>
  );
}
