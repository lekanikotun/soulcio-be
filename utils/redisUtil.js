/**
 * @category   Redis Utility
 * @package    Soulcio
 * @copyright  Copyright (c) 2018 Media intellects Inc. All rights reserved.
 * @license    http://www.mediaintellects.com/license/
 * @author     Media Intellects Inc. <info@mediaintellects.com>
 * The contents of this file represent Media Intellects trade secrets and are confidential.
 * Use outside of Media Intellects is prohibited and in violation of copyright laws.
 */

'use strict';

const RedisUtil = (config, redis) => {

  /**
   * Add hashTable to Redis with key
   * @param key
   * @param hash
   * @return {Promise}
   */
  const setHashData = (hash, key) => {
    if (Array.isArray(hash)) {
      let data = hash.map(h => ['hmset', h[0], h[1]]);
      return redis.pipeline(data).exec();
    }
    return redis.hmset(key, hash);
  };

  /**
   * Retrieve hashTable from redis using key
   * @param hashKey
   * @return {{}|Promise}
   */
  const getHashData = (hashKey) => {
    if (Array.isArray(hashKey)) {
      let keys = hashKey.map(k => ['hgetall', k]);
      return redis.pipeline(keys).exec()
        .then(response => {
          let data = {};
          hashKey.forEach((k, i) => {
            if (response[i] !== null) {
              data[k] = response[i];
            }
          });
          return data;
        });
    }
    return redis.hgetall(hashKey);
  };

  /**
   * Retrieve values of hashTable without key in result
   * @param hashKey
   * @return {[]|Promise}
   */
  const getHashValues = (hashKey) => {
    return redis.hvals(hashKey)
      .catch(err => {
        throw err;
      });
  };

  /**
   * Retrieve a record from a hashTable
   * @param hashKey
   * @param fieldKey
   * @return {{}|Promise}
   */
  const getRecord = (hashKey, fieldKey) => {
    return redis.hget(hashKey, fieldKey)
      .then(data => {
        return data;
      })
      .catch(err => {
        throw err;
      });
  };

  return {
    getHashData,
    getHashValues,
    setHashData,
    getRecord
  };
};

module.exports = RedisUtil;
