document.getElementById('deadline').valueAsDate = new Date();

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
  newList.id = 'list' + list.id;
  newList.className = 'list';
  newList.style.backgroundColor = '#00a4bc';

  var title = document.createElement('h1');
  title.className = 'listTitle';
  var text = document.createTextNode(list.name);
  title.appendChild(text);
  newList.appendChild(title);

  var line = document.createElement('HR');
  newList.appendChild(line);

  var todoList = document.createElement('ul');
  todoList.className = 'todoList';
  todoList.id = 'todoList' + list.id;
  newList.appendChild(todoList);

  var date = document.createElement('p');
  console.log(list.deadline);
  date.className =
    'date' +
    (new Date(list.deadline).getTime() > new Date().getTime()
      ? 'due'
      : 'overdue');
  var text = document.createTextNode(
    'Deadline ' +
      new Date(list.deadline)
        .toLocaleDateString()
        .substring(0, list.deadline.length - 14)
  );
  date.appendChild(text);
  newList.appendChild(date);

  var form = document.createElement('form');
  form.onsubmit = createTodo(list.id);
  newList.appendChild(form);

  var input = document.createElement('input');
  input.id = 'todoInput' + list.id;
  input.setAttribute('placeholder', 'Enter Task');
  form.appendChild(input);

  var submitButton = document.createElement('button');
  submitButton.className = 'button';
  submitButton.onclick = createTodo(list.id);
  submitButton.type = 'submit';
  var node = document.createTextNode('ADD');
  submitButton.appendChild(node);
  form.appendChild(submitButton);

  var deleteButton = document.createElement('button');
  deleteButton.className = 'button';
  deleteButton.onclick = deleteList(list.id);
  var node = document.createTextNode('DELETE LIST');
  deleteButton.appendChild(node);
  newList.appendChild(deleteButton);

  document.getElementById('board').appendChild(newList);

  if (list.todos) {
    list.todos
      .sort(function(a, b) {
        return a.done - b.done;
      })
      .forEach(function(todo) {
        renderTodo(todo);
      });
  }
}

function createTodo(id) {
  return function(e) {
    e.preventDefault();
    fetch('/API/todos', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('myApp@token')
      },
      body: JSON.stringify({
        text: document.getElementById('todoInput' + id).value,
        listid: id
      })
    })
      .then(function(response) {
        if (response.status === 401) {
          window.location.replace('/');
        }
        console.log(response);
        return response.json();
      })
      .then(function(newTodo) {
        console.log(newTodo);
        renderTodo(newTodo.todo);
      })
      .catch(function(err) {
        console.log(err);
      });
  };
}

function deleteList(id) {
  return function(e) {
    e.preventDefault();
    fetch('/API/lists/' + id, {
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
      .then(function(deletedTodo) {
        console.log(deletedTodo);
        document.getElementById('list' + deletedTodo.id).remove();
      })
      .catch(function(err) {
        console.log(err);
      });
  };
}

function renderTodo(todo) {
  var taskText = document.createTextNode(todo.text);
  var newTask = document.createElement('li');
  newTask.onclick = toggleDone(todo);
  newTask.id = 'todo' + todo.id;
  newTask.className = 'todo' + (todo.done ? 'done' : 'notDone');
  newTask.appendChild(taskText);
  console.log(todo.listid);
  document.getElementById('todoList' + todo.list_id).appendChild(newTask);
}

function updateTodo(updatedTodo) {
  var todo = document.getElementById('todo' + updatedTodo.id);
  todo.className = 'todo' + (updatedTodo.done ? 'done' : 'notDone');
  todo.onclick = toggleDone(updatedTodo);
}

function toggleDone(todo) {
  return function(e) {
    e.stopPropagation();
    e.preventDefault();
    console.log(
      JSON.stringify({
        done: !todo.done
      })
    );
    fetch('/API/todos/' + todo.id, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('myApp@token')
      },
      body: JSON.stringify({
        done: !todo.done
      })
    })
      .then(function(response) {
        if (response.status === 401) {
          window.location.replace('/');
        }
        updateTodo(Object.assign(todo, { done: !todo.done }));
        console.log(response);
      })
      .catch(function(err) {
        console.log(err);
      });
  };
}
