function parseData(rows) {
  const result = {};
  rows.forEach(row => {
    if (result.lists) {
      result.lists.push({
        id: row.listid,
        name: row.listname,
        deadline: row.deadline
      });
    } else {
      result.lists = [
        {
          id: row.listid,
          name: row.listname,
          deadline: row.deadline
        }
      ];
      result.id = row.boardid;
      result.name = row.boardname;
    }
  });
  return result;
}

module.exports = ({ database }) => {
  const getBoard = (req, res, next) => {
    return database
      .query(
        'SELECT Boards.id AS boardId, Boards.name AS boardName, Boards.username, Lists.id AS listID, Lists.name AS listName, Lists.deadline FROM Boards LEFT JOIN lists ON (Boards.id=Lists.board_id) WHERE Boards.id=$1;',
        [req.params.id]
      )
      .then(response => {
        res.json(parseData(response.rows));
      })
      .catch(err => {
        console.log(err);
        res.status(401).send('failed fetching board');
      });
  };
  const getBoards = (req, res, next) => {
    return database
      .query('SELECT * FROM Boards WHERE username=$1', [req.user.name])
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
      .query(
        'INSERT INTO Lists(name, board_id, deadline) VALUES($1, $2, $3) RETURNING *',
        [req.body.name, req.body.board_id, req.body.deadline]
      )
      .then(response => {
        res.json({ list: response.rows[0] });
      })
      .catch(err => {
        console.log(err);
        res.status(401).send('failed creating list');
      });
  };

  return { getBoard, getBoards, createBoard, createList };
};
