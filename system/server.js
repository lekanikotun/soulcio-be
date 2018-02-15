/**
 * @category   Server
 * @package    Soulcio
 * @copyright  Copyright (c) 2018 Media intellects Inc. All rights reserved.
 * @license    https://www.mediaintellects.com/license/
 * @author     Media Intellects Inc. <info@mediaintellects.com>
 * The contents of this file represent Media Intellects Inc. trade secrets and are confidential.
 * Use outside of Media Intellects Inc. is prohibited and in violation of copyright laws.
 */

'use strict';

/**
 * Module dependencies.
 */

const debug = require('debug')('soulcio:server');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const Server = ({ app, config, logger }) => {
  const port = config.server.sslEnabled ? config.server.httpsPort : config.server.httpPort;
  let isSSL = false;

  const sslCert = () => {
    if (config.server.sslEnabled) {
      const sslKey = path.normalize(process.env.SSL_KEY);
      const sslCrt = path.normalize(process.env.SSL_CERT);

      let key;
      let cert;

      try {
        key = fs.readFileSync(sslKey, 'utf8');
        cert = fs.readFileSync(sslCrt, 'utf8');
      } catch (e) {
        logger.warn('Not able to read ssl cert keys');
        logger.error(e);
        return null;
      }
      return {
        key,
        cert
      };
    }
    return null;
  };

  const createServer = () => {
    const options = sslCert();
    if (options) {
      logger.info('HTTPS enabled');
      isSSL = true;
      return https.createServer(options, app);
    }
    logger.info('HTTPS disabled');
    return http.createServer(app);
  };

  function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }
    switch (error.code) {
      case 'EACCES':
        logger.error(`${port} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        logger.error(`${port} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  function onListening() {
    debug(`Listening on ${port}`);
    console.log(`
▒█▀▀▀█ ▀▀█▀▀ █▀▀█ █▀▀█ ▀▀█▀▀ ░▀░ █▀▀▄ █▀▀▀ 
░▀▀▀▄▄ ░░█░░ █▄▄█ █▄▄▀ ░░█░░ ▀█▀ █░░█ █░▀█ 
▒█▄▄▄█ ░░▀░░ ▀░░▀ ▀░▀▀ ░░▀░░ ▀▀▀ ▀░░▀ ▀▀▀▀

▒█▀▀▀█ █▀▀ █▀▀█ ▀█░█▀ █▀▀ █▀▀█ ░ ░ ░ 
░▀▀▀▄▄ █▀▀ █▄▄▀ ░█▄█░ █▀▀ █▄▄▀ ▄ ▄ ▄ 
▒█▄▄▄█ ▀▀▀ ▀░▀▀ ░░▀░░ ▀▀▀ ▀░▀▀ █ █ █
`);
    logger.info(`Server started ${isSSL ? 'with HTTPS ' : ''}listening on port ${port}`);
  }

  const server = createServer();
  app.set('port', port);
  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);

  return server;
};

module.exports = Server;

