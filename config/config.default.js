/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1554530804984_6386';

  // add your middleware config here
  config.middleware = [];

  // 配置mongoose 它是node里操作mongodb数据库的一个模块
  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1/blog',
      options: {},
    },
  };

  // 关闭安全
  config.security = {
    csrf: false,
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
