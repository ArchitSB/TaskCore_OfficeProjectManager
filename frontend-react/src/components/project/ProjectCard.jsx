import React from 'react';

export function ProjectCard({ project }) {
  return (
    <div className="bg-[#161D27] border border-[#2A3441] p-md rounded hover:bg-[#1B2430] transition-all duration-150 cursor-pointer group flex flex-col justify-between min-h-[220px]">
      <div>
        <div className="flex items-start justify-between mb-sm">
          <h3 className="font-h3 text-h3 text-on-surface">{project.title}</h3>
          <span className={`bg-[#2A3441] font-mono-label text-[10px] px-2 py-0.5 rounded uppercase tracking-wider ${project.status === 'Paused' ? 'text-slate-400' : 'text-amber-500'}`}>
            {project.status}
          </span>
        </div>
        <p className="font-body-sm text-body-sm text-on-secondary-container mb-lg line-clamp-2">
          {project.description}
        </p>
      </div>
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="font-label-caps text-on-secondary-container text-[10px]">PROGRESS</span>
          <span className={`font-mono-label text-[10px] ${project.status === 'Paused' ? 'text-slate-400' : 'text-amber-500'}`}>
            {project.progress}%
          </span>
        </div>
        <div className="w-full h-1 bg-[#2A3441] rounded-full overflow-hidden mb-lg">
          <div className={`h-full rounded-full ${project.status === 'Paused' ? 'bg-slate-400' : 'bg-amber-500'}`} style={{ width: `${project.progress}%` }}></div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {project.team.map((member, i) => (
              <img key={i} alt="Team Avatar" className="w-7 h-7 rounded-full border-2 border-[#161D27] group-hover:border-[#1B2430]" src={member.avatar} />
            ))}
          </div>
          <span className="material-symbols-outlined text-slate-400 group-hover:text-amber-500 transition-colors">arrow_forward_ios</span>
        </div>
      </div>
    </div>
  );
}
