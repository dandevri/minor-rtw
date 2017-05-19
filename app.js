var http = require('http');
var socket = require('socket.io');
var express = require('express');

var port = process.env.PORT || '3000';
var host = process.env.HOST || '0.0.0.0';

// Trigger express function
var app = express()
  // Host the files (make public client side)
  .use(express.static('src'))
  .set('views', 'views')
  .set('view engine', 'ejs')
  .get('/', renderIndex)
  .get('/room', renderRoom)
  .get('/login', renderLogin);

var server = http.createServer(app);

// Give server as argument
var io = socket(server);

server.listen(port, function () {
  console.log('Running on:', host, port);
});

function renderIndex(req, res) {
  res.render('index');
}

function renderRoom(req, res) {
  res.render('pages/room');
}

function renderLogin(req, res) {
  res.render('pages/login');
}

// Deal with connection event
io.sockets.on('connection', newConnection);

// Socket argument fire this when there is a new connection
function newConnection(socket) {
  console.log('New connection: ' + socket.id);

  socket.on('message', sendToClients);

  // Send message to all clients
  function sendToClients(data) {
    io.sockets.emit('message', data);
    console.log(data);
  }
}
