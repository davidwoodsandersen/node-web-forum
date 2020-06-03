const httpStatus = require('http-status-codes');

class HttpError extends Error {
  constructor(code, message) {
    super();
    this.code = code || httpStatus.INTERNAL_SERVER_ERROR;
    this.message = message || 'An unknown error occurred.';
  }
}

module.exports = HttpError;
