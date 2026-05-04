import { useEffect, useRef } from 'react';

export function ProfileModal({ isOpen, onClose, user }) {
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

  if (!isOpen || !user) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-md"
      onMouseDown={(event) => {
        if (event.target === overlayRef.current) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-sm rounded-xl border border-[#2A3441] bg-[#121821] p-lg shadow-2xl">
        <div className="flex items-center justify-between mb-xl">
          <h2 className="text-lg font-bold text-slate-100">User Profile</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-slate-100 hover:bg-[#1B2430]"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="space-y-md">
          {user.avatar && (
            <div className="flex justify-center mb-lg">
              <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full border-4 border-[#2A3441] object-cover" />
            </div>
          )}

          <div>
            <label className="block text-[10px] uppercase tracking-wider text-slate-500 mb-1">Name</label>
            <div className="w-full bg-[#0F1722] border border-[#2A3441] rounded px-md py-sm text-slate-100 font-medium">
              {user.name}
            </div>
          </div>
          
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-slate-500 mb-1">Email</label>
            <div className="w-full bg-[#0F1722] border border-[#2A3441] rounded px-md py-sm text-slate-100 font-medium">
              {user.email || `${user.name.toLowerCase().replace(' ', '.')}@demo.com`}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-md">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-slate-500 mb-1">Role</label>
              <div className="w-full bg-[#0F1722] border border-[#2A3441] rounded px-md py-sm text-amber-500 font-mono text-sm uppercase">
                {user.role}
              </div>
            </div>
            {user.status && (
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-slate-500 mb-1">Status</label>
                <div className="w-full bg-[#0F1722] border border-[#2A3441] rounded px-md py-sm flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-slate-500'}`}></span>
                  <span className="text-slate-100 font-medium text-sm">{user.status}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-lg">
          <button
            type="button"
            onClick={onClose}
            className="px-md py-sm rounded bg-[#1B2430] border border-[#2A3441] text-slate-200 hover:text-slate-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
