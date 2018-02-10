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

const RequestUtil = require('../../utils/requestUtil');

const LoginController = ({ config, logger }) => {

  const requestUtil = RequestUtil(config, logger);
  const loginResource = Object.assign(config.api.soulcio_base, config.api.soulcio_login);

  const get = (req, res) => {
    requestUtil
      .get(loginResource)
      .then(response => {
        res.status(200).json(response)
      })
      .catch(err => {
        logger.error('LoginController', err);
        res.status(400).send('An error occurred');
      });
  };

  const post = (req, res) => {
    let body = req.body;
    let ipArr = req.ip.split(':');
    let ip = ipArr[ipArr.length - 1];
    let requestData = {
      email: body.email,
      password: body.password,
      ip: req.ip
    };
    requestUtil
      .post(loginResource, requestData)
      .then(response => {
        res.status(200).json(response)
      })
      .catch(err => {
        logger.error('LoginController', err);
        res.status(400).send('An error occurred');
      });
  };

  return {
    get,
    post
  }

};

module.exports = LoginController;