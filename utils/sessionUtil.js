/**
 * @category   Session Utility
 * @package    Soulcio Inc.
 * @copyright  Copyright (c) 2018 Media intellects Inc. All rights reserved.
 * @license    https://www.mediaintellects.com/license/
 * @author     Media Intellects Inc. <info@mediaintellects.com>
 * The contents of this file represent Media Intellects Inc. trade secrets and are confidential.
 * Use outside of Media Intellects Inc. is prohibited and in violation of copyright laws.
 */

'use strict';

const Promise = require('bluebird');

const SessionUtil = () => {

  const destroy = (session) => {
    return new Promise((resolve, reject) => {
      return session.destroy(err => {
        if (err) reject(err);
        resolve({ status_code: 204 });
      });
    });
  };

  const regenerate = (session) => {
    return new Promise((resolve, reject) => {
      return session.regenerate(err => {
        if (err) reject(err);
        resolve({ status_code: 204 });
      });
    });
  };

  const reload = (session) => {
    return new Promise((resolve, reject) => {
      return session.reload(err => {
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
