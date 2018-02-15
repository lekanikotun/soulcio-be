/**
 * @category   Sign Up Controller
 * @package    Soulcio Inc.
 * @copyright  Copyright (c) 2018 Media intellects Inc. All rights reserved.
 * @license    https://www.mediaintellects.com/license/
 * @author     Media Intellects Inc. <info@mediaintellects.com>
 * The contents of this file represent Media Intellects Inc. trade secrets and are confidential.
 * Use outside of Media Intellects Inc. is prohibited and in violation of copyright laws.
 */

'use strict';

const Promise = require('bluebird');
const RequestUtil = require('../../utils/requestUtil');

const SignupController = ({ config, logger }) => {

  const requestUtil = RequestUtil(config, logger);

  const get = (req, res) => {
    let configSE = config.api.SE;
    let resourceSE = Object.assign(configSE.base, configSE.signup);
    let resource = {
      uri: requestUtil.generateAPIUrl(resourceSE),
      headers: configSE.base.headers
    };
    requestUtil
      .get(resource)
      .then(response => {
        res.status(200).json(response);
      })
      .catch(err => {
        logger.error('SignupController', err);
        res.status(400).send('An error occurred');
      });
  };

  const post = (req, res) => {
    let configSE = config.api.SE;
    let resourceSE = Object.assign(configSE.base, configSE.login);
    let uri = requestUtil.generateAPIUrl(resourceSE);
    let body = req.body;
    let headers = configSE.base.headers;
    let formData = {
      email: body.email,
      password: body.password,
      passconf: body.passconf,
      username: body.username,
      timezone: body.timezone,
      language: body.language,
      terms: body.terms,
      '1_1_3_alias_first_name': body.firstname,
      '1_1_4_alias_last_name': body.lastname
    };
    return requestUtil.formPost(uri, formData, headers)
      .then(response => {
        if (response.status_code !== 200) {
          return Promise.reject(response);
        }
        let responseBody = response.body;
        req.session.oauth_token = responseBody.oauth_token;
        req.session.oauth_secret = responseBody.oauth_secret;
        req.session.user = responseBody.user;
        return res.status(200).json(response);
      })
      .catch(err => {
        logger.error('LoginController', err);
        res.status(400).send('An error occurred');
      });
  };

  const validation = (req, res) => {
    let configSE = config.api.SE;
    let resourceSE = Object.assign(configSE.base, configSE.login);
    let uri = requestUtil.generateAPIUrl(resourceSE);
    let body = req.body;
    let headers = configSE.base.headers;
    let formData = {
      email: body.email,
      password: body.password,
      passconf: body.passconf,
      username: body.username,
      timezone: body.timezone,
      language: body.language,
      terms: body.terms,
      '1_1_3_alias_first_name': body.firstname,
      '1_1_4_alias_last_name': body.lastname
    };
    return requestUtil.formPost(uri, formData, headers)
      .then(response => {
        if (response.status_code !== 200) {
          return Promise.reject(response);
        }
        let responseBody = response.body;
        req.session.oauth_token = responseBody.oauth_token;
        req.session.oauth_secret = responseBody.oauth_secret;
        req.session.user = responseBody.user;
        return res.status(200).json(response);
      })
      .catch(err => {
        logger.error('SignuoController', err);
        res.status(400).send('An error occurred');
      });
  };

  return {
    get,
    post,
    validation
  };

};

module.exports = SignupController;
