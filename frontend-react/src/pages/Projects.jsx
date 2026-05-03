import React, { useEffect, useMemo, useState } from 'react';
import { ProjectCard } from '../components/project/ProjectCard';
import { Button } from '../components/ui/Button';
import {
  addProjectMemberRequest,
  createProjectRequest,
  getProjectsRequest,
} from '../api/projects.api';
import { getApiErrorMessage } from '../utils/error';
import { useAuth } from '../context/AuthContext';

const toProjectCardView = (project) => {
  const members = Array.isArray(project.members) ? project.members : [];

  return {
    id: project._id,
    title: project.name,
    status: 'In Flight',
    description: project.description || 'No description provided.',
    progress: 0,
    team: members.length
      ? members.map((member) => ({
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name || 'User')}&background=0f172a&color=f59e0b`,
        }))
      : [{ avatar: 'https://ui-avatars.com/api/?name=Team&background=1f2937&color=f59e0b' }],
  };
};

function Projects() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const isAdmin = user?.role === 'admin';

  const loadProjects = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await getProjectsRequest();
      setProjects(response.data || []);
    } catch (apiError) {
      setError(getApiErrorMessage(apiError, 'Unable to load projects'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleCreateProject = async () => {
    const name = window.prompt('Project name:');
    if (!name) return;

    const description = window.prompt('Project description:') || '';

    try {
      await createProjectRequest({ name, description });
      await loadProjects();
    } catch (apiError) {
      setError(getApiErrorMessage(apiError, 'Unable to create project'));
    }
  };

  const handleAddMember = async () => {
    const projectId = window.prompt('Project ID:');
    if (!projectId) return;

    const userId = window.prompt('User ID to add:');
    if (!userId) return;

    try {
      await addProjectMemberRequest(projectId, userId);
      await loadProjects();
    } catch (apiError) {
      setError(getApiErrorMessage(apiError, 'Unable to add member to project'));
    }
  };

  const projectCards = useMemo(() => projects.map(toProjectCardView), [projects]);

  return (
    <>
      <header className="mb-xl flex items-end justify-between gap-sm">
        <div>
          <h1 className="font-h1 text-h1 text-on-surface mb-xs">Projects Archive</h1>
          <p className="font-body-sm text-body-sm text-on-secondary-container">Manage ongoing initiatives and team resources.</p>
        </div>
        <div className="flex items-center gap-sm">
          {isAdmin && (
            <Button type="button" variant="secondary" onClick={handleAddMember}>
              Add Member
            </Button>
          )}
          <Button type="button" variant="primary" icon="add" onClick={handleCreateProject} disabled={!isAdmin}>
            New Project
          </Button>
        </div>
      </header>

      {error && (
        <div className="mb-md rounded border border-red-500/40 bg-red-900/20 text-red-300 text-sm px-md py-sm">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-slate-400 text-sm">Loading projects...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
          {projectCards.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </>
  );
}

export default Projects;
