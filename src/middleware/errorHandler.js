  // Simple centralized error handler
module.exports = (err, req, res, next) => {
  // Log full stack for easier debugging in dev
  console.error(err.stack || err);
  const status = err.status || 500;
  const payload = { error: err.message || 'Internal Server Error' };
  if (process.env.NODE_ENV !== 'production') payload.stack = err.stack;
  res.status(status).json(payload);
};
