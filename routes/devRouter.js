/**
 * @category   Dev Router
 * @copyright  Copyright (c) 2018 Media intellects Inc. All rights reserved.
 * The contents of this file represent Media Intellects Inc. trade secrets and are confidential.
 * Use outside of Media Intellects Inc. is prohibited and in violation of copyright laws.
 */

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
