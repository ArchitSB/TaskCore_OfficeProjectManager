class ApiError extends Error {
  constructor(statusCode, message, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}

const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || err.statusCode || 500;

  if (process.env.NODE_ENV !== 'test') {
    console.error(err);
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal server error',
    details: err.details || null,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

module.exports = {
  ApiError,
  notFoundHandler,
  errorHandler,
};
