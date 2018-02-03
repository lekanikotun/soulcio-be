/**
 * Active Directory
 */

'use strict';

const ActiveDirectory = require('activedirectory');

module.exports = (config) => {
  const ldapConfig = config.ldap;
  const options = {
    url: `${ldapConfig.host}:${ldapConfig.port}`,
    baseDN: ldapConfig.baseDN
  };

  return new ActiveDirectory(options);
};
