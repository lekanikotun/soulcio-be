/**
 * @category   Environment Variables
 * @copyright  Copyright (c) 2018 Media intellects Inc. All rights reserved.
 * The contents of this file represent Media Intellects Inc. trade secrets and are confidential.
 * Use outside of Media Intellects Inc. is prohibited and in violation of copyright laws.
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
