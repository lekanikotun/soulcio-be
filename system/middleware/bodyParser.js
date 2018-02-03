/**
 * Body Parser Middleware
 */

'use strict';

// Load Modules
const bodyParser = require('body-parser');

module.exports = ({ app }) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(bodyParser.text());
};
