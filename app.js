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

// Save for later use
var connectedUsers = {};

// Send connectedUser to client
function renderRoom(req, res) {
  res.render('pages/room', {connectedUsers: connectedUsers});
}

function renderLogin(req, res) {
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

  // Emit to all other clients except user.
  socket.on('CONNECT_USER', function (userProfile) {
    // For every user add userProfile to object
    connectedUsers[socket.id] = userProfile;
    socket.broadcast.emit('CONNECT_USER', {
      // Send the user profile and socket id to client
      userProfile: userProfile,
      id: socket.id
    });
  });

  // When textArea received from client
  socket.on('textArea', sendTextarea);

  // When searchField received from client
  socket.on('searchField', sendSearchfield);

  // Send searchfield message to all clients
  function sendSearchfield(field) {
    // Api request to Youtube send it to all clients
    io.emit('NEW_VIDEO',
    // EncodeURI Make sure spaces work
     `${(field)}`);
  }

  // Send textarea message to all clients
  function sendTextarea(text) {
    io.sockets.emit('textArea', text);
  }

  // Client disconnect
  socket.on('disconnect', function () {
    console.log('User disconnected: ' + socket.id);
    // Broadcast to all other clients. Delete the socket.id from the connecter
    socket.broadcast.emit('DISCONNECT_USER', socket.id);
    // Delete the property
    delete connectedUsers[socket.id];
  });

  // When video playing received from client
  socket.on('videoPlay', sendPlaying);
 // Send to all client except self
  function sendPlaying() {
    socket.broadcast.emit('videoPlay', true);
  }

  // When video pause received from client
  socket.on('videoPause', sendPause);
  // Send to all client except self
  function sendPause() {
    socket.broadcast.emit('videoPause', true);
  }
}
