/**
 * Middleware
 */

'use strict';

const constants = require('.././constants');

const Middleware = {

  newRule: {
    post(req, res, next) {
      let postData = req.body;
      // check for required fields
      if (!postData.source
        || !postData.fileName
        || !postData.rule) {
        return res.status(400).json({
          name: constants.ERROR_BAD_REQUEST,
          message: constants.MSG_MISSING_FIELDS
        });
      }
      return next();
    }
  },

  listRules: {
    post(req, res, next) {
      let postData = req.body;
      // determine if user can bulk approve
      if (postData.status
        && postData.status === constants.STATUS_APPROVED
        && req.session.user.role !== constants.ROLE_ADMIN
      ) {
        return res.status(403).json({
          name: constants.ERROR_AUTH,
          message: constants.MSG_UNAUTHORIZED
        });
      }
      // check for required fields
      if (!postData.status
        || !postData.selected
        || !postData.comment) {
        return res.status(400).json({
          name: constants.ERROR_BAD_REQUEST,
          message: constants.MSG_MISSING_FIELDS
        });
      }
      return next();
    },

    search(req, res, next) {
      if (!req.body.searchkey) {
        return res.status(400).json({
          name: constants.ERROR_BAD_REQUEST,
          message: constants.MSG_MISSING_FIELDS
        });
      }
      return next();
    }
  },

  editRule: {
    post(req, res, next) {
      if (!req.body.comment) {
        return res.status(400).json({
          name: constants.ERROR_BAD_REQUEST,
          message: constants.MSG_MISSING_FIELDS
        });
      }
      return next();
    }
  },

  login: {
    get(req, res, next) {
      if (!req.session.user) {
        return res.status(401).json({
          name: constants.ERROR_AUTH,
          message: constants.MSG_AUTH_ERROR
        });
      }
      return next();
    }
  }
};

module.exports = Middleware;
