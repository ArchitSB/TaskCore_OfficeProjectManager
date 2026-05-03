const mongoose = require('mongoose');
const Project = require('../models/Project');
const User = require('../models/User');
const { ApiError } = require('../utils/errorHandler');

const getProjectAccessFilter = (user) => {
  if (user.role === 'admin') {
    return {};
  }

  return {
    $or: [{ members: user._id }, { createdBy: user._id }],
  };
};

const getProjects = async (req, res) => {
  const accessFilter = getProjectAccessFilter(req.user);

  const projects = await Project.find(accessFilter)
    .populate('createdBy', 'name email role')
    .populate('members', 'name email role')
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    data: projects,
  });
};

const createProject = async (req, res) => {
  const { name, description = '', members = [] } = req.body;

  if (!name) {
    throw new ApiError(400, 'Project name is required');
  }

  const memberIds = [...new Set(members.map((memberId) => String(memberId)))];

  const validMemberIds = [];
  for (const memberId of memberIds) {
    if (!mongoose.Types.ObjectId.isValid(memberId)) {
      throw new ApiError(400, `Invalid member ID: ${memberId}`);
    }

    const user = await User.findById(memberId);
    if (!user) {
      throw new ApiError(404, `Member user not found: ${memberId}`);
    }

    validMemberIds.push(user._id);
  }

  if (!validMemberIds.some((id) => id.equals(req.user._id))) {
    validMemberIds.push(req.user._id);
  }

  const project = await Project.create({
    name,
    description,
    members: validMemberIds,
    createdBy: req.user._id,
  });

  const populatedProject = await Project.findById(project._id)
    .populate('createdBy', 'name email role')
    .populate('members', 'name email role');

  res.status(201).json({
    success: true,
    message: 'Project created successfully',
    data: populatedProject,
  });
};

const addMemberToProject = async (req, res) => {
  const { id: projectId } = req.params;
  const { userId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    throw new ApiError(400, 'Invalid project ID');
  }

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, 'Valid userId is required');
  }

  const [project, user] = await Promise.all([Project.findById(projectId), User.findById(userId)]);

  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  project.members.addToSet(user._id);
  await project.save();

  const populatedProject = await Project.findById(project._id)
    .populate('createdBy', 'name email role')
    .populate('members', 'name email role');

  res.json({
    success: true,
    message: 'Member added successfully',
    data: populatedProject,
  });
};

module.exports = {
  getProjects,
  createProject,
  addMemberToProject,
};
