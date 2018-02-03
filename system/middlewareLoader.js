/**
 * Load Middlewares
 */

'use strict';

const bodyParser = require('./middleware/bodyParser');
const cookieParser = require('./middleware/cookieParser');
const session = require('./middleware/session');
const headers = require('./middleware/resHeaders');

const loadMiddleware = (options) => {
  bodyParser(options);
  cookieParser(options);
  session(options);
  headers(options);
};

module.exports = loadMiddleware;
