'use strict';

const { Controller } = require('egg');

class BaseController extends Controller {
  async getPager(modName, fields = []) {
    // fields 过滤的字段
    let { ctx } = this;
    let { pageNum = 1, pageSize = 5, keyword = '' } = ctx.query;
    pageNum = isNaN(pageNum) ? 1 : parseInt(pageNum);
    pageSize = isNaN(pageSize) ? 5 : parseInt(pageSize);

    let query = {};
    if (keyword && fields.length > 0) {
      // query['$or'] = [{ title: new RegExp(keyword) }, { content: new RegExp(keyword) }]
      query['$or'] = fields.map(field => ({ [field]: new RegExp(keyword) }))
    }

    return await ctx.model[modName].find(query).skip((pageNum - 1) * pageSize);
  }
  get user() {
    return this.ctx.session.user;
  }
  success(data) {
    this.ctx.body = {
      code: 0,
      data,
    };
  }
  error(error) {
    console.error(error);
    this.ctx.body = {
      code: 1,
      data: error,
    };
  }
}

module.exports = BaseController;
