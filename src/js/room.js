var socket;

// Connect to the server
socket = io.connect('http://localhost:3000');

function sendValue() {
  var text = document.querySelector('[contenteditable]').innerHTML;

  // Send message from client
  socket.emit('message', text);
  // console.log(text);

  // Handle message coming in
  socket.on('message', sendToClient);

  function sendToClient(newText) {
    document.getElementById('text').innerHTML = newText;
  }
}

setInterval(function () {
  sendValue();
}, 4000);
