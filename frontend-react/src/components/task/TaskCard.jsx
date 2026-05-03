import React from 'react';

export function TaskCard({ task }) {
  const isCritical = task.priority === 'critical';
  const isHigh = task.priority === 'high';
  
  return (
    <div className="bg-[#121821] border border-[#2A3441] p-lg hover:bg-[#161D27] transition-all duration-200 group relative rounded">
      {task.active && (
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-amber-500 rounded-l"></div>
      )}
      <div className="flex justify-between items-start mb-sm">
        <span className={`px-2 py-1 text-[10px] font-black uppercase tracking-tighter rounded ${
          isCritical ? 'bg-red-900/30 text-red-400' :
          isHigh ? 'bg-amber-900/30 text-amber-500' :
          'bg-slate-800 text-slate-400'
        }`}>
          {task.priority}
        </span>
        <span className="text-slate-500 text-[11px] font-mono">{task.id}</span>
      </div>
      <h4 className={`font-semibold mb-md leading-tight group-hover:text-amber-500 transition-colors ${task.status === 'done' ? 'text-slate-500 line-through' : 'text-slate-100'}`}>
        {task.title}
      </h4>
      
      {task.progress !== undefined && (
        <div className="mb-md h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-amber-500" style={{ width: `${task.progress}%` }}></div>
        </div>
      )}

      <div className="flex items-center justify-between mt-lg pt-md border-t border-slate-800/50">
        <div className="flex items-center gap-2">
          {task.avatar ? (
            <img alt="Dev" className="w-6 h-6 rounded-full object-cover" src={task.avatar} />
          ) : (
            <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-300">
              {task.assignee}
            </div>
          )}
          {task.date && <span className="text-xs text-slate-500">{task.date}</span>}
        </div>
        
        <div className="flex items-center gap-2 text-slate-500">
          {task.comments && (
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">chat_bubble</span>
              <span className="text-[10px] font-bold">{task.comments}</span>
            </div>
          )}
          {task.status === 'done' && (
            <span className="material-symbols-outlined text-amber-500 text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
          )}
          {task.status !== 'done' && !task.comments && (
             <span className="material-symbols-outlined text-[18px]">link</span>
          )}
        </div>
      </div>
    </div>
  );
}
