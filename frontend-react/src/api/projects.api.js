import api from './axios';

export const getProjectsRequest = async () => {
  const response = await api.get('/projects');
  return response.data;
};

export const createProjectRequest = async (payload) => {
  const response = await api.post('/projects', payload);
  return response.data;
};

export const addProjectMemberRequest = async (projectId, userId) => {
  const response = await api.post(`/projects/${projectId}/add-member`, { userId });
  return response.data;
};
