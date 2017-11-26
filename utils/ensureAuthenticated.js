const jwt = require('../config/jwt')();

module.exports = () => {
  return (req, res, next) => {
    const authHeader = req.get('authorization');
    if (authHeader) {
      const token = authHeader.substring(7);
      const user = jwt.verifyToken(token);
      if (user) {
        req.user = user;
        return next();
      }
    }
    return res.status(401).send('Invalid Token');
  };
};
