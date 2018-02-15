/**
 * @category   API Router
 * @package    Soulcio
 * @copyright  Copyright (c) 2018 Media intellects Inc. All rights reserved.
 * @license    https://www.mediaintellects.com/license/
 * @author     Media Intellects Inc. <info@mediaintellects.com>
 * The contents of this file represent Media Intellects Inc. trade secrets and are confidential.
 * Use outside of Media Intellects Inc. is prohibited and in violation of copyright laws.
 */

'use strict';

const express = require('express');
const router = express.Router();

const LoginController = require('../modules/login/loginController');
const LogoutController = require('../modules/logout/logoutController');
const ForgotPasswordController = require('../modules/forgotPassword/forgotPasswordController');
const SignupController = require('../modules/signup/signupController');

module.exports = (options) => {

  // routes
  router.get(
    '/login',
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
  router.post(
    '/forgot-password',
    ForgotPasswordController(options).post
  );
  router.get(
    '/signup',
    SignupController(options).get
  );
  router.post(
    '/signup',
    SignupController(options).post
  );
  router.post(
    '/signup/validation',
    SignupController(options).validation
  );

  return router;
};
