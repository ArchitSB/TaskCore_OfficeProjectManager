import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../utils/constants';
import { Input } from '../ui/Input';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { ProfileModal } from '../auth/ProfileModal';
import { SettingsModal } from '../auth/SettingsModal';

export function Topbar({ title }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const dropdownRef = useRef(null);
  const notificationsRef = useRef(null);

  useEffect(() => {
    if (!isDropdownOpen && !isNotificationsOpen) return undefined;

    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isDropdownOpen, isNotificationsOpen]);

  const handleLogout = () => {
    logout();
    navigate(ROUTES.SIGN_IN, { replace: true });
  };

  const MOCK_NOTIFICATIONS = [
    { id: 1, message: '5 tasks are overdue', time: '2h ago', icon: 'warning', color: 'text-error' },
    { id: 2, message: '3 high priority tasks need attention', time: '4h ago', icon: 'priority_high', color: 'text-amber-500' },
    { id: 3, message: 'Project deadline approaching', time: '1d ago', icon: 'schedule', color: 'text-blue-400' },
  ];

  return (
    <header className="w-full h-14 bg-[#121821] border-b border-[#2A3441] flex items-center justify-between px-lg sticky top-0 z-40">
      <div className="flex items-center gap-xl">
        <h1 className="text-lg font-bold tracking-tighter text-amber-500 font-inter antialiased">{title || 'TaskCore'}</h1>
        <div className="hidden md:block w-64">
          <Input icon="search" placeholder="Quick search tasks..." />
        </div>
      </div>
      <div className="flex items-center gap-md relative">
        <div className="relative" ref={notificationsRef}>
          <Button 
            variant="icon" 
            icon="notifications" 
            onClick={() => {
              setIsNotificationsOpen(!isNotificationsOpen);
              if (isDropdownOpen) setIsDropdownOpen(false);
            }} 
          />
          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-md shadow-2xl bg-[#161D27] ring-1 ring-black ring-opacity-5 border border-[#2A3441] z-50 origin-top-right transition-all duration-200">
              <div className="px-4 py-3 border-b border-[#2A3441] flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-100">Notifications</h3>
                <span className="text-[10px] text-amber-500 uppercase tracking-widest font-bold cursor-pointer">Mark all read</span>
              </div>
              <div className="max-h-80 overflow-y-auto custom-scrollbar">
                {MOCK_NOTIFICATIONS.map((note) => (
                  <div key={note.id} className="px-4 py-3 border-b border-[#2A3441] hover:bg-[#1B2430] cursor-pointer transition-colors flex items-start gap-3">
                    <span className={`material-symbols-outlined text-[18px] mt-0.5 ${note.color}`}>{note.icon}</span>
                    <div className="flex flex-col flex-1">
                      <span className="text-sm text-slate-200 font-medium leading-snug">{note.message}</span>
                      <span className="text-xs text-slate-500 mt-1">{note.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 text-center">
                <button type="button" className="text-xs text-slate-400 hover:text-amber-500 transition-colors w-full p-1">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>
        
        <Button variant="icon" icon="settings" onClick={() => setIsSettingsModalOpen(true)} />
        <div className="w-px h-6 bg-[#2A3441]"></div>
        
        <div className="relative" ref={dropdownRef}>
          <div 
            className="flex items-center gap-sm cursor-pointer hover:bg-[#1B2430] p-1 pr-3 rounded transition-colors"
            onClick={() => {
              setIsDropdownOpen(!isDropdownOpen);
              if (isNotificationsOpen) setIsNotificationsOpen(false);
            }}
          >
            <Avatar
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBe8K8CSv13OmN-1_fxVqLAke7MHByVgpj3NgMaaIsAnPWYuNtPXTGPHwVGM8Z9Pb0DEyiB3Sd7I2feKcUjl47Ethl1Q307sHM0hKfmf_IAbk0jDfUOCr2Km_PBgON1qL4z-eqxbAK3a5j5IbT0BIuddBCdriKMqwP0ebAn2b81iPwEmExzkm9IUIooyh_z4DIl68bHS9REqJJDG2-ZXGbaCXVHhBzQG6wGr-IgTwMOcjBwLHKHXs7eFEENb6lf1W75FchmiFr5Yw"
              alt="Profile Avatar"
            />
            <span className="font-body-sm text-xs font-semibold">{user?.name || 'User'}</span>
          </div>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[#161D27] ring-1 ring-black ring-opacity-5 border border-[#2A3441] py-1 z-50">
              <button
                type="button"
                className="w-full text-left px-4 py-2 text-sm text-slate-200 hover:bg-[#1B2430] hover:text-amber-500 transition-colors flex items-center gap-2"
                onClick={() => {
                  setIsDropdownOpen(false);
                  setIsProfileModalOpen(true);
                }}
              >
                <span className="material-symbols-outlined text-[18px]">person</span>
                View Profile
              </button>
              <button
                type="button"
                className="w-full text-left px-4 py-2 text-sm text-slate-200 hover:bg-[#1B2430] hover:text-amber-500 transition-colors flex items-center gap-2"
                onClick={handleLogout}
              >
                <span className="material-symbols-outlined text-[18px]">logout</span>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <ProfileModal 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)} 
        user={user} 
      />
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        user={user}
      />
    </header>
  );
}
