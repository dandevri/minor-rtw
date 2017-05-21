var socket = io();

localforage.getItem('userProfile', function(err, data) {
  if (!document.querySelector(`[data-id="${socket.io.engine.id}"]`)) {
    document.querySelector('.profile').innerHTML += createUserHTML({
      id: socket.io.engine.id,
      userProfile: data
    }, true);
  }
  socket.emit('CONNECT_USER', data);
});

function createUserHTML(data, current = false) {
  return `
    <div data-id="${data.id}" class="user ${current ? 'admin' : ''}">
      <p><strong>${data.userProfile.profileName}</strong></p>
      <img src="${data.userProfile.profileImage}">
      <a href="/room">Go to room</a>
    </div>`;
}
socket.on('NEW_VIDEO', function(message) {
  document.querySelector('iframe').src = message;
});

socket.on('CONNECT_USER', function(data) {
  document.querySelector('.profile').innerHTML += createUserHTML(data);
});

socket.on('DISCONNECT_USER', function(id) {
  document.querySelector(`[data-id="${id}"]`).remove();
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
