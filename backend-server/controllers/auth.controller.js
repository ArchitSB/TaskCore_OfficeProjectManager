const User = require('../models/User');
const { ApiError } = require('../utils/errorHandler');
const { generateToken } = require('../utils/token');

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
});

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  const isNameValid = typeof name === 'string' && name.trim().length > 0;
  const isEmailValid = typeof email === 'string' && email.trim().length > 0;
  const isPasswordValid = typeof password === 'string' && password.trim().length > 0;

  if (!isNameValid || !isEmailValid || !isPasswordValid) {
    throw new ApiError(400, 'name, email, and password are required');
  }

  const normalizedEmail = email.toLowerCase().trim();

  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) {
    throw new ApiError(409, 'User with this email already exists');
  }

  const user = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    password,
  });

  const token = generateToken(user);

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    token,
    user: sanitizeUser(user),
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password || !email.trim() || typeof password !== 'string' || !password.trim()) {
    throw new ApiError(400, 'email and password are required');
  }

  const normalizedEmail = email.toLowerCase().trim();
  const user = await User.findOne({ email: normalizedEmail }).select('+password');

  if (!user) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const token = generateToken(user);

  res.json({
    success: true,
    message: 'Login successful',
    token,
    user: sanitizeUser(user),
  });
};

module.exports = {
  signup,
  login,
};
