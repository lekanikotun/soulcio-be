/**
 * @category   Logger
 * @package    Soulcio
 * @copyright  Copyright (c) 2018 Media intellects Inc. All rights reserved.
 * @license    http://www.mediaintellects.com/license/
 * @author     Media Intellects Inc. <info@mediaintellects.com>
 * The contents of this file represent Media Intellects trade secrets and are confidential.
 * Use outside of Media Intellects is prohibited and in violation of copyright laws.
 */

'use strict';

const winston = require('winston');
require('winston-daily-rotate-file');
const path = require('path');
const constants = require('../data/constants');

const Logger = () => {

  const logFolder = `${process.cwd()}/${constants.LOG_FOLDER}`;

  const fileTransport = new winston.transports.DailyRotateFile({
    filename: path.join(logFolder, 'log'),
    datePattern: '-yyyy-MM-dd.log',
    prepend: false,
    level: 'info'
  });

  return new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({
        level: 'debug',
        handleExceptions: true,
        json: true
      }),
      fileTransport
    ]
  });
};

module.exports = Logger;

