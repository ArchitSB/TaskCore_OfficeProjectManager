const Project = require('../models/Project');
const Task = require('../models/Task');

const getLastNDates = (days = 7) => {
  const dates = [];
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  for (let i = days - 1; i >= 0; i -= 1) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    dates.push(date);
  }

  return dates;
};

const getDashboardData = async (req, res) => {
  const userId = req.user._id;
  const now = new Date();

  let projectIds = [];
  let activeProjects = 0;

  if (req.user.role === 'admin') {
    const allProjects = await Project.find().select('_id');
    projectIds = allProjects.map((project) => project._id);
    activeProjects = allProjects.length;
  } else {
    const accessibleProjects = await Project.find({
      $or: [{ members: userId }, { createdBy: userId }],
    }).select('_id');

    projectIds = accessibleProjects.map((project) => project._id);
    activeProjects = accessibleProjects.length;
  }

  const taskMatch =
    req.user.role === 'admin' ? {} : projectIds.length > 0 ? { projectId: { $in: projectIds } } : { _id: null };

  const [totalTasks, completed, overdue, highPriorityCount, overdueTasks] = await Promise.all([
    Task.countDocuments(taskMatch),
    Task.countDocuments({ ...taskMatch, status: 'done' }),
    Task.countDocuments({ ...taskMatch, dueDate: { $lt: now }, status: { $ne: 'done' } }),
    Task.countDocuments({ ...taskMatch, priority: { $in: ['high', 'critical'] }, status: { $ne: 'done' } }),
    Task.find({ ...taskMatch, dueDate: { $lt: now }, status: { $ne: 'done' } })
      .sort({ dueDate: 1 })
      .limit(5)
      .populate('assignedTo', 'name')
      .populate('projectId', 'name')
      .select('title dueDate priority status assignedTo projectId'),
  ]);

  const last7Days = getLastNDates(7);
  const startDate = new Date(last7Days[0]);
  startDate.setHours(0, 0, 0, 0);

  const activityRaw = await Task.aggregate([
    {
      $match: {
        ...taskMatch,
        createdAt: { $gte: startDate },
      },
    },
    {
      $project: {
        day: {
          $dateToString: {
            format: '%Y-%m-%d',
            date: '$createdAt',
          },
        },
        status: 1,
      },
    },
    {
      $group: {
        _id: '$day',
        created: { $sum: 1 },
        completed: {
          $sum: {
            $cond: [{ $eq: ['$status', 'done'] }, 1, 0],
          },
        },
      },
    },
  ]);

  const activityMap = new Map(activityRaw.map((entry) => [entry._id, entry]));

  const activity = last7Days.map((date) => {
    const dayKey = date.toISOString().slice(0, 10);
    const record = activityMap.get(dayKey);

    return {
      date: dayKey,
      created: record ? record.created : 0,
      completed: record ? record.completed : 0,
    };
  });

  const insights = [
    {
      type: 'overdue',
      count: overdue,
      message: overdue > 0 ? `${overdue} task(s) are overdue` : 'No overdue tasks. Great momentum!',
      tasks: overdueTasks,
    },
    {
      type: 'high_priority',
      count: highPriorityCount,
      message:
        highPriorityCount > 0
          ? `${highPriorityCount} high/critical task(s) need attention`
          : 'No high priority bottlenecks right now.',
    },
  ];

  res.json({
    success: true,
    stats: {
      totalTasks,
      completed,
      overdue,
      activeProjects,
    },
    activity,
    insights,
  });
};

module.exports = {
  getDashboardData,
};
