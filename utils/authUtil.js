/**
 * @category   Auth Utility
 * @copyright  Copyright (c) 2018 Media intellects Inc. All rights reserved.
 * The contents of this file represent Media Intellects Inc. trade secrets and are confidential.
 * Use outside of Media Intellects Inc. is prohibited and in violation of copyright laws.
 */

'use strict';

const expressJwt = require('express-jwt');
const fs = require('fs');

const AuthUtil = (logger) => {

  return {
    validateJWT() {
      const RSA_PUBLIC_KEY = fs.readFileSync(process.env.JWT_PUBLIC_KEY);
      let tokenData = expressJwt({ secret: RSA_PUBLIC_KEY });
      logger.info('Token DATA', tokenData);
      return tokenData;
    }
  };
};

module.exports = AuthUtil;
