const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const LogModel = require('../models/LogModel');

const createLog = asyncHandler(async (req, res) => {
  const logData = req.validatedData;
  
  const createdLog = LogModel.createLog(logData);
  
  if (!createdLog) {
    throw new ApiError(500, "Failed to persist log entry");
  }
  
  return res.status(201).json(
    new ApiResponse(201, createdLog, "Log entry created successfully")
  );
});

const getLogs = asyncHandler(async (req, res) => {
  const filters = req.query;
  
  let logs;
  
  if (Object.keys(filters).length === 0) {
    logs = LogModel.getAllLogs();
  } else {
    logs = LogModel.filterLogs(filters);
  }
  
  logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  
  return res.status(200).json(
    new ApiResponse(200, logs, "Logs retrieved successfully")
  );
});

const getHealth = asyncHandler(async (req, res) => {
  const healthData = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  };
  
  return res.status(200).json(
    new ApiResponse(200, healthData, "Service is healthy")
  );
});

module.exports = {
  createLog,
  getLogs,
  getHealth
};
