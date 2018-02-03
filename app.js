#!/usr/bin/env node

/**
 * App
 */

'use strict';

const express = require('express');
const env = require('dotenv');

// create app instance
const app = express();
// set environment variables
env.config();

// load modules
const Logger = require('./system/logger');
const Config = require('./config/config');
const DB = require('./system/db');
const Redis = require('./system/redis');
const MiddlewareLoader = require('./system/middlewareLoader');
const Routes = require('./routes/baseRoute');
const ErrorHandler = require('./system/errorHandler');
const SystemHealth = require('./system/systemHealth');
const Server = require('./system/server');

// set config
const logger = Logger();
const config = Config(app, logger);
const db = DB(app, config, logger);
const redis = Redis(app, config, logger);

// app options
const options = {
  app,
  config,
  db,
  redis,
  logger
};

// MiddlewareLoader middleware
MiddlewareLoader(options);
// load routes
Routes(options);
// error handler
ErrorHandler(options);

// Server boot up
SystemHealth(options)
  .check()
  .then(() => Server(options))
  .catch(() => {
    logger.warn('Aborting server startup..');
    process.exit(1);
  });