/**
 * @category   LDAP Authentication
 * @copyright  Copyright (c) 2018 Media intellects Inc. All rights reserved.
 * The contents of this file represent Media Intellects Inc. trade secrets and are confidential.
 * Use outside of Media Intellects Inc. is prohibited and in violation of copyright laws.
 */

'use strict';

const Promise = require('bluebird');
const constants = require('.././constants');

const CustomError = require('errorUtil');

const AuthUtil = (config, logger) => {
  const EVTE = constants.ERROR_AUTH;

  /**
   * Check if a user is logged in
   * @param req
   * @param res
   * @param next
   * @return {Boolean}
   */
  const isLoggedIn = (req, res, next) => {
    if (req.session
      && req.session.oauth_token
      && req.session.oauth_secret) {
      return next();
    }

    if (!req.body.email || !req.body.password) {
      logger.error('LoginController', 'Username and password required');
      return res.status(401).json({
        error: {
          name: 'unauthorized',
          message: 'Authentication required.'
        }
      });
    }

    return next();
  };

  /**
   * Logs out a user and deletes the user session
   * @param req
   */
  const logout = (req) => {
    return new Promise((resolve, reject) => {
      return req.session.destroy(err => {
        if (err) {
          reject(new CustomError(EVTE, err));
        }
        resolve();
      });
    });
  };

  /**
   * Return LDAP Groups
   */
  const getLDAPGroups = () => {
    let ldapConfig = config.ldap;
    let opts = {
      base: ldapConfig.baseDN,
      filter: ldapConfig.groupsFilter,
      scope: LDAPClient.SUBTREE,
      attrs: 'cn'
    };
    let client = new LDAPClient({
      uri: `${ldapConfig.host}:${ldapConfig.port}`
    });
    return new Promise((resolve, reject) => {
      client.bind({
        binddn: ldapConfig.bindDN.replace(/ADMINUSER/, process.env.LDAP_USER),
        password: process.env.LDAP_PWD
      },
      (error) => {
        if (error) {
          reject(error);
        }
        client.search(opts, (err, data) => {
          if (err) {
            reject(err);
          }
          let groups = [];
          data.forEach(d => {
            if (d.cn[0].startsWith(config.ldap.groupPrefix)) {
              groups.push(d.cn[0]);
            }
          });
          resolve(groups);
        });
      });
    });
  };

  /**
   * Determine user role based on user group
   * @param userGroups
   * @param authRoles
   * @return {*}
   */
  const getUserRole = (userGroups, authRoles) => {
    let role;
    if (userGroups.find(ug => authRoles.admins.includes(ug.cn))) {
      role = constants.ROLE_ADMIN;
    } else if (userGroups.find(ug => authRoles.reviewers.includes(ug.cn))) {
      role = constants.ROLE_REVIEWER;
    } else if (userGroups.find(ug => authRoles.viewers.includes(ug.cn))) {
      role = constants.ROLE_VIEWER;
    }
    return role;
  };

  return {
    getLDAPGroups,
    getUserRole,
    login,
    isLoggedIn,
    logout
  };
};

module.exports = AuthUtil;
