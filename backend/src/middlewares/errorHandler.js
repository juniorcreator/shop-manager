export const errorHandler = (err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({
    status: 500,
    message: err.message || "Something went wrong api errorHandler",
    error: err.message,
  });
};
