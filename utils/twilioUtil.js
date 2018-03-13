/**
 * @category   Twilio Utility
 * @package    Soulcio Inc.
 * @copyright  Copyright (c) 2018 Media intellects Inc. All rights reserved.
 * @license    https://www.mediaintellects.com/license/
 * @author     Media Intellects Inc. <info@mediaintellects.com>
 * The contents of this file represent Media Intellects Inc. trade secrets and are confidential.
 * Use outside of Media Intellects Inc. is prohibited and in violation of copyright laws.
 */

'use strict';

const { Twilio } = require('twilio');

const TwilioUtil = () => {

  const accountSid = process.env.TWILIO_SID;
  const authToken = process.env.TWILIO_TOKEN;
  const twilioClient = new Twilio(accountSid, authToken);

  return {
    twilioClient,
    chatService: twilioClient.chat.services(process.env.TWILIO_CHAT_SID),
    smsService: twilioClient.messages
  };
};

module.exports = TwilioUtil;
