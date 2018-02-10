/**
 * @category   Environment Variables
 * @package    Soulcio
 * @copyright  Copyright (c) 2018 Media intellects Inc. All rights reserved.
 * @license    http://www.mediaintellects.com/license/
 * @author     Media Intellects Inc. <info@mediaintellects.com>
 * The contents of this file represent Media Intellects trade secrets and are confidential.
 * Use outside of Media Intellects is prohibited and in violation of copyright laws.
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
