/**
 * @category   API Router
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

const LoginController = require('../modules/login/loginController');
const LogoutController = require('../modules/logout/logoutController');

// middleware

// Controllers

module.exports = (options) => {
  // init middleware

  // routes
  router.get('/hello', (req, res) => { res.send('Hello World!'); });

  // routes
  router.get('/login',
    LoginController(options).get
  );

  router.post(
    '/login',
    LoginController(options).post
  );

  router.post(
    '/logout',
    LogoutController(options).post
  );

  return router;
};
