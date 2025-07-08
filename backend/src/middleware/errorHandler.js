const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');

const errorHandler = (err, req, res, next) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Something went wrong";
    error = new ApiError(statusCode, message, [], err.stack);
  }

  const response = {
    ...error,
    message: error.message,
    ...(process.env.NODE_ENV === "development" && { stack: error.stack })
  };

  return res.status(error.statusCode).json(response);
};

module.exports = errorHandler;
