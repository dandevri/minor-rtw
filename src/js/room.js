var socket;

// Connect to the server
socket = io.connect('http://localhost:3000');

function sendValue() {
  var text = document.getElementById('text1').textContent;

  // Send message from client
  socket.emit('message', text);

  // Handle message coming in
  socket.on('message', text2);

  function text2(data2) {
    console.log('New message: ' + data2);
  }
}

// Fire on click
document.getElementById('send').addEventListener('click', sendValue);
