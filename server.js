const express = require('express')
const app = express()

app.use(express.static(__dirname + '/public'));
//app.use(express.static('./public'))

app.get('/:id', function (req, res) {
  res.send('Hello ' + req.params.id)
})

app.listen(8080)

console.log('localhost:8080')
