import React from 'react';

export function Card({ children, className = '', noPadding = false, ...props }) {
  return (
    <div className={`bg-[#161D27] border border-[#2A3441] rounded ${noPadding ? '' : 'p-md'} ${className}`} {...props}>
      {children}
    </div>
  );
}
