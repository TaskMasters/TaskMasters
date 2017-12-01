function formatData(data) {
  // Finding lists
  const lists = data.reduce((acc, row) => {
    acc[row.listid] = {
      id: row.listid,
      deadline: row.deadline,
      name: row.listname
    };
    return acc;
  }, {});

  // Finding todos
  data.forEach(row => {
    if (row.todoid) {
      lists[row.listid].todos = [].concat(lists[row.listid].todos || [], [
        {
          id: row.todoid,
          text: row.text,
          done: row.done,
          list_id: row.listid
        }
      ]);
    }
  });

  const listsWithTodos = Object.keys(lists).map(key => lists[key]);

  return {
    id: data[0].boardid,
    name: data[0].boardname,
    lists: listsWithTodos
  };
}

module.exports = ({ database }) => {
  const getBoard = (req, res, next) => {
    return database
      .query(
        `SELECT
          Boards.id AS BoardId,
          Boards.name AS BoardName,
          Boards.username,
          Lists.id AS ListId,
          Lists.name AS ListName,
          Lists.deadline,
          Todos.id AS TodoId,
          Todos.text,
          Todos.done
          FROM Boards
        LEFT JOIN lists
          ON (Boards.id=Lists.board_id)
        LEFT JOIN todos
          ON (Lists.id=Todos.list_id)
        WHERE Boards.id=$1`,
        [req.params.id]
      )
      .then(response => {
        res.json(formatData(response.rows));
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

  const createTodo = (req, res, next) => {
    return database
      .query('INSERT INTO Todos(text, list_id) VALUES($1, $2) RETURNING *', [
        req.body.text,
        req.body.listid
      ])
      .then(response => {
        res.json({ todo: response.rows[0] });
      })
      .catch(err => {
        console.log(err);
        res.status(401).send('failed creating todo');
      });
  };

  const deleteList = (req, res, next) => {
    return database
      .query('DELETE FROM Lists WHERE id=$1 RETURNING id', [req.params.id])
      .then(response => {
        res.json({ id: response.rows[0].id });
      })
      .catch(err => {
        console.log(err);
        res.status(401).send('failed deleting list');
      });
  };

  const deleteBoard = (req, res, next) => {
    return database
      .query('DELETE FROM Boards WHERE id=$1 RETURNING id', [req.params.id])
      .then(response => {
        res.json({ id: response.rows[0].id });
      })
      .catch(err => {
        console.log(err);
        res.status(401).send('failed deleting board');
      });
  };

  const updateTodo = (req, res, next) => {
    console.log(req.body);
    return database
      .query('UPDATE Todos SET done=$1 WHERE id=$2 RETURNING *', [
        req.body.done,
        req.params.id
      ])
      .then(() => {
        res.status(200).send();
      })
      .catch(err => {
        console.log(err);
        res.status(401).send('failed updateing todo');
      });
  };

  return {
    getBoard,
    getBoards,
    createBoard,
    createList,
    createTodo,
    deleteList,
    deleteBoard,
    updateTodo
  };
};
