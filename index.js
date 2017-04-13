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
var server = app.listen(1337, function () {
  console.log('Great success! 🎉 The app is running on: localhost:1337')
});
var io = socket(server);

// Deal with event connection
io.sockets.on('connection', newConnection);

// Function that runs if there is a connection
function newConnection(socket) {
  console.log('new connection:' + socket.id);

  // Do this if you receive message
  socket.on('message', sendToClient);

  function sendToClient(msg) {
    // Send to other clients
    io.emit('message', msg);
  }
}
