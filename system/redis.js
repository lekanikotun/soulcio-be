/**
 * Create Redis client
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
