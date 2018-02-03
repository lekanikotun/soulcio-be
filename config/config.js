/**
 * Init Middleware
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
