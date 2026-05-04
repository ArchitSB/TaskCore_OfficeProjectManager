import React, { useEffect, useRef, useState } from 'react';

export function SettingsModal({ isOpen, onClose, user }) {
  const overlayRef = useRef(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    newPassword: '',
    confirmPassword: '',
    theme: localStorage.getItem('theme') || 'dark'
  });
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    if (user) {
      setForm(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || ''
      }));
    }
  }, [user]);

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox' && name === 'theme') {
      const newTheme = checked ? 'light' : 'dark';
      setForm(prev => ({ ...prev, theme: newTheme }));
      localStorage.setItem('theme', newTheme);
      document.body.classList.remove('dark-theme', 'light-theme');
      document.body.classList.add(`${newTheme}-theme`);
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (form.newPassword || form.confirmPassword) {
      setToastMessage('Password update coming soon');
      setTimeout(() => setToastMessage(''), 3000);
      return;
    }
    // UI only - no backend calls for now
    onClose();
  };

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
      <div className="relative w-full max-w-lg rounded-xl border border-[#2A3441] bg-[#121821] p-lg shadow-2xl transition-transform duration-200 transform scale-100">
        
        {toastMessage && (
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-amber-500 text-slate-900 px-4 py-2 rounded shadow-lg font-medium text-sm transition-opacity duration-300">
            {toastMessage}
          </div>
        )}

        <div className="flex items-center justify-between mb-xl">
          <h2 className="text-lg font-bold text-slate-100">Settings</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-slate-100 hover:bg-[#1B2430] transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-xl max-h-[70vh] overflow-y-auto custom-scrollbar pr-2">
          {/* Profile Settings */}
          <div className="space-y-md">
            <h3 className="text-sm font-semibold text-amber-500 uppercase tracking-widest border-b border-[#2A3441] pb-2">Profile</h3>
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1" htmlFor="settings-name">Name</label>
              <input
                id="settings-name"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full bg-[#0F1722] border border-[#2A3441] rounded px-md py-sm text-slate-100 focus:outline-none focus:border-amber-500 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1" htmlFor="settings-email">Email</label>
              <input
                id="settings-email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-[#0F1722] border border-[#2A3441] rounded px-md py-sm text-slate-100 focus:outline-none focus:border-amber-500 transition-colors"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-md">
            <h3 className="text-sm font-semibold text-amber-500 uppercase tracking-widest border-b border-[#2A3441] pb-2">Password</h3>
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1" htmlFor="settings-new-password">New Password</label>
              <input
                id="settings-new-password"
                type="password"
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                className="w-full bg-[#0F1722] border border-[#2A3441] rounded px-md py-sm text-slate-100 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1" htmlFor="settings-confirm-password">Confirm Password</label>
              <input
                id="settings-confirm-password"
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full bg-[#0F1722] border border-[#2A3441] rounded px-md py-sm text-slate-100 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
          </div>

          {/* Theme */}
          <div className="space-y-md">
            <h3 className="text-sm font-semibold text-amber-500 uppercase tracking-widest border-b border-[#2A3441] pb-2">Appearance</h3>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-200" htmlFor="settings-theme">Light Theme</label>
              <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                <input
                  type="checkbox"
                  name="theme"
                  id="settings-theme"
                  checked={form.theme === 'light'}
                  onChange={handleChange}
                  className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 border-slate-600 appearance-none cursor-pointer transition-transform duration-200"
                  style={{ transform: form.theme === 'light' ? 'translateX(100%)' : 'translateX(0)' }}
                />
                <label
                  htmlFor="settings-theme"
                  className={`toggle-label block overflow-hidden h-5 rounded-full cursor-pointer transition-colors duration-200 ${form.theme === 'light' ? 'bg-amber-500' : 'bg-slate-600'}`}
                ></label>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-sm pt-xl border-t border-[#2A3441]">
            <button
              type="button"
              onClick={onClose}
              className="px-md py-sm rounded border border-[#2A3441] text-slate-200 hover:bg-[#1B2430] transition-colors"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-md py-sm rounded bg-amber-500 text-slate-900 font-semibold hover:bg-amber-400 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
