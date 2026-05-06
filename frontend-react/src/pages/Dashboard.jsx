import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { getDashboardRequest } from '../api/dashboard.api';
import { getApiErrorMessage } from '../utils/error';
import { ROUTES } from '../utils/constants';

const EMPTY_DASHBOARD = {
  stats: {
    totalTasks: 0,
    completed: 0,
    overdue: 0,
    activeProjects: 0,
  },
  activity: [],
  insights: [],
};

function Dashboard() {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(EMPTY_DASHBOARD);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await getDashboardRequest();
        setDashboardData({
          stats: response.stats || EMPTY_DASHBOARD.stats,
          activity: response.activity || [],
          insights: response.insights || [],
        });
      } catch (apiError) {
        setError(getApiErrorMessage(apiError, 'Unable to load dashboard data'));
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const chartHeights = useMemo(() => {
    const maxCreated = Math.max(1, ...dashboardData.activity.map((item) => item.created || 0));

    return dashboardData.activity.map((item) => ({
      ...item,
      height: `${Math.max(8, Math.round(((item.created || 0) / maxCreated) * 100))}%`,
    }));
  }, [dashboardData.activity]);

  const handleExportCSV = () => {
    const csvContent = [
      ['Metric', 'Value'],
      ['Total Tasks', dashboardData.stats.totalTasks],
      ['Completed Tasks', dashboardData.stats.completed],
      ['Overdue Tasks', dashboardData.stats.overdue],
      ['Active Projects', dashboardData.stats.activeProjects]
    ].map(e => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'dashboard-data.csv');
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="mb-lg flex justify-between items-end">
        <div>
          <h2 className="font-h1 text-h1 text-on-surface">Engineering Dashboard</h2>
          <p className="font-body-sm text-body-sm text-slate-400">Real-time performance metrics and task tracking</p>
        </div>
        <div className="flex gap-sm">
          <Button variant="secondary" onClick={handleExportCSV}>Export CSV</Button>
          <Button variant="primary" icon="add" onClick={() => navigate(ROUTES.TASKS, { state: { openNewTaskModal: true } })}>New Task</Button>
        </div>
      </div>

      {error && (
        <div className="mb-md rounded border border-red-500/40 bg-red-900/20 text-red-300 text-sm px-md py-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-4 gap-md mb-lg">
        <Card className="flex flex-col justify-between h-24">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Total Tasks</span>
            <span className="material-symbols-outlined text-slate-500">list_alt</span>
          </div>
          <div className="text-h2 font-h2 text-on-surface">{loading ? '...' : dashboardData.stats.totalTasks}</div>
        </Card>
        <Card className="flex flex-col justify-between h-24">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Completed</span>
            <span className="material-symbols-outlined text-green-500">check_circle</span>
          </div>
          <div className="text-h2 font-h2 text-on-surface">{loading ? '...' : dashboardData.stats.completed}</div>
        </Card>
        <Card className="flex flex-col justify-between h-24">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Overdue</span>
            <span className="material-symbols-outlined text-error">warning</span>
          </div>
          <div className="text-h2 font-h2 text-error">{loading ? '...' : dashboardData.stats.overdue}</div>
        </Card>
        <Card className="flex flex-col justify-between h-24">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Active Projects</span>
            <span className="material-symbols-outlined text-amber-500">bolt</span>
          </div>
          <div className="text-h2 font-h2 text-on-surface">{loading ? '...' : dashboardData.stats.activeProjects}</div>
        </Card>
      </div>

      <div className="grid grid-cols-12 gap-lg">
        <div className="col-span-8 flex flex-col gap-lg">
          <section className="bg-[#161D27] border border-[#2A3441] rounded min-h-[300px] flex flex-col">
            <div className="p-md border-b border-[#2A3441] flex justify-between items-center">
              <h3 className="font-h3 text-h3 text-on-surface">Submission Activity</h3>
            </div>
            <div className="flex-1 p-md flex items-end gap-2 h-full min-h-[200px]">
              {chartHeights.length === 0 && !loading && (
                <div className="text-slate-500 text-sm w-full text-center pb-8">No activity yet.</div>
              )}
              {chartHeights.map((item) => (
                <div key={item.date} className="flex-1 flex flex-col justify-end h-full">
                  <div className="bg-amber-500/80 rounded-t w-full transition-all duration-500" style={{ height: item.height }}></div>
                </div>
              ))}
            </div>
            <div className="p-md pt-0 flex justify-between text-[10px] text-slate-500 font-bold uppercase tracking-tighter gap-2 overflow-x-auto">
              {dashboardData.activity.map((item) => (
                <span key={item.date}>{new Date(item.date).toLocaleDateString(undefined, { weekday: 'short' })}</span>
              ))}
            </div>
          </section>
        </div>

        <aside className="col-span-4 flex flex-col gap-lg">
          <section className="bg-[#1B2430] border border-amber-500/20 rounded shadow-2xl">
            <div className="p-md border-b border-[#2A3441] flex items-center gap-sm">
              <span className="material-symbols-outlined text-amber-500">psychology</span>
              <h3 className="font-h3 text-h3 text-amber-500">Smart Insights</h3>
            </div>
            <div className="p-md space-y-md">
              {dashboardData.insights.length === 0 && !loading && (
                <div className="text-slate-400 text-sm">No insights available.</div>
              )}

              {dashboardData.insights.map((insight) => (
                <div key={insight.type} className="bg-error-container/10 border-l-2 border-error p-md rounded-r">
                  <div className="flex justify-between mb-xs">
                    <span className="text-label-caps font-label-caps text-error uppercase">{insight.type.replace('_', ' ')}</span>
                    <span className="text-xs text-error font-mono font-bold">{insight.count}</span>
                  </div>
                  <p className="text-body-sm font-semibold mb-xs">{insight.message}</p>
                  {Array.isArray(insight.tasks) && insight.tasks.length > 0 && (
                    <p className="text-[11px] text-slate-400">Top: {insight.tasks[0].title}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </>
  );
}

export default Dashboard;
