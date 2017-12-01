fetch('/API/boards', {
  method: 'get',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('myApp@token')
  }
})
  .then(function(response) {
    if (response.status === 401) {
      window.location.replace('/');
    }
    console.log(response);
    return response.json();
  })
  .then(function(boards) {
    console.log(boards);
    addBoards(boards.boards);
  })
  .catch(function(err) {
    console.log(err);
  });

var color = [
  '#FF7200',
  '#ABBC4E',
  '#A7E80C',
  '#00a4bc',
  '#FFD21A',
  '#2E747F',
  '#FFA45C',
  '#4FFFB5'
];

function createBoard(e) {
  e.preventDefault();
  fetch('/API/boards', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('myApp@token')
    },
    body: JSON.stringify({
      name: document.getElementById('title').value,
      description: document.getElementById('description').value
    })
  })
    .then(function(response) {
      if (response.status === 401) {
        window.location.replace('/');
      }
      console.log(response);
      return response.json();
    })
    .then(function(board) {
      console.log(board);
      window.location.replace('/boards/' + board.id);
    })
    .catch(function(err) {
      console.log(err);
    });
}

function goToBoard(id) {
  return function() {
    window.location.href = '/boards/' + id;
    console.log('teit');
  };
}

function addBoards(boards) {
  for (var i = 0; i < boards.length; i++) {
    var x = Math.floor(Math.random() * 8);

    var newBoard = document.createElement('div');
    newBoard.onclick = goToBoard(boards[i].id);
    newBoard.id = 'board' + boards[i].id;
    newBoard.className = 'board';
    newBoard.style.backgroundColor = color[boards[i].id % 8];

    var title = document.createElement('h1');
    title.className = 'boardTitle';
    var text = document.createTextNode(boards[i].name);
    title.appendChild(text);
    newBoard.appendChild(title);

    var description = document.createElement('p');
    description.className = 'description';
    var descText = document.createTextNode(boards[i].description || '');
    description.appendChild(descText);
    newBoard.appendChild(description);

    var deleteButton = document.createElement('button');
    deleteButton.className = 'button';
    deleteButton.id = 'deleteButton';
    deleteButton.onclick = deleteBoard(boards[i].id);
    var node = document.createTextNode('DELETE BOARD');
    deleteButton.appendChild(node);
    newBoard.appendChild(deleteButton);

    document.getElementById('boards').appendChild(newBoard);
  }
}

function deleteBoard(id) {
  return function(e) {
    e.preventDefault();
    e.stopPropagation();
    fetch('/API/boards/' + id, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('myApp@token')
      }
    })
      .then(function(response) {
        if (response.status === 401) {
          window.location.replace('/');
        }
        console.log(response);
        return response.json();
      })
      .then(function(deletedBoard) {
        console.log(deletedBoard);
        document.getElementById('board' + deletedBoard.id).remove();
      })
      .catch(function(err) {
        console.log(err);
      });
  };
}
