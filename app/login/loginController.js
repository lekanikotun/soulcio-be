/**
 * @category   Login Controller
 * @copyright  Copyright (c) 2018 Media intellects Inc. All rights reserved.
 * The contents of this file represent Media Intellects Inc. trade secrets and are confidential.
 * Use outside of Media Intellects Inc. is prohibited and in violation of copyright laws.
 */

'use strict';

const co = require('co');
const uuidv4 = require('uuid/v4');
const LoginService = require('./loginService');
const DBUtil = require('../../utils/dbUtil');
const AuthUtil = require('../../utils/authUtil');
const constants = require('../../data/constants');

const LoginController = ({ db, config, logger }) => {

  const loginService = LoginService(config, logger);
  const dbUtil = DBUtil(db, config);
  const { getJWT, validateJWT } = AuthUtil();

  const get = (req, res) => {
    co(function* () {
      let response = yield loginService.getFields();
      res.status(200).json({
        response
      });
    }).catch(err => {
      logger.error('LoginController', err);
      res.status(400).json({
        error: {
          message: 'An error occurred.'
        }
      });
    });
  };

  const authenticate = (req, res) => {
    if (req.session
      && req.session.oauth_token
      && req.session.oauth_secret) {
      return res.status(200).json({ message: 'user already logged in.' });
    }
    if (!req.body.email || !req.body.password) {
      return res.status(401).json({
        message: 'Username and password required.'
      });
    }
    logger.info(`User attempting to authenticate with email ${req.body.email}`);
    return co(function* () {
      const uuid = uuidv4();
      let data = yield loginService.doLogin(req.body.email, req.body.password, req.ipAddress);
      let token = yield getJWT(uuid);
      let sessionData = {
        uuid,
        userData: data.body
      };
      yield dbUtil.addRecord(constants.COL_USER_SESSION, sessionData);
      res.status(200).json({ data: { user: data.body.user, token: token } });
    }).catch(err => {
      logger.error('LoginController', err);
      return res.status(401).json({ error: { message: 'Unable to authenticate user.' } });
    });
  };

  return {
    get,
    authenticate
  };

};

module.exports = LoginController;
