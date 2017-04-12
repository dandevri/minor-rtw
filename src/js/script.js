var socket;

socket = io.connect('http://localhost:3000');

socket.on('bericht', function(data) {
  console.log(data);
})
