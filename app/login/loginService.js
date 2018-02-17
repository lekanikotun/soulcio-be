/**
 * @category   Login Service
 * @package    Soulcio Inc.
 * @copyright  Copyright (c) 2018 Media intellects Inc. All rights reserved.
 * @license    https://www.mediaintellects.com/license/
 * @author     Media Intellects Inc. <info@mediaintellects.com>
 * The contents of this file represent Media Intellects Inc. trade secrets and are confidential.
 * Use outside of Media Intellects Inc. is prohibited and in violation of copyright laws.
 */

'use strict';

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
    return requestUtil.formPost(uri, formData, headers);
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

  return {
    doLogin,
    sessionUpdate,
    getFields
  };

};

module.exports = LoginService;
