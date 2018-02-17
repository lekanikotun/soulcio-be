/**
 * @category   Middleware
 * @package    Soulcio
 * @copyright  Copyright (c) 2018 Media intellects Inc. All rights reserved.
 * @license    http://www.mediaintellects.com/license/
 * @author     Media Intellects Inc. <info@mediaintellects.com>
 * The contents of this file represent Media Intellects Inc. trade secrets and are confidential.
 * Use outside of Media Intellects Inc. is prohibited and in violation of copyright laws.
 */

'use strict';

const Middleware = ({ logger }) => {

  /**
   * Check if a user is logged in
   * @param req
   * @param res
   * @param next
   * @return {Boolean}
   */
  const isLoggedIn = (req, res, next) => {
    if ((req.session
      && req.session.oauth_token
      && req.session.oauth_secret)
      || (req.body.email && req.body.password)
    ) {
      return next();
    }

    logger.error('LoginController', 'Username and password required');
    return res.status(401).json({
      error: {
        name: 'unauthorized',
        message: 'Authentication required.'
      }
    });
  };

  return {
    isLoggedIn
  };
};

module.exports = Middleware;
