'use strict';

// const { Controller } = require('egg');
const BaseController = require('./base');

class UsersController extends BaseController {
  async signup() {
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
  async signin() {
    let { ctx } = this;
    let user = ctx.request.body;
    try {
      user = await ctx.model.User.findOne(user);
      if (user) {
        // 如果登录成功了 则需要写如session会话
        // 可以通过ctx.cess.user是否为null来判断此用户是否登录
        ctx.session.user = user;
        this.success({ user });
      } else {
        this.error('用户名或者密码错误');
      }
    } catch (error) {
      this.error(error);
    }
  }

  async signout() {
    let { ctx } = this;
    ctx.session.user = null;
    this.success('退出成功');
  }
}

module.exports = UsersController;
