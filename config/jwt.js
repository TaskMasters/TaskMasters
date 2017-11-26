const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY || 'my_secret';

module.exports = () => {
  const generateToken = payload => {
    return jwt.sign(payload, secret, {
      expiresIn: 10000
    });
  };

  const verifyToken = token => {
    return jwt.verify(token, secret);
  };

  return {
    generateToken,
    verifyToken
  };
};
