/**
 * @category   LDAP Connection
 * @copyright  Copyright (c) 2018 Media intellects Inc. All rights reserved.
 * The contents of this file represent Media Intellects Inc. trade secrets and are confidential.
 * Use outside of Media Intellects Inc. is prohibited and in violation of copyright laws.
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
