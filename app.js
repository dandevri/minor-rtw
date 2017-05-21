var http = require('http');
var socket = require('socket.io');
var express = require('express');
var session = require('express-session');

var port = process.env.PORT || '3000';
var host = process.env.HOST || '0.0.0.0';

// Trigger express function
var app = express()
  // Host the files (make public client side)
  .use(express.static('src'))

  // Parse dem cookies
  .use(session({
    // Keycode used in cookies
    secret: 'youpad',
    // Save stuff even when server is down
    resave: false,
    saveUninitialized: true
  }))

  .set('views', 'views')
  .set('view engine', 'ejs')
  .get('/', renderLogin)
  .get('/room', renderRoom);

var server = http.createServer(app);

// Give server as argument
var io = socket(server);

server.listen(port, function () {
  console.log('Running on:', host, port);
});

function renderRoom(req, res) {
  res.render('pages/room');
}

function renderLogin(req, res) {
  console.log(req.session);
  res.render('pages/login');
}

/* Socket.IO server-side
------------------------------ */

// Deal with connection event
io.sockets.on('connection', newConnection);

// Socket argument fire this when there is a new connection
function newConnection(socket) {
  // Log the socket id
  console.log('New connection: ' + socket.id);

  // When textArea received from client
  socket.on('textArea', sendTextarea);

  // When searchField received from client
  socket.on('searchField', sendSearchfield);

  // Send textarea message to all clients
  function sendSearchfield(field) {
    console.log(field);
  }

  // Send textarea message to all clients
  function sendTextarea(text) {
    io.sockets.emit('textArea', text);
    console.log(text);
  }

  // Client disconnect
  socket.on('disconnect', function () {
    console.log('User disconnected: ' + socket.id);
  });
}
