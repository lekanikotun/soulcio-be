/**
 * @category   Forgot Password Controller
 * @copyright  Copyright (c) 2018 Media intellects Inc. All rights reserved.
 * The contents of this file represent Media Intellects Inc. trade secrets and are confidential.
 * Use outside of Media Intellects Inc. is prohibited and in violation of copyright laws.
 */

'use strict';

const Promise = require('bluebird');
const RequestUtil = require('../../utils/requestUtil');

const ForgotPasswordController = ({ config, logger }) => {

  const requestUtil = RequestUtil(config, logger);

  const post = (req, res) => {
    let configSE = config.api.SE;
    let resourceSE = Object.assign(configSE.base, configSE.forgot);
    let uri = requestUtil.generateAPIUrl(resourceSE);
    let body = {
      email: req.body.email
    };
    let headers = configSE.base.headers;
    return requestUtil.formPost(uri, body, headers)
      .then(response => {
        if (response.status_code !== 204) {
          return Promise.reject(response);
        }
        return res.status(200).json(response);
      })
      .catch(err => {
        logger.error('Login', err);
        res.status(400).send('An error occurred');
      });
  };

  return {
    post
  };
};

module.exports = ForgotPasswordController;

