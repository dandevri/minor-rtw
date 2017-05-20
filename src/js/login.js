// Store for later use
var profileName = '';
var profileImage = '';
var profileEmail = '';

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  profileName = profile.getName();
  console.log(profileName);
  profileImage = profile.getImageUrl();
  console.log(profileImage);
  profileEmail = profile.getEmail();
  console.log(profileEmail);
  addProfileScreen();
  removeSignButton();
}

function addProfileScreen() {
  document.querySelector('.profile').innerHTML +=
  `<div class="user">` +
    `<p>Hi ` + profileName + `</p>` +
    `<img src="` + profileImage + `">` +
    `<a href="/room">Go to room</a>` +
  `</div>`;
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  removeProfileScreen();
}

function removeSignButton() {
  var selectButton = document.querySelector('.login').classList.add('hidden');
}

function addSignButton() {
  var selectButton = document.querySelector('.login').classList.remove('hidden');
}

function removeProfileScreen() {
  // Remove the user div
  var selectProfile = document.querySelector('.profile');
  var selectUser = document.querySelector('.user');
  selectProfile.removeChild(selectUser);
  addSignButton();
}
