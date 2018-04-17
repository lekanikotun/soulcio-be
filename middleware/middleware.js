/**
 * @category   Middleware
 * @copyright  Copyright (c) 2018 Media intellects Inc. All rights reserved.
 * The contents of this file represent Media Intellects Inc. trade secrets and are confidential.
 * Use outside of Media Intellects Inc. is prohibited and in violation of copyright laws.
 */

'use strict';

const expressJwt = require('express-jwt');
const fs = require('fs');
const RSA_PUBLIC_KEY = fs.readFileSync(process.env.JWT_PUBLIC_KEY);
// const AuthUtil = require('../utils/authUtil');

const Middleware = ({ logger }) => {

  // const { validateJWT } = AuthUtil(logger);

  /**
   * Check if a user is logged in
   * @param req
   * @param res
   * @param next
   * @return {Boolean}
   */
  const isLoggedIn = (req, res) => {
    if (!req.authorization) {
      return res.status(401).json({ error: true, message: 'Unauthorized user.' });
    } else {
      return expressJwt({ secret: RSA_PUBLIC_KEY });
    }
  };

  return {
    isLoggedIn
  };
};

module.exports = Middleware;
