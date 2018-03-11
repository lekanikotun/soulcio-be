/**
 * @category   Login Controller
 * @package    Soulcio
 * @copyright  Copyright (c) 2018 Media intellects Inc. All rights reserved.
 * @license    https://www.mediaintellects.com/license/
 * @author     Media Intellects Inc. <info@mediaintellects.com>
 * The contents of this file represent Media Intellects Inc. trade secrets and are confidential.
 * Use outside of Media Intellects Inc. is prohibited and in violation of copyright laws.
 */

'use strict';

const uuidv4 = require('uuid/v4');
const LoginService = require('./loginService');
const DBUtil = require('../../utils/dbUtil');
const AuthUtil = require('../../utils/authUtil');
const constants = require('../../data/constants');

const LoginController = ({ db, config, logger }) => {

  const loginService = LoginService(config, logger);
  const dbUtil = DBUtil(db, config);
  const authUtil = AuthUtil();

  const get = (req, res) => {
    return loginService.getFields()
      .then(response => {
        res.status(200).json({
          response
        });
      })
      .catch(err => {
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
    const uuid = uuidv4();
    return loginService.doLogin(req.body.email, req.body.password, req.ipAddress)
      .then(data => {
        return authUtil.getJWT(uuid)
          .then(token => {
            let sessionData = {
              uuid,
              userData: data.body
            };
            return dbUtil.addRecord(constants.COL_USER_SESSION, sessionData)
              .then(() => {
                return {
                  user: data.body.user,
                  token: token
                };
              });
          });
      })
      .then(data => {
        return res.status(200).json({
          data
        });
      })
      .catch(err => {
        logger.error('LoginController', err);
        return res.status(401).json({
          error: {
            message: 'Unable to authenticate user.'
          }
        });
      });
  };

  return {
    get,
    authenticate
  };

};

module.exports = LoginController;
