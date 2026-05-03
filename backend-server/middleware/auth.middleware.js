const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { ApiError } = require('../utils/errorHandler');

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const jwtSecret = process.env.JWT_SECRET;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new ApiError(401, 'Access denied. Missing or invalid authorization header');
  }

  if (!jwtSecret) {
    throw new ApiError(500, 'JWT_SECRET is not configured');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, jwtSecret);
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      throw new ApiError(401, 'User not found or token is no longer valid');
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new ApiError(401, 'Token expired');
    }

    if (error.name === 'JsonWebTokenError') {
      throw new ApiError(401, 'Invalid token');
    }

    throw error;
  }
};

module.exports = {
  protect,
};
