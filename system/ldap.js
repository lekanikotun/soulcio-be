/**
 * @category   LDAP Connection
 * @package    Soulcio
 * @copyright  Copyright (c) 2018 Media intellects Inc. All rights reserved.
 * @license    http://www.mediaintellects.com/license/
 * @author     Media Intellects Inc. <info@mediaintellects.com>
 * The contents of this file represent Media Intellects trade secrets and are confidential.
 * Use outside of Media Intellects is prohibited and in violation of copyright laws.
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
