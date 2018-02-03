/**
 * System Error Handler
 */

'use strict';

const errorHandler = require('errorhandler');

module.exports = ({ app, logger }) => {

  const unhandledRejections = new Map();
  process.on('unhandledRejection', (reason, p) => {
    logger.warn('unhandledRejection received');
    logger.error(p);
    logger.error(reason);
    unhandledRejections.set(p, reason);
    process.emit('rejectionHandled');
  });

  process.on('rejectionHandled', (p) => {
    logger.info('unhandledRejection Handled');
    unhandledRejections.delete(p);
  });

  process.on('SIGTERM', () => {
    logger.warn('shutting Down, SIGTERM received');
    process.exit(1);
  });

  process.on('SIGINT', () => {
    logger.warn('shutting Down, SIGINT received');
    process.exit(1);
  });

  process.on('uncaughtException', (err) => {
    logger.warn('shutting Down, uncaughtException received');
    logger.error(err);
    process.exit(3);
  });

  const errorNotification = (err, str, req) => {
    const title = 'Error in ' + req.method + ' ' + req.url;
    const errorMsg = {
      title: title,
      message: str
    };
    logger.error(errorMsg);
  };

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  if (app.get('env') !== 'production') {
    app.use(errorHandler({ log: errorNotification }));
  } else {
    app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
      logger.error(err);
      res.status(err.status || 500);
      res.send(err);
    });
  }
};
