/**
 * Authentication
 */

'use strict';

const constants = require('.././constants');

const Authenticate = () => {
  /**
   * Authenticate User and get User Groups - Active Directive
   * @param req
   * @param res
   * @param next
   * @returns {Promise}
   */
  const login = (req, res, next) => {
    return next();
  };

  /**
   * Logs out user
   * @param req
   * @param res
   * @param next
   * @return {Promise}
   */
  const logout = (req, res, next) => {
    return next();
  };

  return {
    login,
    logout
  };
};

module.exports = Authenticate;
