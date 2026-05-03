import React from 'react';
import { useTasks } from '../hooks/useTasks';
import { KanbanColumn } from '../components/task/KanbanColumn';

function Tasks() {
  const { getTasksByStatus } = useTasks();

  return (
    <>
      {/* Header handled by Topbar, but Topbar for Tasks had a sub-header, we can inject it or leave it in page */}
      <div className="mb-lg flex justify-between items-center bg-surface-container-lowest p-2 rounded-lg border border-surface-container-high">
        <div className="flex gap-2">
          <button className="px-md py-1 bg-surface-container-high text-primary font-semibold rounded shadow-sm text-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">view_kanban</span>
            Board
          </button>
          <button className="px-md py-1 text-slate-400 hover:text-slate-200 font-medium text-sm flex items-center gap-2 transition-colors">
            <span className="material-symbols-outlined text-[18px]">table_rows</span>
            Table
          </button>
        </div>
      </div>

      {/* Kanban View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-xl items-start">
        <KanbanColumn 
          title="To Do" 
          count={getTasksByStatus('todo').length} 
          tasks={getTasksByStatus('todo')} 
        />
        <KanbanColumn 
          title="In Progress" 
          count={getTasksByStatus('in_progress').length} 
          tasks={getTasksByStatus('in_progress')} 
          badgeColor="bg-amber-500 text-slate-900"
        />
        <KanbanColumn 
          title="Done" 
          count={getTasksByStatus('done').length} 
          tasks={getTasksByStatus('done')} 
        />
      </div>
    </>
  );
}

export default Tasks;
