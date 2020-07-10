const httpStatus = require('http-status-codes');

class HttpError extends Error {
  constructor(err, statusCode) {
    super(err);
    this.code = err.code || statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    this.message = err.message || 'An unknown error occurred.';
  }
}

module.exports = HttpError;
