const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    Status: statusCode,
    Error: err.message || "Internal Server Error",
  });
};

module.exports = errorHandler;
