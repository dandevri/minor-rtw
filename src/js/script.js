var socket = io.connect('http://localhost:3000');

var data = 'Dit is een bericht';

// Event to sent to the server
socket.emit('message', data);

// Handle message coming in
socket.on('message', sendDing);
function sendDing(data2) {
  console.log(data2);
}
