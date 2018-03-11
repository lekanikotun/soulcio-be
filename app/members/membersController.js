/**
 * @category   Login Controller
 * @package    Soulcio
 * @copyright  Copyright (c) 2018 Media intellects Inc. All rights reserved.
 * @license    https://www.mediaintellects.com/license/
 * @author     Media Intellects Inc. <info@mediaintellects.com>
 * The contents of this file represent Media Intellects Inc. trade secrets and are confidential.
 * Use outside of Media Intellects Inc. is prohibited and in violation of copyright laws.
 */

'use strict';

const MembersService = require('./membersService');

const MembersController = ({ config, logger }) => {

  const membersService = MembersService(config, logger);

  const get = (req, res) => {
    return membersService.getMembers()
      .then(response => {
        res.status(200).json({
          response
        });
      })
      .catch(err => {
        logger.error('LoginController', err);
        res.status(400).json({
          error: {
            message: 'An error occurred.'
          }
        });
      });
  };

  return {
    get
  };

};

module.exports = MembersController;
