'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.post('/api/users/singup', controller.users.singup);
  // router.post('/api/users/singin', controller.user.singin);
  // router.get('/api/users/singout', controller.user.singout);
};
