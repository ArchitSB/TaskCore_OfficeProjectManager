import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export function AppLayout({ title }) {
  return (
    <div className="flex min-h-screen w-full font-body-base text-on-surface bg-background">
      <Sidebar />
      <main className="flex-1 ml-60 flex flex-col min-h-screen">
        <Topbar title={title} />
        <div className="p-lg flex-1 overflow-y-auto custom-scrollbar">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
