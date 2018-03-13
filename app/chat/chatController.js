/**
 * @category   Chat Controller - Twilio
 * @package    Soulcio Inc.
 * @copyright  Copyright (c) 2018 Media intellects Inc. All rights reserved.
 * @license    https://www.mediaintellects.com/license/
 * @author     Media Intellects Inc. <info@mediaintellects.com>
 * The contents of this file represent Media Intellects Inc. trade secrets and are confidential.
 * Use outside of Media Intellects Inc. is prohibited and in violation of copyright laws.
 */

'use strict';

const ChatService = require('./chatService');

const ChatController = ({ logger }) => {

  const {
    listChatChannels, createChatChannel, retrieveChatChannel,
    updateChatChannel, deleteChatChannel
  } = ChatService();

  const listChannels = (req, res) => {
    return listChatChannels()
      .then(result => {
        res.status(200).json({
          data: result
        });
      })
      .catch(err => {
        logger.error('ChatController', err);
        res.status(400).json({
          error: {
            message: 'An error occurred.'
          }
        });
      });
  };

  const createChannel = (req, res) => {
    let data = req.body;
    return createChatChannel(data).then(result => {
      res.status(200).json({
        data: result
      });
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

  const retrieveChannel = (req, res) => {
    let channelSid = req.body.channelSid;
    return retrieveChatChannel(channelSid)
      .then(result => {
        res.status(200).json({
          data: result
        });
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

  const updateChannel = (req, res) => {
    let channelSid = req.body.channelSid;
    let data = req.body.data;
    return updateChatChannel(channelSid, data)
      .then(result => {
        res.status(200).json({
          data: result
        });
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

  const deleteChannel = (req, res) => {
    let channelSid = req.body.channelSid;
    return deleteChatChannel(channelSid)
      .then(result => {
        res.status(200).json({
          data: result
        });
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
    listChannels,
    createChannel,
    retrieveChannel,
    updateChannel,
    deleteChannel
  };
};

module.exports = ChatController;
