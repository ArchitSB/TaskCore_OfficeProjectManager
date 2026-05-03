import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../ui/Input';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';

export function Topbar({ title }) {
  const { user } = useAuth();

  return (
    <header className="w-full h-14 bg-[#121821] border-b border-[#2A3441] flex items-center justify-between px-lg sticky top-0 z-40">
      <div className="flex items-center gap-xl">
        <h1 className="text-lg font-bold tracking-tighter text-amber-500 font-inter antialiased">{title || 'TaskCore'}</h1>
        <div className="hidden md:block w-64">
          <Input icon="search" placeholder="Quick search tasks..." />
        </div>
      </div>
      <div className="flex items-center gap-md">
        <Button variant="icon" icon="notifications" />
        <Button variant="icon" icon="settings" />
        <div className="w-px h-6 bg-[#2A3441]"></div>
        <div className="flex items-center gap-sm">
          <Avatar
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBe8K8CSv13OmN-1_fxVqLAke7MHByVgpj3NgMaaIsAnPWYuNtPXTGPHwVGM8Z9Pb0DEyiB3Sd7I2feKcUjl47Ethl1Q307sHM0hKfmf_IAbk0jDfUOCr2Km_PBgON1qL4z-eqxbAK3a5j5IbT0BIuddBCdriKMqwP0ebAn2b81iPwEmExzkm9IUIooyh_z4DIl68bHS9REqJJDG2-ZXGbaCXVHhBzQG6wGr-IgTwMOcjBwLHKHXs7eFEENb6lf1W75FchmiFr5Yw"
            alt="Profile Avatar"
          />
          <span className="font-body-sm text-xs font-semibold">{user?.name || 'User'}</span>
        </div>
      </div>
    </header>
  );
}
