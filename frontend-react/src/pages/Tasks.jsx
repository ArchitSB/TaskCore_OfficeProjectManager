import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTasks } from '../hooks/useTasks';
import { KanbanColumn } from '../components/task/KanbanColumn';
import { TaskModal } from '../components/task/TaskModal';
import { useAuth } from '../context/AuthContext';
import { createTaskRequest, updateTaskRequest } from '../api/tasks.api';
import { getApiErrorMessage } from '../utils/error';
import { isAdmin } from '../utils/permissions';

const EMPTY_TASK_FORM = {
  title: '',
  description: '',
  priority: 'medium',
  dueDate: '',
};

const toFormFromTask = (task) => ({
  title: task?.title || '',
  description: task?.description || '',
  priority: task?.priority || 'medium',
  dueDate: task?.dueDateISO || '',
});

function Tasks() {
  const {
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
  } = useTasks();
  const { user } = useAuth();
  const [actionError, setActionError] = useState('');
  const [activeDropdownStatus, setActiveDropdownStatus] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedEditTaskId, setSelectedEditTaskId] = useState('');
  const [taskForm, setTaskForm] = useState(EMPTY_TASK_FORM);
  const [view, setView] = useState('board');

  const location = useLocation();
  const navigate = useNavigate();

  const openCreateModal = () => {
    if (!selectedProjectId) {
      setActionError('Select a project before creating a task.');
      return;
    }

    setActionError('');
    setModalMode('create');
    setTaskForm(EMPTY_TASK_FORM);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (location.state?.openNewTaskModal) {
      if (selectedProjectId) {
        openCreateModal();
        navigate(location.pathname, { replace: true, state: {} });
      } else if (projectOptions.length > 0) {
        setSelectedProjectId(projectOptions[0].id);
        // Wait for next render where selectedProjectId is set to open modal
      }
    }
  }, [location.state, selectedProjectId, projectOptions, navigate, location.pathname]);

  const closeModal = () => {
    setIsModalOpen(false);
    setIsSubmitting(false);
    setSelectedEditTaskId('');
    setTaskForm(EMPTY_TASK_FORM);
  };

  const openEditModal = () => {
    if (!tasks.length) {
      setActionError('No tasks available to edit.');
      return;
    }

    const firstTask = tasks[0];
    setActionError('');
    setModalMode('edit');
    setSelectedEditTaskId(firstTask.id);
    setTaskForm(toFormFromTask(firstTask));
    setIsModalOpen(true);
  };

  const handleEditTaskSelect = (taskId) => {
    setSelectedEditTaskId(taskId);
    const selectedTask = tasks.find((task) => task.id === taskId);
    setTaskForm(toFormFromTask(selectedTask));
  };

  const handleTaskFormChange = (event) => {
    const { name, value } = event.target;
    setTaskForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitTask = async (event) => {
    event.preventDefault();

    if (!taskForm.title.trim()) {
      setActionError('Task title is required.');
      return;
    }

    setIsSubmitting(true);
    setActionError('');

    try {
      if (modalMode === 'create') {
        if (!selectedProjectId) {
          throw new Error('Select a project before creating a task.');
        }

        await createTaskRequest({
          title: taskForm.title.trim(),
          description: taskForm.description.trim(),
          status: 'todo',
          priority: taskForm.priority,
          dueDate: taskForm.dueDate || null,
          assignedTo: user?.id,
          projectId: selectedProjectId,
        });
      } else {
        if (!selectedEditTaskId) {
          throw new Error('Select a task to edit.');
        }

        await updateTaskRequest(selectedEditTaskId, {
          title: taskForm.title.trim(),
          description: taskForm.description.trim(),
          priority: taskForm.priority,
          dueDate: taskForm.dueDate || null,
        });
      }

      closeModal();
      await reloadTasks(selectedProjectId);
    } catch (apiError) {
      setActionError(getApiErrorMessage(apiError, 'Unable to save task'));
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="mb-lg flex justify-between items-center bg-surface-container-lowest p-2 rounded-lg border border-surface-container-high gap-sm flex-wrap">
        <div className="flex gap-2">
          <button 
            className={`px-md py-1 font-semibold rounded shadow-sm text-sm flex items-center gap-2 transition-colors ${view === 'board' ? 'bg-surface-container-high text-primary' : 'text-slate-400 hover:text-slate-200'}`}
            onClick={() => setView('board')}
          >
            <span className="material-symbols-outlined text-[18px]">view_kanban</span>
            Board
          </button>
          <button 
            className={`px-md py-1 font-semibold rounded shadow-sm text-sm flex items-center gap-2 transition-colors ${view === 'table' ? 'bg-surface-container-high text-primary' : 'text-slate-400 hover:text-slate-200'}`}
            onClick={() => setView('table')}
          >
            <span className="material-symbols-outlined text-[18px]">table_rows</span>
            Table
          </button>
        </div>

        <div className="flex items-center gap-2">
          <select
            className="bg-[#121821] border border-[#2A3441] rounded px-sm py-xs text-sm text-slate-100"
            value={selectedProjectId}
            onChange={(event) => setSelectedProjectId(event.target.value)}
          >
            <option value="">All Projects</option>
            {projectOptions.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>

          {isAdmin(user) && (
            <>
              <button
                type="button"
                onClick={openCreateModal}
                className="px-md py-1 bg-amber-500 text-slate-900 font-semibold rounded text-sm"
              >
                New Task
              </button>
              <button
                type="button"
                onClick={openEditModal}
                className="px-md py-1 bg-[#1B2430] border border-[#2A3441] text-slate-100 font-semibold rounded text-sm"
              >
                Edit Task
              </button>
            </>
          )}
        </div>
      </div>

      {(error || actionError) && (
        <div className="mb-md rounded border border-red-500/40 bg-red-900/20 text-red-300 text-sm px-md py-sm">
          {actionError || error}
        </div>
      )}

      {loading ? (
        <div className="text-slate-400 text-sm">Loading tasks...</div>
      ) : view === 'board' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-xl items-start">
          <KanbanColumn
            title="To Do"
            columnId="todo"
            status="todo"
            count={tasks.filter(t => t.status === 'todo').length}
            tasks={tasks.filter(t => t.status === 'todo')}
            onDropTask={isAdmin(user) ? updateTaskStatus : undefined}
            onClearTasks={isAdmin(user) ? clearTasksByStatus : undefined}
            activeDropdownStatus={activeDropdownStatus}
            setActiveDropdownStatus={setActiveDropdownStatus}
            isAdmin={isAdmin(user)}
          />
          <KanbanColumn
            title="In Progress"
            columnId="in_progress"
            status="in_progress"
            count={tasks.filter(t => t.status === 'in_progress').length}
            tasks={tasks.filter(t => t.status === 'in_progress')}
            onDropTask={isAdmin(user) ? updateTaskStatus : undefined}
            onClearTasks={isAdmin(user) ? clearTasksByStatus : undefined}
            activeDropdownStatus={activeDropdownStatus}
            setActiveDropdownStatus={setActiveDropdownStatus}
            badgeColor="bg-amber-500 text-slate-900"
            isAdmin={isAdmin(user)}
          />
          <KanbanColumn
            title="Done"
            columnId="done"
            status="done"
            count={tasks.filter(t => t.status === 'done').length}
            tasks={tasks.filter(t => t.status === 'done')}
            onDropTask={isAdmin(user) ? updateTaskStatus : undefined}
            onClearTasks={isAdmin(user) ? clearTasksByStatus : undefined}
            activeDropdownStatus={activeDropdownStatus}
            setActiveDropdownStatus={setActiveDropdownStatus}
            isAdmin={isAdmin(user)}
          />
        </div>
      ) : (
        <div className="w-full overflow-x-auto bg-[#161D27] border border-[#2A3441] rounded-lg shadow-sm">
          <table className="w-full text-left text-sm text-slate-200 border-collapse">
            <thead className="text-xs uppercase bg-[#121821] text-slate-400 border-b border-[#2A3441]">
              <tr>
                <th className="px-4 py-3 font-semibold">Title</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Priority</th>
                <th className="px-4 py-3 font-semibold">Due Date</th>
                <th className="px-4 py-3 font-semibold">Assigned To</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-4 py-8 text-center text-slate-500">No tasks found</td>
                </tr>
              ) : (
                tasks.map(task => (
                  <tr key={task.id} className="border-b border-[#2A3441] hover:bg-[#1B2430] transition-colors">
                    <td className="px-4 py-3 font-medium text-slate-100">{task.title}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs uppercase tracking-wider font-semibold ${
                        task.status === 'todo' ? 'bg-slate-800 text-slate-300' :
                        task.status === 'in_progress' ? 'bg-amber-900/50 text-amber-500' :
                        'bg-green-900/50 text-green-400'
                      }`}>
                        {task.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`flex items-center gap-1 ${
                        task.priority === 'high' ? 'text-red-400' : 
                        task.priority === 'medium' ? 'text-amber-400' : 'text-blue-400'
                      }`}>
                        <span className="material-symbols-outlined text-[16px]">
                          {task.priority === 'high' ? 'priority_high' : task.priority === 'medium' ? 'remove' : 'low_priority'}
                        </span>
                        <span className="capitalize">{task.priority}</span>
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-400">
                      {task.dueDateISO ? new Date(task.dueDateISO).toLocaleDateString() : 'No date'}
                    </td>
                    <td className="px-4 py-3 text-slate-300">
                      {task.assignee?.name || 'Unassigned'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      <TaskModal
        isOpen={isModalOpen}
        mode={modalMode}
        form={taskForm}
        onChange={handleTaskFormChange}
        onSubmit={handleSubmitTask}
        onClose={closeModal}
        isSubmitting={isSubmitting}
        tasks={tasks}
        selectedTaskId={selectedEditTaskId}
        onSelectTask={handleEditTaskSelect}
      />
    </>
  );
}

export default Tasks;
