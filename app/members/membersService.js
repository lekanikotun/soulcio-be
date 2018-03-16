/**
 * @category   Members Service
 * @copyright  Copyright (c) 2018 Media intellects Inc. All rights reserved.
 * The contents of this file represent Media Intellects Inc. trade secrets and are confidential.
 * Use outside of Media Intellects Inc. is prohibited and in violation of copyright laws.
 */

'use strict';

const RequestUtil = require('../../utils/requestUtil');

const MembersService = (config, logger) => {

  const requestUtil = RequestUtil(config, logger);

  const getMembers = () => {

    let configSE = config.api.SE;
    let resourceSE = Object.assign(configSE.base, configSE.members);
    let resource = {
      uri: requestUtil.generateAPIUrl(resourceSE),
      headers: configSE.base.headers
    };

    return requestUtil.get(resource);
  };

  return {
    getMembers
  };
};

module.exports = MembersService;
