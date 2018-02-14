/**
 * @category   Forward Header Middleware
 * @package    Soulcio Inc.
 * @copyright  Copyright (c) 2018 Media intellects Inc. All rights reserved.
 * @license    http://www.mediaintellects.com/license/
 * @author     Media Intellects Inc. <info@mediaintellects.com>
 * The contents of this file represent Media Intellects trade secrets and are confidential.
 * Use outside of Media Intellects is prohibited and in violation of copyright laws.
 */

'use strict';

module.exports = ({ app }) => {

  // eslint-disable-next-line no-console

  // Set protocol forwarding headers to enable secure cookies
  app.use((req, res, next ) => {
    req.headers['x-forwarded-proto'] = 'https';
    next();
  });
};
