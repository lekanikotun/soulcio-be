/**
 * @category   Constants
 * @copyright  Copyright (c) 2018 Media intellects Inc. All rights reserved.
 * The contents of this file represent Media Intellects Inc. trade secrets and are confidential.
 * Use outside of Media Intellects Inc. is prohibited and in violation of copyright laws.
 */

'use strict';

const CONSTANTS = {
  COL_USER_SESSION: 'user_session',
  ERROR_AUTH: 'UnauthorizedError',
  ERROR_BAD_REQUEST: 'BadRequest',
  ERROR_SERVER: 'ServerError',
  ERROR_DB: 'DatabaseError',
  ERROR_REDIS: 'RedisError',
  MSG_MISSING_CREDENTIALS: 'Username and password required.',
  MSG_AUTH_ERROR: 'Authentication Error.',
  MSG_INVALID_CREDENTIALS: 'Invalid credentials.',
  MSG_UNAUTHORIZED: 'You are not authorized for this operation.',
  MSG_MISSING_FIELDS: 'Required field(s) missing.',
  MSG_LOGIN_REQUIRED: 'Login Required.',
  MSG_SERVER_ERROR: 'Server Error',
  USER_ADMIN: 'admin',
  USER_BASIC: 'basic',
  STATUS_NEW: 'new',
  STATUS_REVIEW: 'review',
  STATUS_APPROVED: 'approved',
  STATUS_REJECTED: 'rejected',
  STATE_ACTIVE: 'active',
  STATE_DISABLED: 'disabled',
  ROLE_VIEWER: 'viewer',
  ROLE_REVIEWER: 'reviewer',
  ROLE_ADMIN: 'admin',
  LOG_FOLDER: 'logs'
};

module.exports = CONSTANTS;
