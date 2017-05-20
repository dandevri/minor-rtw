var socket;

// Connect to the server
socket = io.connect('http://localhost:3000');

function sendValue() {
  var x = document.getElementById('text').value;
  var video = document.querySelector('.video');

  // Send message from client
  socket.emit('message', x, video);

  // Handle message coming in
  socket.on('message', sendToClient);

  function sendToClient(newText) {
    document.getElementById('text').value = newText;
  }
}
