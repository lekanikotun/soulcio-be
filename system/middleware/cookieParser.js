/**
 * @category   Cookie Parser Middleware
 * @copyright  Copyright (c) 2018 Media intellects Inc. All rights reserved.
 * The contents of this file represent Media Intellects Inc. trade secrets and are confidential.
 * Use outside of Media Intellects Inc. is prohibited and in violation of copyright laws.
 */

'use strict';

// Load Modules
const cookieParser = require('cookie-parser');

module.exports = ({ app }) => {
  app.use(cookieParser());
};
