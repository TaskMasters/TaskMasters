const path = require('path');

module.exports = ({}) => {
  const index = (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
  };
  const register = (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'signUp.html'));
  };
  const board = (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'board.html'));
  };
  const boards = (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'boards.html'));
  };
  return { index, register, board, boards };
};
