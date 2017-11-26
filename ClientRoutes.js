const express = require('express');
const { clientController } = require('./controllers');

module.exports = () => {
  const router = express.Router();

  router.get('/', clientController.index);
  router.get('/register', clientController.register);
  router.get('/boards', clientController.boards);
  router.get('/boards/:id', clientController.board);

  return router;
};
