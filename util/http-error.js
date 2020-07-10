const httpStatus = require('http-status-codes');

class HttpError extends Error {
  constructor(message, statusCode) {
    super();
    this.message = message || 'An unknown error occurred.';
    this.code = statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  }
}

module.exports = HttpError;
