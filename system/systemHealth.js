/**
 * Check systems before server start
 */

'use strict';

const Promise = require('bluebird');

const SystemHealth = ({ config, db, redis, logger }) => {

  /**
   * Ping Redis to check if connected
   */
  const redisCheck = () => {
    logger.info(`checking Redis connection at ${config.redis.host}:${config.redis.port}...`);
    return redis.ping()
      .then(resp => {
        if (resp !== 'PONG') {
          return Promise.reject(new Error('Redis not available'));
        }
        logger.info('redis connection successful.');
        return resp;
      })
      .catch(err => {
        logger.error('redis connection failed.');
        throw err;
      });
  };

  /**
   * Check if MongoDB connection is available
   */
  const dbCheck = () => {
    return new Promise((resolve, reject) => {
      logger.info(`checking Mongodb connection at ${config.mongodb.host}:${config.mongodb.port}...`);
      db.collections((err, collections) => {
        if (err || !collections) {
          logger.error('mongodb connection failed.');
          reject(err);
        } else {
          logger.info('mongodb connection successful.');
          resolve();
        }
      });
    });
  };

  /**
   * Check all crucial systems for application
   * @return {Promise}
   */
  const check = () => {
    logger.info('checking system health...');
    return dbCheck()
      .then(redisCheck)
      .catch(err => {
        logger.error('Something went wrong. Critical system failure!');
        logger.error(err);
        throw err;
      });
  };

  return {
    check
  };
};

module.exports = SystemHealth;
