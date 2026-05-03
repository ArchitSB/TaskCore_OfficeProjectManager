const express = require('express');
const {
  getProjects,
  createProject,
  addMemberToProject,
} = require('../controllers/project.controller');
const { protect } = require('../middleware/auth.middleware');
const { allowRoles } = require('../middleware/role.middleware');

const router = express.Router();

router.use(protect);

router.get('/', getProjects);
router.post('/', allowRoles('admin'), createProject);
router.post('/:id/add-member', allowRoles('admin'), addMemberToProject);

module.exports = router;
