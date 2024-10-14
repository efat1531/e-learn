class AppError extends Error {
  constructor(name, httpCode, description, isOperational = true, cause = null) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;
    this.date = new Date();
    this.cause = cause;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  toJSON() {
    return {
      error: {
        name: this.name,
        message: this.message,
        httpCode: this.httpCode,
        isOperational: this.isOperational,
        date: this.date,
        cause: this.cause,
        stack: process.env.NODE_ENV === "production" ? null : this.stack,
      },
    };
  }

  static badRequest(message) {
    return new AppError("Bad Request", 400, message);
  }

  static notFound(message) {
    return new AppError("Not Found", 404, message);
  }

  static internalServerError(message) {
    return new AppError("Internal Server Error", 500, message, false);
  }

  static unauthorized(message) {
    return new AppError("Unauthorized", 401, message);
  }

  static notLoggedIn(message) {
    return new AppError("Not Logged In", 401, message);
  }

  static forbidden(message) {
    return new AppError("Forbidden", 403, message);
  }

  static notImplemented(message, cause) {
    return new AppError("Not Implemented", 501, message, false, cause);
  }

  static validationError(message, cause) {
    return new AppError("Validation Error", 400, message, true, cause);
  }

  static serviceUnavailable(message, cause) {
    return new AppError("Service Unavailable", 503, message, false, cause);
  }
}

export default AppError;
