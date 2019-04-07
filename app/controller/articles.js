'use strict';

const BaseController = require('./base');

module.exports = class ArticlesController extends BaseController {
  async index() {
    try {
      let items = await this.getPager('Article', [ 'title', 'content' ]);
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
