/**
 * Custom Error Object
 */

'use strict';

/**
 * Error Object
 * @param eventCode
 * @param error
 * @constructor
 */
function CustomError(eventCode, error) {
  let message;
  let stack;
  if (error instanceof Error) {
    message = error.message;
    stack = error.stack;
  } else {
    message = error;
    stack = (new Error()).stack;
  }
  this.name = eventCode;
  this.message = message;
  this.stack = stack;
}

CustomError.prototype = Object.create(Error.prototype);
CustomError.prototype.constructor = CustomError;

module.exports = CustomError;
