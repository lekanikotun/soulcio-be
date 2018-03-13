/**
 * @category   SMS Messaging - Twilio
 * @package    Soulcio Inc.
 * @copyright  Copyright (c) 2018 Media intellects Inc. All rights reserved.
 * @license    https://www.mediaintellects.com/license/
 * @author     Media Intellects Inc. <info@mediaintellects.com>
 * The contents of this file represent Media Intellects Inc. trade secrets and are confidential.
 * Use outside of Media Intellects Inc. is prohibited and in violation of copyright laws.
 */

'use strict';

const SmsService = require('./smsService');

const SmsController = ({ logger }) => {

  const { sendSMS } = SmsService();

  const send = (req, res) => {

    let to = req.body.to;
    let from = req.body.from;
    let msg = req.body.msg;
    let mediaUrl = req.body.mediaUrl;

    return sendSMS(to, from, msg, mediaUrl)
      .then(response => {
        logger.info('Message successfully sent', response);
      })
      .catch(err => {
        logger.error('ChatController', err);
        res.status(500).json({
          error: {
            message: 'An error occurred.'
          }
        });
      });
  };

  return {
    send
  };
};

module.exports = SmsController;
