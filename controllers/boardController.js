module.exports = ({}) => {
  const getBoard = (req, res, next) => {
    res.json({ user: req.user });
  };
  const getBoards = (req, res, next) => {
    res.json({ user: req.user });
  };

  return { getBoard, getBoards };
};
