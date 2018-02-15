/**
 * @category   Custom Error
 * @package    Soulcio
 * @copyright  Copyright (c) 2018 Media intellects Inc. All rights reserved.
 * @license    https://www.mediaintellects.com/license/
 * @author     Media Intellects Inc. <info@mediaintellects.com>
 * The contents of this file represent Media Intellects Inc. trade secrets and are confidential.
 * Use outside of Media Intellects Inc. is prohibited and in violation of copyright laws.
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
