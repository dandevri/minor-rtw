var socket;

// Connect to the server
socket = io.connect('http://localhost:3000');

function sendValue() {
  var x = document.getElementById('text').value;

  // Send message from client
  socket.emit('message', x);

  // Handle message coming in
  socket.on('message', sendToClient);

  function sendToClient(newText) {
    document.getElementById('result').innerHTML = socket.id + `<br>` + newText;
  }
}
