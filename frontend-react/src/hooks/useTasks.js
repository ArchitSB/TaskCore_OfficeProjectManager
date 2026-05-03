import { useState } from 'react';

// Dummy task data
const INITIAL_TASKS = [
  { id: 'TC-402', title: 'Implement WebSocket provider for real-time board updates', status: 'todo', priority: 'critical', assignee: 'JS', date: 'Jul 24' },
  { id: 'TC-391', title: 'Database migration script for v2 schema optimization', status: 'todo', priority: 'backlog', assignee: 'AK', date: 'Jul 22', active: true, comments: 12 },
  { id: 'TC-215', title: 'API Gateway refactor for microservices architecture', status: 'in_progress', priority: 'high', assignee: 'Arjun K.', progress: 65, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBa9qupZlZkAnetPuVt0r1I7fjcKg9XIU1eXJD1b8nLb7HWxmyEK-tPaGjmtv9_sYe0doPjvSDYpaWMpEvNmEY9YObfs2mPhGRDg-2WBZ7lXq7SPdGsxl3Z_65kh7vqQ2IFco-7xt7r4nq9dQM7GQp9pvogNSFqiB3oENQm_g4yIsn1uTsiubj_qJG72gX0QIiixGHgiQOind9XF-KGGnyCUorGgHdzyNIHMBNZViqxoraNwWbX-e6aKkdoXk2j566eviZEByvgZg' },
  { id: 'TC-201', title: 'Update marketing site assets for Q3 launch', status: 'done', priority: 'low', assignee: 'M', date: 'Jul 15' },
];

export function useTasks() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  const getTasksByStatus = (status) => tasks.filter(t => t.status === status);

  const addTask = (task) => setTasks([...tasks, { ...task, id: `TC-${Math.floor(Math.random() * 1000)}` }]);

  return { tasks, getTasksByStatus, addTask };
}
