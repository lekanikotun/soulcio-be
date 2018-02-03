/**
 * Set default env values
 */

'use strict';

const fs = require('fs');
const dotenv = require('dotenv');

module.exports = () => {
  const envConfig = dotenv.parse(fs.readFileSync('.env.override'));
  for (let k in envConfig) { // eslint-disable-line
    process.env[k] = envConfig[k];
  }
};
