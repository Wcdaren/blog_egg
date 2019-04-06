'use strict';

// const { Controller } = require('egg');
const BaseController = require('./base');

class UsersController extends BaseController {
  async singup() {
    const { ctx } = this;
    // 1 得到请求体 {username,password,email}
    let user = ctx.request.body;
    try {
      // 保存数据库 {_id,username,password,email}
      user = await ctx.model.User.create(user);
      // ctx.body = {
      //   code: 0,
      //   data: { user },
      // };
      this.success(user);
    } catch (error) {
      // console.log(error);
      // ctx.body = {
      //   code: 1,
      //   data: error,
      // };
      this.error(error);
    }
  }
}

module.exports = UsersController;
