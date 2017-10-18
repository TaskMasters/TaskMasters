/*const express = require('express')
const app = express()

app.use(express.static('./public'))

app.get('/:id', function (req, res) {
  res.send('Hello ' + req.params.id)
})

app.listen(8080)

console.log('localhost:8080')
*/

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 8080));

app.use(express.static(__dirname + '/public'));

app.get('/:id', function (req, res) {
  res.send('Hello ' + req.params.id)
})

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
