'use strict';

const BaseController = require('./base');

module.exports = class ArticlesController extends BaseController {
  async index() {
    try {
      await this.getPager('Article', ['title', 'content']);
    } catch (error) {
      this.error(error);
    }
  }

  async create() {
    let { ctx } = this;
    let article = ctx.request.body;
    article.user = this.user;
    try {
      // ctx.model.Article 这里的article 其实是对应文件名的 所以 文件名不对 会匹配不上
      article = await ctx.model.Article.create(article);
      this.success('文章发表成功');
    } catch (error) {
      this.error(error);
    }
  }

  async update() {
    const { ctx } = this;
    let id = ctx.params.id;
    let article = ctx.request.body;
    try {
      await ctx.model.Article.findByIdAndUpdate(id, article);
      this.success('更新文章成功')
    } catch (error) {
      this.error(error)
    }
  }

  // 删除文章
  async destroy() {
    const { ctx } = this;
    let id = ctx.params.id;
    try {
      await ctx.model.Article.findByIdAndRemove(id);
      this.success('删除文章成功')
    } catch (error) {
      this.error(error)
    }
  }
  // 阅读数
  async addPv() {
    const { ctx } = this;
    let id = ctx.params.id;
    try {
      await ctx.model.Article.findByIdAndUpdate(id, { $inc: { pv: 1 } });
      this.success('阅读数加一');
    } catch (error) {
      this.error(error);
    }
  }
  // 添加评论
  async AddComment() {
    const { ctx } = this;
    let id = ctx.params.id;
    let commnet = ctx.request.body;
    commnet.user = this.user;
    try {
      await ctx.model.Article.findByIdAndUpdate(id, { $push: { comments: commnet } });
      this.success('添加评论成功');
    } catch (error) {
      this.error(error);
    }
  }
};
