/**
 * @category   LDAP Authentication
 * @package    Soulcio
 * @copyright  Copyright (c) 2018 Media intellects Inc. All rights reserved.
 * @license    https://www.mediaintellects.com/license/
 * @author     Media Intellects Inc. <info@mediaintellects.com>
 * The contents of this file represent Media Intellects Inc. trade secrets and are confidential.
 * Use outside of Media Intellects Inc. is prohibited and in violation of copyright laws.
 */

'use strict';

const LDAPClient = require('ldap-client');
const LdapAuth = require('ldapauth-fork');
const Promise = require('bluebird');
const constants = require('.././constants');

const CustomError = require('errorUtil');

const AuthUtil = (config) => {
  const EVTE = constants.ERROR_AUTH;

  /**
   * Authenticate User
   * @param {String} username
   * @param {String} password
   */
  const login = (username, password) => {
    let ldapConfig = config.ldap;
    let options = {
      url: `${ldapConfig.host}:${ldapConfig.port}`,
      bindDN: ldapConfig.bindDN.replace(/ADMINUSER/, process.env.LDAP_USER),
      bindCredentials: process.env.LDAP_PWD,
      searchBase: ldapConfig.baseDN,
      searchFilter: `(uid=${username})`,
      searchAttributes: ['givenName', 'sn'],
      groupSearchBase: ldapConfig.baseDN,
      groupSearchFilter: ldapConfig.groupSearchFilter.replace(/USERNAME/, username),
      reconnect: true
    };
    let ldap = new LdapAuth(options);

    return new Promise((resolve, reject) => {
      const user = `cn=${username},${ldapConfig.baseDN}`;
      return ldap.authenticate(user, password, (err, auth) => {
        if (err) {
          reject(new CustomError(EVTE, err));
        }
        resolve(auth);
      });
    });
  };

  /**
   * Check if a user is logged in
   * @param req
   * @return {Boolean}
   */
  const isLoggedIn = (req) => {
    return (req.session && req.session.user);
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
