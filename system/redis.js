/**
 * @category   Redis Connection
 * @copyright  Copyright (c) 2018 Media intellects Inc. All rights reserved.
 * The contents of this file represent Media Intellects Inc. trade secrets and are confidential.
 * Use outside of Media Intellects Inc. is prohibited and in violation of copyright laws.
 */

'use strict';

const Redis = require('ioredis');

module.exports = (app, config, logger) => {
  const options = {
    host: config.redis.host,
    port: config.redis.port,
    connectTimeout: config.redis.timeout
  };
  const redisClient = new Redis(options);

  redisClient.on('error', (err) => {
    logger.error(`Failed to connect to redis at ${config.redis.host}:${config.redis.port}. Retrying every 1 second`);
    logger.error(err);
  });

  return redisClient;
};
