const express = require('express');
const {
  getTasks,
  createTask,
  updateTaskStatus,
  updateTask,
} = require('../controllers/task.controller');
const { protect } = require('../middleware/auth.middleware');
const { allowRoles } = require('../middleware/role.middleware');

const router = express.Router();

router.use(protect);

router.get('/', getTasks);
router.post('/', allowRoles('admin'), createTask);
router.patch('/:id/status', updateTaskStatus);
router.patch('/:id', updateTask);

module.exports = router;
