/**
 * Cookie Parser Middleware
 */

'use strict';

// Load Modules
const cookieParser = require('cookie-parser');

module.exports = ({ app }) => {
  app.use(cookieParser());
};
