/**
 * @category   Dev Configuration
 * @package    Soulcio
 * @copyright  Copyright (c) 2018 Media intellects Inc. All rights reserved.
 * @license    https://www.mediaintellects.com/license/
 * @author     Media Intellects Inc. <info@mediaintellects.com>
 * The contents of this file represent Media Intellects Inc. trade secrets and are confidential.
 * Use outside of Media Intellects Inc. is prohibited and in violation of copyright laws.
 */

'use strict';

module.exports = {
  server: {
    domain: 'localhost',
    webServerURIPrefix: '',
    httpPort: 8000,
    httpsPort: 8443,
    sslEnabled: true
  },

  request: {
    host: 'https://localhost',
    port: '443',
    baseUrl: 'soulcio/api/rest',
    timeout: 2 * 60 * 1000
  },

  cookie: {
    domain: 'localhost',
    path: '/',
    HttpOnly: true,
    secure: true
  },

  session: {
    prefix: 'soulcio_sess:',
    proxy: true,
    resave: false,
    saveUninitialized: false,
    ttl: 20 * 60
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

  garbageCollection: {
    maximumMemory: 300,
    checkingCycle: 12 * 60
  },

  api: {
    SE: {
      base: {
        host: 'https://localhost',
        port: '',
        baseUrl: 'soulcio/api/rest',
        timeout: 2 * 60 * 1000,
        headers: {
          Accept: 'application/json',
          oauth_consumer_key: process.env.CONSUMER_KEY,
          oauth_consumer_secret: process.env.CONSUMER_SECRET
        }
      },
      login: {
        uri: 'login'
      },
      logout: {
        uri: 'logout'
      },
      forgot: {
        uri: 'forgot-password'
      },
      signup: {
        uri: 'signup'
      },
      signupValidation: {
        uri: 'signup/validations'
      }
    }
  }
};
