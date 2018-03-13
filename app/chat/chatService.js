/**
 * @category   Chat Service - Twilio
 * @package    Soulcio Inc.
 * @copyright  Copyright (c) 2018 Media intellects Inc. All rights reserved.
 * @license    https://www.mediaintellects.com/license/
 * @author     Media Intellects Inc. <info@mediaintellects.com>
 * The contents of this file represent Media Intellects Inc. trade secrets and are confidential.
 * Use outside of Media Intellects Inc. is prohibited and in violation of copyright laws.
 */

'use strict';

const twilioUtil = require('../../utils/twilioUtil');

const ChatService = () => {

  const { chatService } = twilioUtil();

  return {
    listChatChannels() {
      return chatService
        .channels
        .list();
    },

    createChatChannel(data) {
      return chatService
        .channels
        .create(data);
    },

    retrieveChatChannel(sid) {
      return chatService
        .channels(sid)
        .fetch();
    },

    updateChatChannel(sid, data) {
      return chatService
        .channels(sid)
        .update(data);
    },

    deleteChatChannel(sid) {
      return chatService
        .channels(sid)
        .remove();
    }
  };
};

module.exports = ChatService;
