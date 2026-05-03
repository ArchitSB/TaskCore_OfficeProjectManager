import React from 'react';
import { TaskCard } from './TaskCard';

export function KanbanColumn({ title, count, tasks, badgeColor = "bg-slate-800 text-slate-400" }) {
  return (
    <div className={`space-y-lg ${title === 'Done' ? 'opacity-80' : ''}`}>
      <div className="flex items-center justify-between px-xs">
        <div className="flex items-center gap-sm">
          <h3 className="font-h3 text-h3 text-slate-100">{title}</h3>
          <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${badgeColor}`}>
            {count}
          </span>
        </div>
        <button className="p-1 text-slate-500 hover:text-slate-100 transition-colors">
          <span className="material-symbols-outlined">more_horiz</span>
        </button>
      </div>
      <div className="space-y-md">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
