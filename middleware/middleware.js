/**
 * @category   Middleware
 * @copyright  Copyright (c) 2018 Media intellects Inc. All rights reserved.
 * The contents of this file represent Media Intellects Inc. trade secrets and are confidential.
 * Use outside of Media Intellects Inc. is prohibited and in violation of copyright laws.
 */

'use strict';

const AuthUtil = require('../utils/authUtil');

const Middleware = ({ logger }) => {

  const authUtil = AuthUtil(logger);

  /**
   * Check if a user is logged in
   * @param req
   * @param res
   * @param next
   * @return {Boolean}
   */
  const isLoggedIn = (req, res, next) => {
    let c = authUtil.validateJWT();
    logger.info('CCCCC', c);
    return next();
  };

  return {
    isLoggedIn
  };
};

module.exports = Middleware;
