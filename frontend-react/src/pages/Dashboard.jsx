import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

function Dashboard() {
  return (
    <>
      {/* Welcome Row */}
      <div className="mb-lg flex justify-between items-end">
        <div>
          <h2 className="font-h1 text-h1 text-on-surface">Engineering Dashboard</h2>
          <p className="font-body-sm text-body-sm text-slate-400">Real-time performance metrics and task tracking</p>
        </div>
        <div className="flex gap-sm">
          <Button variant="secondary">Export CSV</Button>
          <Button variant="primary" icon="add">New Task</Button>
        </div>
      </div>
      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-md mb-lg">
        <Card className="flex flex-col justify-between h-24">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Total Tasks</span>
            <span className="material-symbols-outlined text-slate-500">list_alt</span>
          </div>
          <div className="text-h2 font-h2 text-on-surface">1,284</div>
        </Card>
        <Card className="flex flex-col justify-between h-24">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Completed</span>
            <span className="material-symbols-outlined text-green-500">check_circle</span>
          </div>
          <div className="text-h2 font-h2 text-on-surface">942</div>
        </Card>
        <Card className="flex flex-col justify-between h-24">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Overdue</span>
            <span className="material-symbols-outlined text-error">warning</span>
          </div>
          <div className="text-h2 font-h2 text-error">12</div>
        </Card>
        <Card className="flex flex-col justify-between h-24">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Active Projects</span>
            <span className="material-symbols-outlined text-amber-500">bolt</span>
          </div>
          <div className="text-h2 font-h2 text-on-surface">8</div>
        </Card>
      </div>
      {/* Main Workspace Layout */}
      <div className="grid grid-cols-12 gap-lg">
        {/* Left: Project Progress & Activity */}
        <div className="col-span-8 flex flex-col gap-lg">
          {/* Progress Section */}
          <section className="bg-[#161D27] border border-[#2A3441] rounded">
            <div className="p-md border-b border-[#2A3441] flex justify-between items-center">
              <h3 className="font-h3 text-h3 text-on-surface">Project Health</h3>
              <button className="text-slate-400 hover:text-amber-500">
                <span className="material-symbols-outlined">more_horiz</span>
              </button>
            </div>
            <div className="p-md space-y-md">
              <div>
                <div className="flex justify-between mb-xs">
                  <span className="text-body-sm font-semibold">Core API Infrastructure</span>
                  <span className="text-body-sm text-slate-400">85%</span>
                </div>
                <div className="w-full bg-[#1B2430] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full w-[85%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-xs">
                  <span className="text-body-sm font-semibold">User Authentication Redesign</span>
                  <span className="text-body-sm text-slate-400">42%</span>
                </div>
                <div className="w-full bg-[#1B2430] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full w-[42%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-xs">
                  <span className="text-body-sm font-semibold">Database Migration v3</span>
                  <span className="text-body-sm text-slate-400">67%</span>
                </div>
                <div className="w-full bg-[#1B2430] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full w-[67%]"></div>
                </div>
              </div>
            </div>
          </section>
          {/* Activity Line Chart Placeholder */}
          <section className="bg-[#161D27] border border-[#2A3441] rounded flex-1 min-h-[300px] flex flex-col">
            <div className="p-md border-b border-[#2A3441] flex justify-between items-center">
              <h3 className="font-h3 text-h3 text-on-surface">Submission Activity</h3>
              <div className="flex gap-sm">
                <span className="flex items-center gap-xs text-[10px] uppercase font-bold text-slate-500">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span> Current
                </span>
                <span className="flex items-center gap-xs text-[10px] uppercase font-bold text-slate-500">
                  <span className="w-2 h-2 rounded-full bg-slate-600"></span> Previous
                </span>
              </div>
            </div>
            <div className="flex-1 p-md flex items-end relative overflow-hidden">
              <div className="absolute inset-0 p-md flex items-end gap-2 opacity-50">
                <div className="flex-1 bg-[#1B2430] h-[30%]"></div>
                <div className="flex-1 bg-[#1B2430] h-[45%]"></div>
                <div className="flex-1 bg-[#1B2430] h-[35%]"></div>
                <div className="flex-1 bg-[#1B2430] h-[60%]"></div>
                <div className="flex-1 bg-[#1B2430] h-[55%]"></div>
                <div className="flex-1 bg-[#1B2430] h-[80%]"></div>
                <div className="flex-1 bg-[#1B2430] h-[70%]"></div>
              </div>
              <svg className="w-full h-full relative z-10" preserveAspectRatio="none" viewBox="0 0 400 100">
                <path d="M0,80 Q50,40 100,60 T200,30 T300,50 T400,20" fill="none" stroke="#EAB308" strokeWidth="2" vectorEffect="non-scaling-stroke"></path>
                <path d="M0,90 Q50,70 100,80 T200,60 T300,75 T400,55" fill="none" stroke="#2A3441" strokeWidth="2" vectorEffect="non-scaling-stroke"></path>
              </svg>
            </div>
            <div className="p-md pt-0 flex justify-between text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </section>
        </div>
        {/* Right: Smart Insights Panel */}
        <aside className="col-span-4 flex flex-col gap-lg">
          <section className="bg-[#1B2430] border border-amber-500/20 rounded shadow-2xl">
            <div className="p-md border-b border-[#2A3441] flex items-center gap-sm">
              <span className="material-symbols-outlined text-amber-500">psychology</span>
              <h3 className="font-h3 text-h3 text-amber-500">Smart Insights</h3>
            </div>
            <div className="p-md space-y-md">
              <div className="bg-error-container/10 border-l-2 border-error p-md rounded-r">
                <div className="flex justify-between mb-xs">
                  <span className="text-label-caps font-label-caps text-error">Critical Overdue</span>
                  <span className="text-xs text-error font-mono font-bold">24h</span>
                </div>
                <p className="text-body-sm font-semibold mb-xs">Refactor Legacy Auth module</p>
                <p className="text-[11px] text-slate-400">Assigned to: @m_jackson</p>
              </div>
              <div className="bg-error-container/10 border-l-2 border-error p-md rounded-r">
                <div className="flex justify-between mb-xs">
                  <span className="text-label-caps font-label-caps text-error">Critical Overdue</span>
                  <span className="text-xs text-error font-mono font-bold">48h</span>
                </div>
                <p className="text-body-sm font-semibold mb-xs">Patch CVE-2023-4512 Security Flaw</p>
                <p className="text-[11px] text-slate-400">Assigned to: @k_lee</p>
              </div>
              <div className="bg-error-container/10 border-l-2 border-error p-md rounded-r">
                <div className="flex justify-between mb-xs">
                  <span className="text-label-caps font-label-caps text-error">Critical Overdue</span>
                  <span className="text-xs text-error font-mono font-bold">3d</span>
                </div>
                <p className="text-body-sm font-semibold mb-xs">Finalize Kubernetes Helm charts</p>
                <p className="text-[11px] text-slate-400">Assigned to: @s_chen</p>
              </div>
            </div>
            <div className="p-md bg-[#161D27] mt-md border-t border-[#2A3441] rounded-b">
              <p className="text-[11px] text-slate-500 italic">"Focus on security patches to maintain PCI compliance SLAs."</p>
            </div>
          </section>
          <section className="bg-[#161D27] border border-[#2A3441] rounded overflow-hidden">
            <div className="p-md border-b border-[#2A3441]">
              <h3 className="font-h3 text-h3 text-on-surface">Team Availability</h3>
            </div>
            <div className="divide-y divide-[#2A3441]">
              <div className="p-md flex items-center justify-between hover:bg-[#1B2430] transition-colors">
                <div className="flex items-center gap-sm">
                  <div className="relative">
                    <img alt="Team Member" className="w-8 h-8 rounded-full border border-[#2A3441]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0Y37k6VUE5jR2K76DrH1eXGGvqDm7B5Lc9s_eXqvbpp7TtffXeS6B_lLrnq-h99_nj255I7j3qZe7nrQTGU0eFNv8KsptBbI7TCDwLvyhMdTVxLqEt_wciC3XYkM9MPyltmdxwUMsjnzlXjzZVTmN9yMdG9PpRaWtHhX_wTHt27skXddzxIR9m4XHWmPsSj-0OluP7iuMWVi7T9zi5mN4iQL8kCRlpZiIjlj9V9D9HfGHHHBNCjCdfWOYUf5ZjO8eGZDYIFLgCw" />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#161D27] rounded-full"></span>
                  </div>
                  <span className="text-body-sm font-medium">Marcus J.</span>
                </div>
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Active</span>
              </div>
              <div className="p-md flex items-center justify-between hover:bg-[#1B2430] transition-colors">
                <div className="flex items-center gap-sm">
                  <div className="relative">
                    <img alt="Team Member" className="w-8 h-8 rounded-full border border-[#2A3441]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0zaukvnKbJvU7UMDagFmUc09SPAH_OKmnSTxvVctTxXjw9_4q5oK-TuQIfzwRx7v83FuJOgNiGqg6quQVFRA-Oxo5-qT5kKU7dOfjJh_J0wSVX80qrhJR1lEY3GyI1-CuYNs8nokJDfF3n6JajZQLXxxQuTxSbz-xSxDA9nHafAYJmOmf4CRIiBR6gM23Xq2Wj0rmjeyCnFtpdmIjSOTnBDAxLFiWtYZ8XkBU2xA--4S2l9Qk-gQPmbxCXRx_JkLWMHsHNraP2w" />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-slate-500 border-2 border-[#161D27] rounded-full"></span>
                  </div>
                  <span className="text-body-sm font-medium">Sarah C.</span>
                </div>
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Offline</span>
              </div>
            </div>
          </section>
        </aside>
      </div>
      
      {/* Contextual FAB */}
      <button className="fixed bottom-lg right-lg w-12 h-12 bg-amber-500 rounded shadow-xl flex items-center justify-center text-background hover:scale-105 active:scale-95 transition-all z-50">
        <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
      </button>
    </>
  );
}
export default Dashboard;
