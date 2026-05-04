import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectsRequest } from '../api/projects.api';

function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await getProjectsRequest();
        // Assume projects have an _id field based on existing code mapping
        const foundProject = (response.data || []).find((p) => p._id === id);
        if (foundProject) {
          setProject(foundProject);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) {
    return <div className="text-slate-400">Loading project details...</div>;
  }

  if (error || !project) {
    return (
      <div>
        <h2 className="font-h1 text-h1 text-error">Project not found</h2>
        <p className="text-slate-400 mt-2">The project you are looking for does not exist or has been removed.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-lg">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="font-h1 text-h1 text-on-surface">{project.name}</h2>
          <p className="font-body-sm text-body-sm text-slate-400">
            {project.description || 'Detailed view and management for this initiative.'}
          </p>
        </div>
      </div>
      <div className="bg-[#161D27] border border-[#2A3441] p-xl rounded min-h-[400px] flex items-center justify-center">
        <p className="text-slate-400 font-medium">Project details coming soon</p>
      </div>
    </div>
  );
}

export default ProjectDetails;
