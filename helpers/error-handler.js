function invalidRequestError(
  message = "Invalid request ",
  code = 400,
  ErrorClass = Error
) {
  const error = new ErrorClass();
  return Object.assign(error, {
    status: code,
    name: "Bad Request",
    message: message
  });
}

function unauthorizedError(
  message = "You don't have permission to make this call",
  code = 401,
  ErrorClass = Error
) {
  const error = new ErrorClass();
  return Object.assign(error, {
    status: code,
    name: "Unauthorized",
    message: message
  });
}

function forbidden(
  message = "You don't have permission to make this call",
  code = 403,
  ErrorClass = Error
) {
  const error = new ErrorClass();
  return Object.assign(error, {
    status: code,
    name: "Forbidden",
    message: message
  });
}

function notFoundError(
  message = "Record not found",
  code = 404,
  ErrorClass = Error
) {
  const error = new ErrorClass();
  return Object.assign(error, {
    status: code,
    name: "Not Found",
    message: message
  });
}

function methodNotAllowedError(
  message = "That method is not allowed",
  code = 405,
  ErrorClass = Error
) {
  const error = new ErrorClass();
  return Object.assign(error, {
    status: code,
    name: "Method Not Allowed",
    message: message
  });
}

function internalServerError(
  message = "Something went wrong. Please contact the system administrator.!",
  code = 500,
  ErrorClass = Error
) {
  message = message.message || message;
  const error = new ErrorClass();
  return Object.assign(error, {
    status: code,
    name: "Internal Server Error",
    message: message
  });
}

function customError(
  message = "Something went wrong. Please contact the system administrator.!",
  code = 500,
  ErrorClass = Error
) {
  const error = new ErrorClass();
  return Object.assign(error, {
    status: code,
    name: "Error",
    message: message
  });
}

module.exports = {
  invalidRequestError,
  unauthorizedError,
  forbidden,
  notFoundError,
  methodNotAllowedError,
  internalServerError,
  customError
};
