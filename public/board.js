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

function createTask() {
  var newTask = document.createElement('div');
  newTask.className = 'task';
  newTask.style.backgroundColor = '#00a4bc';

  var title = document.createElement('h1');
  title.className = 'taskTitle';
  var text = document.createTextNode(document.getElementById('title').value);
  title.appendChild(text);
  newTask.appendChild(title);

  var line = document.createElement('HR');
  newTask.appendChild(line);

  var form = document.createElement('form');
  form.className = 'form';
  form.id = 'form';
  newTask.appendChild(form);

  var input = document.createElement('input');
  input.id = 'taskInput';
  input.setAttribute('placeholder', 'Enter Task');
  newTask.appendChild(input);

  var submitButton = document.createElement('button');
  submitButton.className = 'button';
  submitButton.id = 'submitButton';
  submitButton.onclick = addTask;
  var node = document.createTextNode('ADD');
  submitButton.appendChild(node);
  newTask.appendChild(submitButton);

  document.getElementById('board').appendChild(newTask);
}

function addTask() {
  var task = document.getElementById('taskInput').value;
  var taskText = document.createTextNode(task);
  var newTask = document.createElement('li');
  newTask.appendChild(taskText);
  document.getElementById('form').appendChild(newTask);
}
