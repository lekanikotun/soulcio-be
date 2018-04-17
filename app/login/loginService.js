/**
 * @category   Login Service
 * @copyright  Copyright (c) 2018 Media intellects Inc. All rights reserved.
 * The contents of this file represent Media Intellects Inc. trade secrets and are confidential.
 * Use outside of Media Intellects Inc. is prohibited and in violation of copyright laws.
 */

'use strict';

const uuidv4 = require('uuid/v4');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const Promise = require('bluebird');
const RequestUtil = require('../../utils/requestUtil');

const LoginService = (config, logger) => {

  const requestUtil = RequestUtil(config, logger);

  /**
   * Social Engine Authentication
   * @param {string} email
   * @param {string} password
   * @param {string} ip
   */
  const doLogin = (email, password, ip) => {
    let configSE = config.api.SE;
    let resourceSE = Object.assign(configSE.base, configSE.login);
    let uri = requestUtil.generateAPIUrl(resourceSE);
    let headers = configSE.base.headers;
    let formData = {
      email,
      password,
      ip
    };
    return requestUtil.formPost(uri, formData, headers)
      .then(response => {
        if (response.error || !response.body) {
          return Promise.reject(response);
        }
        return response;
      });
  };

  /**
   * Update user session after update
   * @param req
   * @param responseBody
   */
  const sessionUpdate = (req, responseBody) => {
    req.session.oauth_token = responseBody.oauth_token;
    req.session.oauth_secret = responseBody.oauth_secret;
    req.session.user = responseBody.user;
  };

  const getFields = () => {
    let configSE = config.api.SE;
    let resourceSE = Object.assign(configSE.base, configSE.login);
    let resource = {
      uri: requestUtil.generateAPIUrl(resourceSE),
      headers: configSE.base.headers
    };
    return requestUtil.get(resource);
  };

  /**
   * Get Json Web Token
   */
  const getJWT = () => {
    const uuid = uuidv4();
    const RSA_PRIVATE_KEY = fs.readFileSync(process.env.JWT_PRIVATE_KEY);
    return new Promise((resolve, reject) => {
      return jwt.sign({}, RSA_PRIVATE_KEY, {
        algorithm: 'RS256',
        expiresIn: 120,
        subject: uuid
      }, (err, token) => {
        if (err) {
          reject(err);
        }
        resolve({ token, uuid });
      });
    });
  };

  return {
    doLogin,
    sessionUpdate,
    getFields,
    getJWT
  };

};

module.exports = LoginService;
