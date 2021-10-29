module.exports = (err, req, res) => {
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).json({
    success: false,
    error: err,
    errMessage: err.message,
    stack: err.stack,
  });
};
