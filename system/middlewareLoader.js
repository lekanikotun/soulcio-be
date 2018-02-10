/**
 * @category   Middleware Loader
 * @package    Soulcio
 * @copyright  Copyright (c) 2018 Media intellects Inc. All rights reserved.
 * @license    http://www.mediaintellects.com/license/
 * @author     Media Intellects Inc. <info@mediaintellects.com>
 * The contents of this file represent Media Intellects trade secrets and are confidential.
 * Use outside of Media Intellects is prohibited and in violation of copyright laws.
 */

'use strict';

const bodyParser = require('./middleware/bodyParser');
const cookieParser = require('./middleware/cookieParser');
const session = require('./middleware/session');
const headers = require('./middleware/resHeaders');

const loadMiddleware = (options) => {
  bodyParser(options);
  cookieParser(options);
  session(options);
  headers(options);
};

module.exports = loadMiddleware;
