const Joi = require('joi');
const ApiError = require('../utils/ApiError');

const logSchema = Joi.object({
  level: Joi.string().valid('error', 'warn', 'info', 'debug').required(),
  message: Joi.string().required(),
  resourceId: Joi.string().required(),
  timestamp: Joi.string().isoDate().required(),
  traceId: Joi.string().required(),
  spanId: Joi.string().required(),
  commit: Joi.string().required(),
  metadata: Joi.object().required()
});

const validateLog = (req, res, next) => {
  const { error, value } = logSchema.validate(req.body);
  
  if (error) {
    const errorMessage = error.details.map(detail => detail.message).join(', ');
    throw new ApiError(400, `Invalid log entry: ${errorMessage}`);
  }
  
  req.validatedData = value;
  next();
};

module.exports = {
  validateLog,
  logSchema
};
