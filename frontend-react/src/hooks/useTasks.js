import { useCallback, useEffect, useMemo, useState } from 'react';
import { getProjectsRequest } from '../api/projects.api';
import { getTasksRequest, updateTaskStatusRequest } from '../api/tasks.api';
import { getApiErrorMessage } from '../utils/error';

const toInitials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('');

const toTaskView = (task) => ({
  id: task._id,
  title: task.title,
  description: task.description || '',
  status: task.status,
  priority: task.priority,
  dueDateISO: task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 10) : '',
  assignedToId: task.assignedTo?._id || '',
  assignee: toInitials(task.assignedTo?.name || 'U'),
  date: task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '',
  fullAssignee: task.assignedTo?.name || 'Unassigned',
});

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadProjects = useCallback(async () => {
    const response = await getProjectsRequest();
    const loadedProjects = response.data || [];
    setProjects(loadedProjects);
    return loadedProjects;
  }, []);

  const loadTasks = useCallback(async (projectId = selectedProjectId) => {
    const response = await getTasksRequest(projectId || '');
    return (response.data || []).map(toTaskView);
  }, [selectedProjectId]);

  useEffect(() => {
    let isActive = true;

    const bootstrap = async () => {
      setLoading(true);
      setError('');
      try {
        const loadedProjects = await loadProjects();
        
        let projectIdToFetch = selectedProjectId;
        if (!selectedProjectId && loadedProjects.length > 0) {
          projectIdToFetch = loadedProjects[0]._id;
          if (isActive) {
            setSelectedProjectId(projectIdToFetch);
          }
        }

        const mappedTasks = await loadTasks(projectIdToFetch);

        if (!isActive) return;

        if (mappedTasks && mappedTasks.length >= 0) {
          setTasks(mappedTasks);
        }
      } catch (err) {
        if (isActive) {
          setError(getApiErrorMessage(err, 'Unable to load board data'));
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    bootstrap();

    return () => {
      isActive = false;
    };
  }, [selectedProjectId, loadProjects, loadTasks]);

  const getTasksByStatus = useCallback((status) => tasks.filter((task) => task.status === status), [tasks]);

  const updateTaskStatus = useCallback(async (taskId, nextStatus) => {
    const previousTasks = tasks;

    setTasks((currentTasks) =>
      currentTasks.map((task) => (task.id === taskId ? { ...task, status: nextStatus } : task))
    );

    try {
      await updateTaskStatusRequest(taskId, nextStatus);
    } catch (apiError) {
      setTasks(previousTasks);
      setError(getApiErrorMessage(apiError, 'Unable to update task status'));
    }
  }, [tasks]);

  const clearTasksByStatus = useCallback((status) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.status !== status));
  }, []);

  const projectOptions = useMemo(
    () => projects.map((project) => ({ id: project._id, name: project.name })),
    [projects]
  );

  const reloadTasks = useCallback(async (projectId = selectedProjectId) => {
    setLoading(true);
    setError('');
    try {
      const mappedTasks = await loadTasks(projectId);
      setTasks(mappedTasks);
    } catch (err) {
      setError(getApiErrorMessage(err, 'Unable to reload tasks'));
    } finally {
      setLoading(false);
    }
  }, [loadTasks, selectedProjectId]);

  return {
    tasks,
    loading,
    error,
    projectOptions,
    selectedProjectId,
    setSelectedProjectId,
    getTasksByStatus,
    updateTaskStatus,
    clearTasksByStatus,
    reloadTasks,
  };
}
