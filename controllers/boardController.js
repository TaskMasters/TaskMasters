module.exports = ({ database }) => {
  const getBoard = (req, res, next) => {
    return database
      .query('SELECT * FROM  Boards WHERE id=$1', [req.params.id])
      .then(response => {
        res.json({ board: response.rows[0] });
      })
      .catch(err => {
        console.log(err);
        res.status(401).send('failed fetching board');
      });
  };
  const getBoards = (req, res, next) => {
    return database
      .query('SELECT * FROM  Boards WHERE username=$1', [req.user.name])
      .then(response => {
        res.json({ boards: response.rows });
      })
      .catch(err => {
        console.log(err);
        res.status(401).send('failed fetching boards');
      });
  };

  const createBoard = (req, res, next) => {
    return database
      .query(
        'INSERT INTO Boards(username, name, description) VALUES($1, $2, $3) RETURNING id',
        [req.user.name, req.body.name, req.body.description]
      )
      .then(response => {
        res.json({ id: response.rows[0].id });
      })
      .catch(err => {
        console.log(err);
        res.status(401).send('failed creating board');
      });
  };
  const createList = (req, res, next) => {
    return database
      .query('INSERT INTO Lists(name, board_id) VALUES($1, $2) RETURNING id', [
        req.body.name,
        req.body.board_id
      ])
      .then(response => {
        res.json({ id: response.rows[0].id });
      })
      .catch(err => {
        console.log(err);
        res.status(401).send('failed creating list');
      });
  };

  return { getBoard, getBoards, createBoard };
};
