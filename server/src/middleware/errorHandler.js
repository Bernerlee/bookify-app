const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Unique constraint violation
  if (err.code === "P2002") {
    return res.status(409).json({
      success: false,
      message: "A record with this information already exists",
    });
  }

  // Foreign key constraint violation
  if (err.code === "P2003") {
    return res.status(409).json({
      success: false,
      message: "This operation conflicts with an existing relationship",
    });
  }

  // Required record not found
  if (err.code === "P2025") {
    return res.status(404).json({
      success: false,
      message: "Record not found",
    });
  }

  // Database connection error
  if (err.code === "P1001") {
    return res.status(503).json({
      success: false,
      message: "Database server is unavailable",
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};

export default errorHandler;
