const mongoose = require('mongoose');
const Project = require('../models/Project');
const Task = require('../models/Task');
const User = require('../models/User');
const { ApiError } = require('../utils/errorHandler');

const getAccessibleProjectIds = async (user) => {
  if (user.role === 'admin') {
    const allProjects = await Project.find().select('_id');
    return allProjects.map((project) => project._id);
  }

  const projects = await Project.find({
    $or: [{ members: user._id }, { createdBy: user._id }],
  }).select('_id');

  return projects.map((project) => project._id);
};

const getTasks = async (req, res) => {
  const { projectId } = req.query;

  const filter = {};

  if (projectId) {
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      throw new ApiError(400, 'Invalid projectId');
    }

    if (req.user.role !== 'admin') {
      const project = await Project.findOne({
        _id: projectId,
        $or: [{ members: req.user._id }, { createdBy: req.user._id }],
      }).select('_id');

      if (!project) {
        throw new ApiError(403, 'You do not have access to this project');
      }
    }

    filter.projectId = projectId;
  } else if (req.user.role !== 'admin') {
    const accessibleProjectIds = await getAccessibleProjectIds(req.user);

    if (accessibleProjectIds.length === 0) {
      return res.json({
        success: true,
        data: [],
      });
    }

    filter.projectId = { $in: accessibleProjectIds };
  }

  const tasks = await Task.find(filter)
    .populate('assignedTo', 'name email role')
    .populate('projectId', 'name description')
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    data: tasks,
  });
};

const createTask = async (req, res) => {
  const { title, description = '', status, priority, dueDate, assignedTo, projectId } = req.body;

  if (!title || !assignedTo || !projectId) {
    throw new ApiError(400, 'title, assignedTo, and projectId are required');
  }

  if (!mongoose.Types.ObjectId.isValid(assignedTo) || !mongoose.Types.ObjectId.isValid(projectId)) {
    throw new ApiError(400, 'Invalid assignedTo or projectId');
  }

  const [project, assignee] = await Promise.all([
    Project.findById(projectId),
    User.findById(assignedTo),
  ]);

  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

  if (!assignee) {
    throw new ApiError(404, 'Assigned user not found');
  }

  const isMember =
    project.createdBy.equals(assignee._id) || project.members.some((memberId) => memberId.equals(assignee._id));

  if (!isMember) {
    throw new ApiError(400, 'Assigned user must be a project member');
  }

  const task = await Task.create({
    title,
    description,
    status,
    priority,
    dueDate,
    assignedTo,
    projectId,
    createdBy: req.user._id,
  });

  const populatedTask = await Task.findById(task._id)
    .populate('assignedTo', 'name email role')
    .populate('projectId', 'name description');

  res.status(201).json({
    success: true,
    message: 'Task created successfully',
    data: populatedTask,
  });
};

const updateTaskStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, 'Invalid task ID');
  }

  if (!status) {
    throw new ApiError(400, 'status is required');
  }

  const task = await Task.findById(id);

  if (!task) {
    throw new ApiError(404, 'Task not found');
  }

  if (req.user.role !== 'admin' && !task.assignedTo.equals(req.user._id)) {
    throw new ApiError(403, 'Forbidden: You can update only your assigned task status');
  }

  task.status = status;
  await task.save();

  const updatedTask = await Task.findById(task._id)
    .populate('assignedTo', 'name email role')
    .populate('projectId', 'name description');

  res.json({
    success: true,
    message: 'Task status updated successfully',
    data: updatedTask,
  });
};

const updateTask = async (req, res) => {
  const { id } = req.params;

  if (req.user.role !== 'admin') {
    throw new ApiError(403, 'Forbidden: Only admin can update task details');
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, 'Invalid task ID');
  }

  const task = await Task.findById(id);

  if (!task) {
    throw new ApiError(404, 'Task not found');
  }

  const allowedFields = ['title', 'description', 'status', 'priority', 'dueDate', 'assignedTo', 'projectId'];

  Object.keys(req.body).forEach((field) => {
    if (allowedFields.includes(field)) {
      task[field] = req.body[field];
    }
  });

  if (req.user.role === 'admin' && req.body.assignedTo) {
    if (!mongoose.Types.ObjectId.isValid(req.body.assignedTo)) {
      throw new ApiError(400, 'Invalid assignedTo user ID');
    }

    const assignee = await User.findById(req.body.assignedTo);
    if (!assignee) {
      throw new ApiError(404, 'Assigned user not found');
    }

    const projectForAssignment = await Project.findById(task.projectId);
    if (!projectForAssignment) {
      throw new ApiError(404, 'Task project not found');
    }

    const isMember =
      projectForAssignment.createdBy.equals(assignee._id) ||
      projectForAssignment.members.some((memberId) => memberId.equals(assignee._id));

    if (!isMember) {
      throw new ApiError(400, 'Assigned user must belong to the task project');
    }
  }

  if (req.user.role === 'admin' && req.body.projectId) {
    if (!mongoose.Types.ObjectId.isValid(req.body.projectId)) {
      throw new ApiError(400, 'Invalid projectId');
    }

    const project = await Project.findById(req.body.projectId);
    if (!project) {
      throw new ApiError(404, 'Project not found');
    }

    if (req.body.assignedTo || task.assignedTo) {
      const assigneeId = req.body.assignedTo || task.assignedTo;
      const isMember =
        project.createdBy.equals(assigneeId) ||
        project.members.some((memberId) => memberId.equals(assigneeId));

      if (!isMember) {
        throw new ApiError(400, 'Assigned user must belong to the selected project');
      }
    }
  }

  await task.save();

  const updatedTask = await Task.findById(task._id)
    .populate('assignedTo', 'name email role')
    .populate('projectId', 'name description');

  res.json({
    success: true,
    message: 'Task updated successfully',
    data: updatedTask,
  });
};

module.exports = {
  getTasks,
  createTask,
  updateTaskStatus,
  updateTask,
};
