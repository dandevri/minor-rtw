var socket = io();

localforage.getItem('userProfile', function(err, data) {
  if (!document.querySelector(`[data-id="${socket.io.engine.id}"]`)) {
    document.querySelector('.connected').innerHTML += createUserHTML({
      id: socket.io.engine.id,
      userProfile: data
    }, true);
  }
  socket.emit('CONNECT_USER', data);
});

function createUserHTML(data, current = false) {
  return `
    <li data-id="${data.id}" class="user ${current ? 'admin' : ''}">
      <img src="${data.userProfile.profileImage}">
      <p>${data.userProfile.profileName}</p>
    </li>`;
}

// Put the message (iframe with) in the iframe tag
socket.on('NEW_VIDEO', function(message) {
  document.querySelector('iframe').src = message;
});

// When user connects add a div in the topbar
socket.on('CONNECT_USER', function(data) {
  document.querySelector('.connected').innerHTML += createUserHTML(data);
});

// When user disconnects
socket.on('DISCONNECT_USER', function(id) {
  document.querySelector(`[data-id="${id}"]`).remove();
});

// On submit of the searchfield send the value to the server
document.getElementById('search').onsubmit = function () {
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

/* Client offline event */
window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

function updateOnlineStatus(event) {
  var notification = document.getElementById('#connection');
}
