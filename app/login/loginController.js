/**
 * @category   Login Controller
 * @copyright  Copyright (c) 2018 Media intellects Inc. All rights reserved.
 * The contents of this file represent Media Intellects Inc. trade secrets and are confidential.
 * Use outside of Media Intellects Inc. is prohibited and in violation of copyright laws.
 */

'use strict';

const co = require('co');
const LoginService = require('./loginService');
const DBUtil = require('../../utils/dbUtil');
const constants = require('../../data/constants');

const LoginController = ({ db, config, logger }) => {

  const { doLogin, getFields, getJWT } = LoginService(config, logger);
  const { addRecord } = DBUtil(db, config);

  const get = (req, res) => {
    co(function* () {
      let response = yield getFields();
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
    if (!req.body.email || !req.body.password) {
      res.status(401).json({ error: true, message: 'Username and password required.' });
    }
    co(function* () {
      let reqBody = Object.assign(req.body);
      logger.info(`User attempting to authenticate with email ${reqBody.email}`);
      let response = yield doLogin(reqBody.email, reqBody.password, req.ipAddress);
      let userData = response.body;
      let { token, uuid } = yield getJWT();
      yield addRecord(constants.COL_USER_SESSION, { userData, uuid });
      res.status(200).json({ data: { user: userData.user, token: token } });
    }).catch(err => {
      logger.error('LoginController', err);
      res.status(401).json({ error: true, message: 'Unable to authenticate user.' });
    });
  };

  return {
    get,
    authenticate
  };

};

module.exports = LoginController;
