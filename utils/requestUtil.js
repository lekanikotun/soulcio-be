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

const RequestUtil = (config) => {

  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  const generateAPIUrl = (resource) => {
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
    let options = {
      uri: resource.uri,
      json: true,
      headers: resource.headers,
      timeout: resource.timeout || config.request.timeout
    };
    return rp(options)
      .catch(err => {
        throw err;
      });
  };

  const post = (uri, data, headers = {}) => {
    let options = {
      uri,
      method: 'POST',
      json: true,
      body: data,
      headers
    };
    return rp(options)
      .catch(err => {
        throw err;
      });
  };

  const formPost = (uri, data, headers = {}) => {
    let options = {
      uri,
      method: 'POST',
      json: true,
      form: data,
      headers
    };
    return rp(options)
      .catch(err => {
        throw err;
      });
  };

  return {
    get,
    post,
    formPost,
    generateAPIUrl
  };
};

module.exports = RequestUtil;
