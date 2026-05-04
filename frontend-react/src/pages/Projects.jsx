import React, { useEffect, useMemo, useState } from 'react';
import { ProjectCard } from '../components/project/ProjectCard';
import { ProjectModal } from '../components/project/ProjectModal';
import { Button } from '../components/ui/Button';
import {
  addProjectMemberRequest,
  createProjectRequest,
  getProjectsRequest,
} from '../api/projects.api';
import { getApiErrorMessage } from '../utils/error';
import { useAuth } from '../context/AuthContext';
import { isAdmin } from '../utils/permissions';

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

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [modalForm, setModalForm] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setModalForm((prev) => ({ ...prev, [name]: value }));
  };

  const openCreateProjectModal = () => {
    setModalForm({ name: '', description: '' });
    setIsProjectModalOpen(true);
  };

  const openAddMemberModal = () => {
    setModalForm({ projectId: '', userId: '' });
    setIsMemberModalOpen(true);
  };

  const submitProject = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      await createProjectRequest({ name: modalForm.name, description: modalForm.description || '' });
      await loadProjects();
      setIsProjectModalOpen(false);
    } catch (apiError) {
      setError(getApiErrorMessage(apiError, 'Unable to create project'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitMember = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      await addProjectMemberRequest(modalForm.projectId, modalForm.userId);
      await loadProjects();
      setIsMemberModalOpen(false);
    } catch (apiError) {
      setError(getApiErrorMessage(apiError, 'Unable to add member to project'));
    } finally {
      setIsSubmitting(false);
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
          {isAdmin(user) && (
            <>
              <Button type="button" variant="secondary" onClick={openAddMemberModal}>
                Add Member
              </Button>
              <Button type="button" variant="primary" icon="add" onClick={openCreateProjectModal}>
                New Project
              </Button>
            </>
          )}
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

      <ProjectModal
        isOpen={isProjectModalOpen}
        title="New Project"
        fields={[
          { name: 'name', label: 'Project Name', type: 'text', required: true },
          { name: 'description', label: 'Description', type: 'textarea' },
        ]}
        form={modalForm}
        onChange={handleModalChange}
        onSubmit={submitProject}
        onClose={() => setIsProjectModalOpen(false)}
        isSubmitting={isSubmitting}
        submitLabel="Create Project"
      />

      <ProjectModal
        isOpen={isMemberModalOpen}
        title="Add Team Member"
        fields={[
          {
            name: 'projectId',
            label: 'Project',
            type: 'select',
            required: true,
            options: projects.map(p => ({ value: p._id, label: p.name }))
          },
          { name: 'userId', label: 'User Email or ID', type: 'text', required: true },
        ]}
        form={modalForm}
        onChange={handleModalChange}
        onSubmit={submitMember}
        onClose={() => setIsMemberModalOpen(false)}
        isSubmitting={isSubmitting}
        submitLabel="Add Member"
      />
    </>
  );
}

export default Projects;
