/**
 * @category   Session Utility
 * @package    Soulcio Inc.
 * @copyright  Copyright (c) 2018 Media intellects Inc. All rights reserved.
 * @license    http://www.mediaintellects.com/license/
 * @author     Media Intellects Inc. <info@mediaintellects.com>
 * The contents of this file represent Media Intellects trade secrets and are confidential.
 * Use outside of Media Intellects is prohibited and in violation of copyright laws.
 */

'use strict';

const Promise = require('bluebird');

const SessionUtil = () => {

  const destroy = (req) => {
    return new Promise((resolve, reject) => {
      return req.session.destroy(err => {
        if (err) reject(err);
        resolve({ status_code: 204 });
      });
    });
  };

  const regenerate = (req) => {
    return new Promise((resolve, reject) => {
      return req.session.regenerate(err => {
        if (err) reject(err);
        resolve({ status_code: 204 });
      });
    });
  };

  const reload = (req) => {
    return new Promise((resolve, reject) => {
      return req.session.reload(err => {
        if (err) reject(err);
        resolve({ status_code: 204 });
      });
    });
  };

  return {
    destroy,
    regenerate,
    reload
  };
};

module.exports = SessionUtil;
