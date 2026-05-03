import React from 'react';

export function Avatar({ src, alt = "Avatar", size = "md", status, fallback }) {
  const sizeClasses = {
    sm: "w-6 h-6 text-[10px]",
    md: "w-8 h-8 text-xs",
    lg: "w-10 h-10 text-sm",
  };

  return (
    <div className="relative inline-block">
      {src ? (
        <img alt={alt} className={`${sizeClasses[size]} rounded object-cover border border-[#2A3441]`} src={src} />
      ) : (
        <div className={`${sizeClasses[size]} rounded bg-slate-700 flex items-center justify-center font-bold text-slate-300 border border-[#2A3441]`}>
          {fallback}
        </div>
      )}
      {status && (
        <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-2 border-[#161D27] rounded-full ${status === 'online' ? 'bg-green-500' : 'bg-slate-500'}`}></span>
      )}
    </div>
  );
}
