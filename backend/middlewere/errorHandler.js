import AppError from "../utils/AppError.js";

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (error, req, res, next) => {
  let statusCode = 500;
  let errorResponse = {
    message: "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? null : error.stack,
  };

  // Handle known errors
  if (error instanceof AppError) {
    // Handle custom application error
    statusCode = error.httpCode;
    errorResponse = error.toJSON().error;
  } else if (error.name === "ValidationError") {
    // Handle Mongoose validation errors
    statusCode = 400;
    errorResponse = {
      message: "Validation Error",
      errors: Object.values(error.errors).map((err) => err.message),
    };
  } else if (error.name === "CastError" && error.kind === "ObjectId") {
    // Handle invalid ObjectId errors
    statusCode = 400;
    errorResponse.message = "Invalid ID";
  } else if (error.name === "JsonWebTokenError") {
    // Handle JWT errors
    statusCode = 401;
    errorResponse.message = "Unauthorized";
  } else if (error.name === "TokenExpiredError") {
    // Handle expired JWT errors
    statusCode = 401;
    errorResponse.message = "Token Expired";
  } else if (error.name === "DuplicateKeyError") {
    statusCode = 400;
    errorResponse.message = error.message;
  } else {
    statusCode = error.httpCode || 500;
    errorResponse.message = error?.message || "Internal Server Error";
  }

  res.status(statusCode).json({
    status: "failed",
    ...errorResponse,
  });
};

export { notFound, errorHandler };
