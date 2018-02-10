/**
 * @category   MonogoDB Connection
 * @package    Soulcio
 * @copyright  Copyright (c) 2018 Media intellects Inc. All rights reserved.
 * @license    http://www.mediaintellects.com/license/
 * @author     Media Intellects Inc. <info@mediaintellects.com>
 * The contents of this file represent Media Intellects trade secrets and are confidential.
 * Use outside of Media Intellects is prohibited and in violation of copyright laws.
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
