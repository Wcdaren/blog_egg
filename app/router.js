'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.post('/api/users/signup', controller.users.signup);
  router.post('/api/users/signin', controller.users.signin);
  router.get('/api/users/signout', controller.users.signout);

  router.resources('categories', '/api/categories', controller.categories);
  // router.get('/api/users/categories', controller.categories.index);
  // router.get('/api/users/categories', controller.categories.create);
  // router.get('/api/users/categories/:id', controller.categories.edit);
  // router.get('/api/users/categories/:id', controller.categories.destroy);

  // 文章
  router.resources('articles', '/api/articles', controller.articles);

  // 阅读数和评论量
  router.get('/api/articles/pv/:id', controller.articles.addPv);
  router.post('/api/articles/comment/:id', controller.articles.AddComment);


};
