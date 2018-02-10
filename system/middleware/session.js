/**
 * @category   Session Middleware
 * @package    Soulcio
 * @copyright  Copyright (c) 2018 Media intellects Inc. All rights reserved.
 * @license    http://www.mediaintellects.com/license/
 * @author     Media Intellects Inc. <info@mediaintellects.com>
 * The contents of this file represent Media Intellects trade secrets and are confidential.
 * Use outside of Media Intellects is prohibited and in violation of copyright laws.
 */

'use strict';

// Load Modules
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const uuidv4 = require('uuid/v4');


module.exports = ({ app, config, redis }) => {
  const redisOptions = {
    client: redis,
    host: config.redis.host,
    port: config.redis.port,
    ttl: config.session.ttl,
    prefix: config.session.prefix
  };

  const sessionOptions = {
    name: config.session.name,
    proxy: config.session.proxy,
    resave: config.session.resave,
    saveUninitialized: config.session.saveUninitialized,
    secret: process.env.SESSION_SECRET,
    store: new RedisStore(redisOptions),
    cookie: {
      domain: config.cookie.domain,
      httpOnly: config.cookie.httpOnly,
      maxAge: config.session.ttl * 1000,
      path: config.cookie.path,
      secure: config.cookie.secure
    }
  };
  app.set('trust proxy', 1);
  app.use(session(sessionOptions));

  // assign a uuid to every session
  app.use((req, res, next) => {
    if (!req.session.uuid) {
      req.session.uuid = uuidv4();
    }
    next();
  });
};
