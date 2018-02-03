/**
 * Connect to Mongo DB via Mongoose
 */

'use strict';

const MongoClient = require('mongoskin').MongoClient;

module.exports = (app, config) => {
  const mongodbConfig = config.mongodb;
  const url = `mongodb://${mongodbConfig.host}:${mongodbConfig.port}/${mongodbConfig.db}`;
  const options = {
    connectTimeoutMS: mongodbConfig.timeout
  };

  return MongoClient.connect(url, options);
};
