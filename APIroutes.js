const express = require('express');
const { authController, boardController } = require('./controllers');
const auth = require('./utils/ensureAuthenticated');

module.exports = () => {
  const router = express.Router();

  router.post('/register', authController.register);
  router.post('/login', authController.login);
  router.get('/users', authController.getUsers);
  router.get('/boards', auth(), boardController.getBoards);
  router.post('/boards', auth(), boardController.createBoard);
  router.get('/boards/:id', auth(), boardController.getBoard);
  router.delete('/boards/:id', auth(), boardController.deleteBoard);
  router.post('/lists', auth(), boardController.createList);
  router.delete('/lists/:id', auth(), boardController.deleteList);
  router.post('/todos', auth(), boardController.createTodo);

  return router;
};
