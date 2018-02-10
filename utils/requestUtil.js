/**
 * @category   Request Utility
 * @package    Soulcio
 * @copyright  Copyright (c) 2018 Media intellects Inc. All rights reserved.
 * @license    http://www.mediaintellects.com/license/
 * @author     Media Intellects Inc. <info@mediaintellects.com>
 * The contents of this file represent Media Intellects trade secrets and are confidential.
 * Use outside of Media Intellects is prohibited and in violation of copyright laws.
 */

'use strict';

const rp = require('request-promise');

const RequestUtil = (config, logger) => {

  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  const _generateUrl = (resource) => {
    return [
      resource.host,
      resource.port ? `:${resource.port}` : '',
      resource.baseUrl ? `/${resource.baseUrl}` : '',
      resource.uri ? `/${resource.uri}` : ''
    ].join('');
  };

  /**
   * GET Request
   * @param {{}} resource
   */
  const get = (resource) => {
    let uri = _generateUrl(resource);
    let options = {
      uri,
      json: resource.json || true,
      headers: resource.headers,
      timeout: resource.timeout || config.request.timeout
    };

    return rp(options)
      .catch(function (err) {
        throw err;
      });
  };

  /**
   * POST request
   * @param {{}} resource
   * @param body
   */
  const post = (resource, body) => {
    let uri = _generateUrl(resource);
    let options = {
      uri,
      method: 'POST',
      body,
      json: resource.json || true,
      headers: resource.headers,
      timeout: resource.timeout || config.request.timeout
    };

    logger.info('POST REQUEST OPTIONS', options);
    return rp(options)
      .catch(function (err) {
        throw err;
      });
  };

  return {
    get,
    post
  }
};

module.exports = RequestUtil;
