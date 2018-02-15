/**
 * @category   Staging Configuration
 * @package    Soulcio
 * @copyright  Copyright (c) 2018 Media intellects Inc. All rights reserved.
 * @license    https://www.mediaintellects.com/license/
 * @author     Media Intellects Inc. <info@mediaintellects.com>
 * The contents of this file represent Media Intellects Inc. trade secrets and are confidential.
 * Use outside of Media Intellects Inc. is prohibited and in violation of copyright laws.
 */

'use strict';

module.exports = {
  BBGSIDPrefix: 'BBG',
  server: {
    domain: 'localhost',
    webServerURIPrefix: '',
    httpPort: 3000,
    httpsPort: 443,
    sslEnabled: true
  },

  jwt: {
    enabled: false,
    expires: 20 * 600000
  },

  cookie: {
    domain: 'localhost',
    proxy: true,
    secure: true
  },

  session: {
    cookieName: 'CIRT_SESS',
    ttl: 200 * 60
  },
  security: {
    crossOriginResourceSharing: {
      enabled: true,
      whitelist: [
        'http://localhost:3000'
      ]
    }
  },

  mongodb: {
    host: '127.0.0.1',
    port: '27017',
    db: 'soulcio',
    timeout: 10000
  },

  redis: {
    host: '127.0.01',
    port: '6379',
    password: '',
    creds: '',
    prefix: 'SOULCIO-',
    timeout: 4000
  },

  ldap: {
    host: 'ldap://192.168.50.12',
    port: '20389',
    baseDN: 'dc=bloomberg,dc=com',
    bindDN: 'cn=ADMINUSER,dc=bloomberg,dc=com',
    groupSearchFilter: '(&(objectClass=groupOfNames)(member=cn=USERNAME,dc=Clients,dc=bloomberg,dc=com))',
    groupsFilter: '(&(cn=*)(objectClass=groupofnames))',
    groupPrefix: ''
  },

  garbageCollection: {
    maximumMemory: 300,
    checkingCycle: 12 * 60
  }
};
