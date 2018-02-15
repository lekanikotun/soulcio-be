/**
 * @category   Configuration
 * @package    Soulcio
 * @copyright  Copyright (c) 2018 Media intellects Inc. All rights reserved.
 * @license    https://www.mediaintellects.com/license/
 * @author     Media Intellects Inc. <info@mediaintellects.com>
 * The contents of this file represent Media Intellects Inc. trade secrets and are confidential.
 * Use outside of Media Intellects Inc. is prohibited and in violation of copyright laws.
 */

'use strict';

const baseConfig = require('./base');
const devConfig = require('./env/development');
const stagingConfig = require('./env/staging');
const prodConfig = require('./env/production');

module.exports = (app, logger) => {
  const env = app.get('env') || 'development';
  logger.info(`App is running in ${env.toUpperCase()} mode`);

  let envConfig;

  if (env === 'production') {
    envConfig = prodConfig;
  } else if (env === 'staging') {
    envConfig = stagingConfig;
  } else {
    envConfig = devConfig;
  }

  return Object.assign({}, baseConfig, envConfig);
};
