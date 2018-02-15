/**
 * @category   Logout Controller
 * @package    Soulcio Inc.
 * @copyright  Copyright (c) 2018 Media intellects Inc. All rights reserved.
 * @license    http://www.mediaintellects.com/license/
 * @author     Media Intellects Inc. <info@mediaintellects.com>
 * The contents of this file represent Media Intellects trade secrets and are confidential.
 * Use outside of Media Intellects is prohibited and in violation of copyright laws.
 */

'use strict';

const Promise = require('bluebird');
const RequestUtil = require('../../utils/requestUtil');
const SessionUtil = require('../../utils/sessionUtil');

const LogoutController = ({ config, logger }) => {

  const requestUtil = RequestUtil(config, logger);
  const sessionUtil = SessionUtil(config, logger);

  const post = (req, res) => {
    let configSE = config.api.SE;
    let resourceSE = Object.assign(configSE.base, configSE.logout);
    let uri = requestUtil.generateAPIUrl(resourceSE);
    let headers = {
      oauth_token: req.session.oauth_token,
      oauth_secret: req.session.oauth_secret
    };
    headers = Object.assign(resourceSE.headers, headers);
    let formData = {};
    return requestUtil.formPost(uri, formData, headers)
      .then(response => {
        if (response.status_code !== 204) {
          return Promise.reject(response);
        }
        return sessionUtil.destroy(req);
      })
      .then(resp => res.status(200).json(resp))
      .catch(err => {
        logger.error('LogoutController', err);
        res.status(400).send('An error occurred');
      });
  };

  return {
    post
  };
};

module.exports = LogoutController;
