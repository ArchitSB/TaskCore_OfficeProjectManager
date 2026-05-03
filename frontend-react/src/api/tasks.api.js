import api from './axios';

export const getTasksRequest = async (projectId = '') => {
  const query = projectId ? `?projectId=${projectId}` : '';
  const response = await api.get(`/tasks${query}`);
  return response.data;
};

export const createTaskRequest = async (payload) => {
  const response = await api.post('/tasks', payload);
  return response.data;
};

export const updateTaskStatusRequest = async (taskId, status) => {
  const response = await api.patch(`/tasks/${taskId}/status`, { status });
  return response.data;
};

export const updateTaskRequest = async (taskId, payload) => {
  const response = await api.patch(`/tasks/${taskId}`, payload);
  return response.data;
};
