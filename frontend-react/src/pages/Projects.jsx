import React from 'react';
import { ProjectCard } from '../components/project/ProjectCard';
import { Button } from '../components/ui/Button';

// Dummy project data
const INITIAL_PROJECTS = [
  {
    id: 1,
    title: 'Neural Engine Core',
    status: 'In Flight',
    description: 'Optimizing inference pathways for low-latency edge deployments on mobile hardware.',
    progress: 72,
    team: [
      { avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7HvZZwKqdqu6QpuVgp4KPlRIQJj0jG7nP2SgxWZF0r_KEuuS1ZlL39GxTR8q3bz87JnxHz81tXdmce7AoEymOZ0jowbGdBzaPfZs39Koi6Pj9l3OARk7NwzbLhBAzgPjmYVCZfrhkFWZeF7zT3AMavTt3Whcx-ZVkeyX5aaSLq06dk_txNFbWBQkLmH4WRApLp7lmHMemZFLT-iBF1a2nt_CIwHOduMAFrWdc4K3Ilj5XaSsZpyKWNg0vMEMfyhTqm9cWLCWBcA' }
    ]
  },
  {
    id: 2,
    title: 'Data Visualizer v4',
    status: 'Paused',
    description: 'Complete overhaul of the telemetry dashboard with GPU-accelerated rendering.',
    progress: 34,
    team: [
      { avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGDhQg1Qwz2K1b4h3-PpF9ZRCnYdYKxEqz7m5aaJo3MuaV4cfeYNwgC_EfFN1f2-rHiUUyUFtKvIEPYmf9F-Vh-EhPmtvZytYWNqbMVHcKaOkXFE2fxtxt2uTdBEwXRUpnEF8tkBN61FdrCn3g_kcBWHIosggTLHcEwuTZtg2ZG1iK4-_ufkq8lC1SipoqF_ZixCgrTEOU1Z60mrBGzRwgphBJd5TLUZJPA_Vw9k5SUS5G8mF_YsK_N1Z01qZEbzablglpW8zFrw' }
    ]
  }
];

function Projects() {
  return (
    <>
      <header className="mb-xl flex items-end justify-between">
        <div>
          <h1 className="font-h1 text-h1 text-on-surface mb-xs">Projects Archive</h1>
          <p className="font-body-sm text-body-sm text-on-secondary-container">Manage ongoing initiatives and team resources.</p>
        </div>
        <Button variant="primary" icon="add">New Project</Button>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
        {INITIAL_PROJECTS.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>
  );
}

export default Projects;
