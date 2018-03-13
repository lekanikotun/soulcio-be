/**
 * @category   Auth Utility
 * @package    Soulcio Inc.
 * @copyright  Copyright (c) 2018 Media intellects Inc. All rights reserved.
 * @license    https://www.mediaintellects.com/license/
 * @author     Media Intellects Inc. <info@mediaintellects.com>
 * The contents of this file represent Media Intellects Inc. trade secrets and are confidential.
 * Use outside of Media Intellects Inc. is prohibited and in violation of copyright laws.
 */

'use strict';

const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const fs = require('fs');
const Promise = require('bluebird');

const AuthUtil = (logger) => {

  return {
    getJWT(uuid) {
      const RSA_PRIVATE_KEY = fs.readFileSync(process.env.JWT_PRIVATE_KEY);
      return new Promise((resolve, reject) => {
        return jwt.sign({ uuid }, RSA_PRIVATE_KEY, {
          algorithm: 'RS256',
          expiresIn: 120,
          subject: uuid
        }, (err, token) => {
          if (err) {
            reject(err);
          }
          resolve(token);
        });
      });
    },

    validateJWT() {
      const RSA_PUBLIC_KEY = fs.readFileSync(process.env.JWT_PUBLIC_KEY);
      let tokenData = expressJwt({ secret: RSA_PUBLIC_KEY });
      logger.info('Token DATA', tokenData);
      return tokenData;
    }
  };
};

module.exports = AuthUtil;
