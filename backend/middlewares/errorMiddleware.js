// Custom error handling middleware
function errorHandler(err, req, res, next) {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);

  // print stack trace only in development
  if (process.env.NODE_ENV === "production") {
    res.json({ message: err.message });
  } else {
    res.json({
      message: err.message,
      stack: err.stack,
    });
  }
}

module.exports = errorHandler;
