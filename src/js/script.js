var socket = io();

var messages = document.getElementById('messagelist');

// Event to sent to the server
document.getElementById('chatform').onsubmit = function () {
  var formInput = document.getElementById('message'); // Get form Input
  var value = formInput.value; // Get value from input
  socket.emit('message', value); // Emit the message to server
  return false; // Prevent the form from submitting
};

// Handle message coming in
socket.on('message', function (msg) {
  var listItem = document.createElement('li'); // Create listitem
  messages.appendChild(listItem).innerHTML = (msg); // Append the list item with the message
});
