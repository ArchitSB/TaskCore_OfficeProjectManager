import React from 'react';

export function Card({ children, className = '', noPadding = false }) {
  return (
    <div className={`bg-[#161D27] border border-[#2A3441] rounded ${noPadding ? '' : 'p-md'} ${className}`}>
      {children}
    </div>
  );
}
