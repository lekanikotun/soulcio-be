/**
 * @category   Middleware Loader
 * @copyright  Copyright (c) 2018 Media intellects Inc. All rights reserved.
 * The contents of this file represent Media Intellects Inc. trade secrets and are confidential.
 * Use outside of Media Intellects Inc. is prohibited and in violation of copyright laws.
 */

'use strict';

const bodyParser = require('./middleware/bodyParser');
const cookieParser = require('./middleware/cookieParser');
const session = require('./middleware/session');
const headers = require('./middleware/resHeaders');

const loadMiddleware = (options) => {
  bodyParser(options);
  cookieParser(options);
  headers(options);
  session(options);
};

module.exports = loadMiddleware;
