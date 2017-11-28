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

addBoard();

function addBoard() {
  for (i = 0; i < 12; i++) {
    var x = Math.floor(Math.random() * 8);

    var newBoard = document.createElement('div');
    newBoard.id = 'board';
    newBoard.style.backgroundColor = color[x];
    console.log(x);

    var title = document.createElement('h1');
    title.id = 'boardTitle';
    var text = document.createTextNode('Board ' + (i + 1));
    title.appendChild(text);
    newBoard.appendChild(title);

    var description = document.createElement('p');
    description.id = 'description';
    var descText = document.createTextNode(
      'This is a description for board nr: ' + (i + 1)
    );
    description.appendChild(descText);
    newBoard.appendChild(description);

    var boards = document.getElementById('boards');

    boards.appendChild(newBoard);
  }
}
