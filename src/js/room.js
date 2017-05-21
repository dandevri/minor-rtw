var socket;

// Connect to the server
socket = io.connect('http://localhost:3000');

localforage.getItem('userProfile', function(err, data) {
  document.querySelector('.profile').innerHTML +=
  `<div class="user">` +
    `<p>Hello, <strong>` + data.profileName + `</strong> </p>` +
    `<img src="` + data.profileImage + `">` +
    `<a href="/room">Go to room</a>` +
  `</div>`;
});

document.getElementById('search').onsubmit = function() {
  sendSearchfield();
  return false;
};

function sendSearchfield() {
  var searchField = document.getElementById('keyword').value;

  // Send message from client
  socket.emit('searchField', searchField);
}

function sendValue() {
  var textArea = document.getElementById('text').value;

  // Send message from client
  socket.emit('textArea', textArea);

  // Handle message coming in
  socket.on('textArea', sendToClient);

  function sendToClient(newText) {
    document.getElementById('text').value = newText;
  }
}
