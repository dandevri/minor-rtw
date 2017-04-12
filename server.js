// Import modules
var express = require('express');
var socket = require('socket.io');

var app = express();

// Set static folder
app.use(express.static('src'));
app.set('views', 'views'); // Specify view directory
app.set('view engine', 'ejs'); // Specify templating engine

app.get('/', function (req, res) {
  res.render('index');
});

// Listen on port
var server = app.listen(3000);
var io = socket(server);

// Deal with event connection
io.sockets.on('connection', newConnection);

function newConnection(socket) {
  console.log('You connection is' + socket.id);

  socket.emit('bericht', 'ghello');
}
