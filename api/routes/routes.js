const userControllers = require('../controllers/userControllers');
const postControllers = require('../controllers/postControllers');

module.exports = app => {
  app.route('/api/new-user').post(userControllers.userCreate);
  app.route('/api/login').post(userControllers.userLogin);
  app.route('/api/new-post').post(postControllers.postCreate);
  app.route('/api/posts').get(postControllers.postsGetAll);
  app
    .route('/api/posts/:id')
    .get(postControllers.postGetById)
    .put(postControllers.postCommentAdd);
};

// app.route('/posts/:id').get(userControllers.findPost);
// .delete(controllerMethods.deletePost);

// app.route('/new-user').post(userControllers.addUser);
