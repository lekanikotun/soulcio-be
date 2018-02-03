'use strict';

const express = require('express');
const router = express.Router();

const DevRoutes = (options) => {

  router.get('/', (req, res) => {
    res.send('<html><body>you are in DEV routes</body>');
  });

  return router;

};

module.exports = DevRoutes;
