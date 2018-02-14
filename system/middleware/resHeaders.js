/**
 * @category   Headers Middleware
 * @package    Soulcio
 * @copyright  Copyright (c) 2018 Media intellects Inc. All rights reserved.
 * @license    http://www.mediaintellects.com/license/
 * @author     Media Intellects Inc. <info@mediaintellects.com>
 * The contents of this file represent Media Intellects trade secrets and are confidential.
 * Use outside of Media Intellects is prohibited and in violation of copyright laws.
 */

'use strict';

const resHeaders = (req, res, next) => {

  req.headers['x-forwarded-proto'] = 'https';

  // get request ip address
  req.ipAddress = req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    (req.socket ? req.socket.remoteAddress : null) ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null);

  // get user-agent
  req.userAgent = req.header('User-Agent');

  // Set protocol forwarding headers to enable secure cookies
  // req.headers['x-forwarded-proto'] = 'https';

  // Cross-Origin-Resource-Sharing settings
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Cache-Control, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Max-Age', 1200);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');

  // security

  // No Cache
  if (!res.getHeader('Cache-Control')) {
    res.setHeader('Surrogate-Control', 'no-store');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }

  // No Sniff
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Download-Options', 'noopen');

  // XSS
  // Internet Explorer, restrict untrusted HTML, obscure IE8
  const matches = /msie\s*(\d+)/i.exec(req.headers['user-agent']);
  const value = (!matches || (parseFloat(matches[1]) >= 9)) ? '1; mode=block' : '0';
  res.setHeader('X-XSS-Protection', value);
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

  res.removeHeader('X-Powered-By');

  next();
};

module.exports = ({ app }) => {
  app.use(resHeaders);
};
