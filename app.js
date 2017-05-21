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
  .get('/', renderLogin)
  .get('/room', renderRoom);

var server = http.createServer(app);

// Give server as argument
var io = socket(server);

server.listen(port, function () {
  console.log('Running on:', host, port);
});

var connectedUsers = {};

function renderRoom(req, res) {
  res.render('pages/room', {connectedUsers: connectedUsers});
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

  socket.on('CONNECT_USER', function(userProfile) {
    connectedUsers[socket.id] = userProfile;
    socket.broadcast.emit('CONNECT_USER', {
      userProfile: userProfile,
      id: socket.id
    });
  });

  // When textArea received from client
  socket.on('textArea', sendTextarea);

  // When searchField received from client
  socket.on('searchField', sendSearchfield);

  // Send textarea message to all clients
  function sendSearchfield(field) {
    // hier komt een api rekwest naar utub.
    io.emit('NEW_VIDEO', `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(field)}`);
  }

  // Send textarea message to all clients
  function sendTextarea(text) {
    io.sockets.emit('textArea', text);
    console.log(text);
  }

  // Client disconnect
  socket.on('disconnect', function () {
    console.log('User disconnected: ' + socket.id);
    socket.broadcast.emit('DISCONNECT_USER', socket.id);
    delete connectedUsers[socket.id];
  });
}
