import logger from "../utils/logger.js";

function errorHandler(error, req, res, next) {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal server error";

  logger.error("Request failed.", {
    method: req.method,
    path: req.originalUrl,
    statusCode,
    message,
    details: error.details || null
  });

  res.status(statusCode).json({
    success: false,
    message,
    details: error.details || undefined
  });
}

export default errorHandler;
