import React, { useEffect, useRef } from 'react';

export function NotificationsModal({ isOpen, onClose, notifications }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-md transition-opacity duration-200"
      onMouseDown={(event) => {
        if (event.target === overlayRef.current) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-lg rounded-xl border border-[#2A3441] bg-[#121821] p-lg shadow-2xl transition-transform duration-200 transform scale-100 flex flex-col max-h-[80vh]">
        <div className="flex items-center justify-between mb-xl">
          <h2 className="text-lg font-bold text-slate-100">All Notifications</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-slate-100 hover:bg-[#1B2430] transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="overflow-y-auto custom-scrollbar flex-1 pr-2 -mr-2">
          {notifications.map((note) => (
            <div 
              key={note.id} 
              className={`px-4 py-4 border-b border-[#2A3441] last:border-b-0 flex items-start gap-4 transition-colors ${note.read ? 'opacity-60 bg-[#161D27]' : 'bg-[#121821] hover:bg-[#1B2430]'}`}
            >
              <div className="flex-shrink-0 mt-1">
                <span className={`material-symbols-outlined text-[20px] ${note.color}`}>{note.icon}</span>
              </div>
              <div className="flex flex-col flex-1">
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-sm font-medium leading-snug ${note.read ? 'text-slate-400' : 'text-slate-100'}`}>
                    {note.message}
                  </span>
                  {!note.read && <span className="w-2 h-2 rounded-full bg-amber-500 mt-1 flex-shrink-0"></span>}
                </div>
                <span className="text-xs text-slate-500">{note.time}</span>
              </div>
            </div>
          ))}
          {notifications.length === 0 && (
            <div className="text-center py-8 text-slate-400">
              No notifications
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
