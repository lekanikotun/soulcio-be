/**
 * Development Config
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

  garbageCollection: {
    maximumMemory: 300,
    checkingCycle: 12 * 60
  }
};
