var boardId = (function() {
  var parser = document.createElement('a');
  parser.href = location.href;
  return parser.pathname.substring(8);
})();

fetch('/API/boards/' + boardId, {
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
  .then(function(board) {
    console.log(board);
    setTitle(board.board.name);
  })
  .catch(function(err) {
    console.log(err);
  });

function createList(e) {
  e.preventDefault();
  fetch('/API/lists', {
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
    .then(function(boards) {
      console.log(boards);
    })
    .catch(function(err) {
      console.log(err);
    });
}

function setTitle(title) {
  document.getElementById('Heading').innerHTML = title;
}
