const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const APIrouter = require('./APIroutes');
const ClientRouter = require('./ClientRoutes');

const app = express();
const port = process.env.PORT || 8080;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(ClientRouter());
app.use('/API', APIrouter());

app.listen(port, () => {
  console.log('Node app is running on port', port);
});
