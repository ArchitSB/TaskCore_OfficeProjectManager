const { ApiError } = require('../utils/errorHandler');

const allowRoles = (...roles) => (req, res, next) => {
  if (!req.user) {
    throw new ApiError(401, 'Unauthorized');
  }

  if (!roles.includes(req.user.role)) {
    throw new ApiError(403, `Forbidden. Required role: ${roles.join(' or ')}`);
  }

  next();
};

module.exports = {
  allowRoles,
};
