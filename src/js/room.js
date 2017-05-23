var socket = io();

// Get the data from localStorage
localforage.getItem('userProfile', function(err, data) {
  // Check own socket.id, otherwise append list item
  if (!document.querySelector(`[data-id="${socket.io.engine.id}"]`)) {
    document.querySelector('.connected').innerHTML += createUserHTML({
      id: socket.io.engine.id,
      userProfile: data
      // Give true to check in createUserHTML
    }, true);
  }
  // Send connect user to the client with the data
  socket.emit('CONNECT_USER', data);
});

// Create the list item with the data from google sign in.
function createUserHTML(data, current = false) {
  // If current is true add admin class. If socket.id is true to make admin
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
  // Remove the list item when user disconnects
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
  var notification = document.getElementById('connection');

  if (navigator.onLine) {
    notification.classList.remove('offline');
  } else {
    notification.classList.add('offline');
  }
}
