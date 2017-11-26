const crypto = require('crypto');

const genRandomString = length => {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
};

const sha512 = (password, salt) => {
  const hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  const value = hash.digest('hex');

  return {
    salt: salt,
    passwordHash: value
  };
};

module.exports = ({ database, jwt }) => {
  const register = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
      return res.status(400).send('Must supply name and password');
    }

    const { passwordHash, salt } = sha512(password, genRandomString(16));

    return database
      .query(
        'INSERT INTO Users(name, salt, password_hash) VALUES($1, $2, $3)',
        [username, salt, passwordHash]
      )
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        console.log(err);
        res.status(401).send('failed creating user');
      });
  };
  const login = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
      return res.status(400).send('Must supply name and password');
    }

    return database
      .query('SELECT * from Users WHERE name=$1;', [username])
      .then(response => {
        if (
          response.rows[0].password_hash ===
          sha512(password, response.rows[0].salt).passwordHash
        ) {
          res.status(200).json({
            success: true,
            token: jwt.generateToken({ ...response.rows[0] })
          });
        } else {
          res
            .status(401)
            .send({ success: false, error: 'Wrong username or password' });
        }
      })
      .catch(err => {
        console.log(err);
        res
          .status(400)
          .send({ success: false, error: 'Wrong username or password' });
      });
  };
  const getUsers = (req, res, next) => {
    return database
      .query('SELECT * FROM Users')
      .then(response => {
        res.json(response.rows);
      })
      .catch(err => {
        console.log(err);
        res.status(401).send('failed creating user');
      });
  };
  return { register, login, getUsers };
};
