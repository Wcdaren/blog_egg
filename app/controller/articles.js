'use strict';

const BaseController = require('./base');

module.exports = class ArticlesController extends BaseController {
  async index() {
    const { ctx } = this;
    let { pageNum = 1, pageSize = 5, keyword = '' } = ctx.query;
    pageNum = isNaN(pageNum) ? 1 : parseInt(pageNum);
    pageSize = isNaN(pageSize) ? 5 : parseInt(pageSize);

    let query = {};
    if (keyword) {
      query['$or'] = [{ title: new RegExp(keyword) }, { content: new RegExp(keyword) }]
    }

    try {
      let items = await ctx.model.Article.find(query).skip((pageNum - 1) * pageSize);

      this.success({ items });
    } catch (error) {
      this.error(error);
    }
  }

  async create() {
    let { ctx } = this;
    let article = ctx.request.body;
    try {
      // ctx.model.Article 这里的article 其实是对应文件名的 所以 文件名不对 会匹配不上
      article = await ctx.model.Article.create(article);
      this.success('文章发表成功');
    } catch (error) {
      this.error(error);
    }
  }


};
