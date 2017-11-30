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
    setTitle(board.name);
    for (var i = 0; i < board.lists.length; i++) {
      renderList(board.lists[i]);
    }
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
      name: document.getElementById('newListTitle').value,
      board_id: boardId,
      deadline: document.getElementById('deadline').value
    })
  })
    .then(function(response) {
      if (response.status === 401) {
        window.location.replace('/');
      }
      console.log(response);
      return response.json();
    })
    .then(function(newList) {
      console.log(newList);
      renderList(newList.list);
    })
    .catch(function(err) {
      console.log(err);
    });
}

function setTitle(title) {
  document.getElementById('Heading').innerHTML = title;
}

function renderList(list) {
  var newList = document.createElement('div');
  newList.id = 'task' + list.id;
  newList.className = 'task';
  newList.style.backgroundColor = '#00a4bc';

  var title = document.createElement('h1');
  title.className = 'taskTitle';
  var text = document.createTextNode(list.name);
  title.appendChild(text);
  newList.appendChild(title);

  var line = document.createElement('HR');
  newList.appendChild(line);

  var form = document.createElement('ul');
  form.className = 'form';
  form.id = 'form';
  newList.appendChild(form);

  var date = document.createElement('p');
  date.className = 'date';
  var text = document.createTextNode(
    'Deadline ' + list.deadline.substring(0, list.deadline.length - 14)
  );
  date.appendChild(text);
  newList.appendChild(date);

  var input = document.createElement('input');
  input.id = 'taskInput';
  input.setAttribute('placeholder', 'Enter Task');
  newList.appendChild(input);

  var submitButton = document.createElement('button');
  submitButton.className = 'button';
  submitButton.id = 'submitButton';
  submitButton.onclick = createTask(list.id);
  var node = document.createTextNode('ADD');
  submitButton.appendChild(node);
  newList.appendChild(submitButton);

  document.getElementById('board').appendChild(newList);
}

function createTask(id) {
  return function() {
    var task = document.getElementById('taskInput').value;
    var taskText = document.createTextNode(task);
    var newTask = document.createElement('li');
    newTask.appendChild(taskText);
    document.getElementById('form').appendChild(newTask);
  };
}
