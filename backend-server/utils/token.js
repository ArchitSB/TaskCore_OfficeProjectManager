const jwt = require('jsonwebtoken');
const { ApiError } = require('./errorHandler');

const generateToken = (user) => {
  const jwtSecret = process.env.JWT_SECRET;
  const jwtExpiresIn = process.env.JWT_EXPIRES_IN;

  if (!jwtSecret) {
    throw new ApiError(500, 'JWT_SECRET is not configured');
  }

  if (!jwtExpiresIn) {
    throw new ApiError(500, 'JWT_EXPIRES_IN is not configured');
  }

  return jwt.sign(
    {
      userId: user._id,
      role: user.role,
    },
    jwtSecret,
    { expiresIn: jwtExpiresIn }
  );
};

module.exports = {
  generateToken,
};
