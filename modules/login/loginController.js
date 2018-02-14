/**
 * @category   Login Controller
 * @package    Soulcio
 * @copyright  Copyright (c) 2018 Media intellects Inc. All rights reserved.
 * @license    http://www.mediaintellects.com/license/
 * @author     Media Intellects Inc. <info@mediaintellects.com>
 * The contents of this file represent Media Intellects trade secrets and are confidential.
 * Use outside of Media Intellects is prohibited and in violation of copyright laws.
 */

'use strict';

const Promise = require('bluebird');
const RequestUtil = require('../../utils/requestUtil');

const LoginController = ({ config, logger }) => {

  const requestUtil = RequestUtil(config, logger);

  const get = (req, res) => {
    let configSE = config.api.SE;
    let resourceSE = Object.assign(configSE.base, configSE.login);
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
        logger.error('LoginController', err);
        res.status(400).send('An error occurred');
      });
  };

  const post = (req, res) => {
    let configSE = config.api.SE;
    let resourceSE = Object.assign(configSE.base, configSE.login);
    let uri = requestUtil.generateAPIUrl(resourceSE);
    let body = req.body;
    let headers = configSE.base.headers;
    let ipArr = req.ip.split(':');
    let ip = ipArr[ipArr.length - 1];
    let formData = {
      email: body.email,
      password: body.password,
      ip
    };
    return requestUtil.formPost(uri, formData, headers)
      .then(response => {
        if (response.status_code !== 200) {
          return Promise.reject(response);
        }
        return res.status(200).json(response);
      })
      .catch(err => {
        logger.error('LoginController', err);
        res.status(400).send('An error occurred');
      });
  };

  return {
    get,
    post
  };

};

module.exports = LoginController;
