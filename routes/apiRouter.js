/**
 * API Router
 */

'use strict';

const express = require('express');
const router = express.Router();

// middleware

// Controllers

module.exports = (options) => {
  // init middleware

  // routes
  router.get('/new', (req, res) => { res.send('Hello World!') });

  return router;
};
