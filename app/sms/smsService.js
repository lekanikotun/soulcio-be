/**
 * @category   Sms Service - Twilio
 * @package    Soulcio Inc.
 * @copyright  Copyright (c) 2018 Media intellects Inc. All rights reserved.
 * @license    https://www.mediaintellects.com/license/
 * @author     Media Intellects Inc. <info@mediaintellects.com>
 * The contents of this file represent Media Intellects Inc. trade secrets and are confidential.
 * Use outside of Media Intellects Inc. is prohibited and in violation of copyright laws.
 */

'use strict';

const twilioUtil = require('../../utils/twilioUtil');

const SmsService = () => {

  const { smsService } = twilioUtil();

  return {

    sendSMS(to, from, msg, mediaUrl) {
      return smsService
        .create({
          msg,
          to,
          from,
          mediaUrl
        });
    }
  };
};

module.exports = SmsService;
