const database = require('./../config/database')();
const jwt = require('./../config/jwt')();

module.exports.authController = require('./authController')({ database, jwt });
module.exports.boardController = require('./boardController')({ database });
module.exports.clientController = require('./clientController')({});
