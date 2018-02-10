/**
 * @category   Dev Router
 * @package    Soulcio
 * @copyright  Copyright (c) 2018 Media intellects Inc. All rights reserved.
 * @license    http://www.mediaintellects.com/license/
 * @author     Media Intellects Inc. <info@mediaintellects.com>
 * The contents of this file represent Media Intellects trade secrets and are confidential.
 * Use outside of Media Intellects is prohibited and in violation of copyright laws.
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
