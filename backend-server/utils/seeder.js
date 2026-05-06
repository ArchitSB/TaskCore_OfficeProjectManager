require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const connectDB = require('../config/db');
const User = require('../models/User');
const Project = require('../models/Project');
const Task = require('../models/Task');

const TASK_STATUSES = ['todo', 'in_progress', 'done'];
const TASK_PRIORITIES = ['low', 'medium', 'high'];

const PROJECT_TEMPLATES = [
  {
    name: 'Platform Reliability Upgrade',
    description: 'Improve service reliability and reduce incident response time.',
  },
  {
    name: 'Customer Analytics Dashboard',
    description: 'Build richer operational insights for product and operations teams.',
  },
  {
    name: 'Mobile Performance Initiative',
    description: 'Optimize latency and rendering on low-end devices.',
  },
  {
    name: 'Workflow Automation Suite',
    description: 'Automate repetitive internal task flows across teams.',
  },
  {
    name: 'Security Hardening Program',
    description: 'Address vulnerabilities and tighten access controls across services.',
  },
  {
    name: 'Global Infrastructure Migration',
    description: 'Migrate on-premise infrastructure to cloud-native solutions.',
  },
  {
    name: 'Next-Gen Payment Gateway',
    description: 'Integrate multi-currency support and lower transaction latency.',
  },
  {
    name: 'Marketing Website Revamp',
    description: 'Redesign the public marketing site for better SEO and conversion.',
  },
  {
    name: 'Internal Knowledge Base',
    description: 'Create a centralized wiki for engineering and product documentation.',
  }
];

const FIRST_NAMES = ['Aarav', 'Mira', 'Rohan', 'Isha', 'Kunal', 'Neha', 'Arjun', 'Tara', 'Kabir', 'Siya', 'Amit', 'Priya', 'Vikram', 'Ananya', 'Rahul'];
const LAST_NAMES = ['Sharma', 'Patel', 'Mehta', 'Verma', 'Rao', 'Nair', 'Kapoor', 'Singh', 'Iyer', 'Joshi', 'Chopra', 'Das', 'Sen', 'Bose', 'Gupta'];

const TASK_TITLES = [
  'Design API contract for notification service',
  'Refactor legacy status update flow',
  'Implement project permissions matrix',
  'Audit overdue task escalation logic',
  'Optimize dashboard aggregate queries',
  'Add pagination to task list endpoint',
  'Prepare release notes for sprint handoff',
  'Validate role middleware edge cases',
  'Migrate project metadata to new schema',
  'Fix Kanban drag/drop status sync issue',
  'Improve error telemetry in auth flows',
  'Add resilience checks for task updates',
  'Document API contracts for frontend team',
  'Create QA checklist for project creation',
  'Benchmark response time for dashboard API',
  'Review member onboarding workflow',
  'Stabilize task assignment validations',
  'Tune DB indexes for high traffic routes',
  'Add smoke tests for auth-protected routes',
  'Investigate stale token handling behavior',
  'Prepare migration rollback strategy',
  'Update system alerts for overdue tasks',
  'Implement activity chart caching strategy',
  'Review cross-project task visibility rules',
  'Improve project member management UX',
  'Harden input validation for task creation',
  'Track SLA metrics for critical workflows',
  'Clean up deprecated dashboard fields',
  'Plan release cutover for production launch',
  'Improve reliability of audit log writes',
];

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const randomPick = (list) => list[randomInt(0, list.length - 1)];

const buildRandomMembers = (count = 5) => {
  const members = [];
  const usedEmails = new Set();

  while (members.length < count) {
    const firstName = randomPick(FIRST_NAMES);
    const lastName = randomPick(LAST_NAMES);
    const email = `${firstName}.${lastName}.${randomInt(100, 999)}@demo.com`.toLowerCase();

    if (usedEmails.has(email)) continue;

    usedEmails.add(email);
    members.push({
      name: `${firstName} ${lastName}`,
      email,
    });
  }

  return members;
};

const pickUniqueMembers = (members, count) => {
  const pool = [...members];
  const picked = [];

  while (picked.length < count && pool.length > 0) {
    const idx = randomInt(0, pool.length - 1);
    const [chosen] = pool.splice(idx, 1);
    picked.push(chosen._id);
  }

  return picked;
};

const buildCreatedDate = () => {
  const offsetDays = randomInt(0, 14); // 0 to 14 days ago
  const date = new Date();
  date.setDate(date.getDate() - offsetDays);
  date.setHours(randomInt(0, 23), randomInt(0, 59), randomInt(0, 59));
  return date;
};

const buildDueDate = (createdAt) => {
  const offsetDays = randomInt(-5, 30);
  const date = new Date(createdAt);
  date.setDate(date.getDate() + offsetDays);
  return date;
};

const seedDatabase = async () => {
  console.log('Seeding started...');

  await connectDB();

  await Promise.all([Task.deleteMany({}), Project.deleteMany({}), User.deleteMany({})]);

  const hashedPassword = await bcrypt.hash('123456', 10);
  const randomMembers = buildRandomMembers(15);

  const users = await User.insertMany([
    {
      name: 'Admin User',
      email: 'admin@demo.com',
      password: hashedPassword,
      role: 'admin',
    },
    ...randomMembers.map((member) => ({
      ...member,
      password: hashedPassword,
      role: 'member',
    })),
  ]);

  const admin = users.find((user) => user.role === 'admin');
  const members = users.filter((user) => user.role === 'member');

  const projectCount = PROJECT_TEMPLATES.length;

  const projectsPayload = PROJECT_TEMPLATES.slice(0, projectCount).map((project) => ({
    name: project.name,
    description: project.description,
    createdBy: admin._id,
    members: pickUniqueMembers(members, randomInt(3, 8)),
  }));

  const projects = await Project.insertMany(projectsPayload);

  const taskCount = randomInt(150, 200);
  const tasksPayload = [];

  for (let index = 0; index < taskCount; index += 1) {
    const project = randomPick(projects);
    const projectMemberIds = project.members.length ? project.members : [members[0]._id];
    const assignedTo = randomPick(projectMemberIds);
    const createdAt = buildCreatedDate();

    tasksPayload.push({
      title: TASK_TITLES[index % TASK_TITLES.length] + (index >= TASK_TITLES.length ? ` (Part ${Math.floor(index / TASK_TITLES.length) + 1})` : ''),
      description: `Seeded task ${index + 1} for demo workflows and API integration checks.`,
      status: randomPick(TASK_STATUSES),
      priority: randomPick(TASK_PRIORITIES),
      createdAt,
      dueDate: buildDueDate(createdAt),
      assignedTo,
      projectId: project._id,
      createdBy: admin._id,
    });
  }

  await Task.insertMany(tasksPayload);

  console.log('Seeding completed');
  console.log(`Users: ${users.length}, Projects: ${projects.length}, Tasks: ${tasksPayload.length}`);
};

if (process.env.NODE_ENV !== 'production') {
  seedDatabase()
    .then(async () => {
      await mongoose.connection.close();
      process.exit(0);
    })
    .catch(async (error) => {
      console.error('Seeding error:', error);
      await mongoose.connection.close();
      process.exit(1);
    });
} else {
  console.log('Seeder is disabled in production.');
  process.exit(0);
}
