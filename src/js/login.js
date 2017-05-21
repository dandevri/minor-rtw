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

  localforage.setItem('userProfile', {
    profileName: profileName,
    profileImage: profileImage,
    profileEmail: profileEmail
  });

  addProfileScreen();
  removeSignButton();
  addSignOutButton();
}

function addProfileScreen() {
  document.querySelector('.profile').innerHTML +=
  `<div class="user">` +
    `<p>Hello, <strong>` + profileName + `</strong> </p>` +
    `<img src="` + profileImage + `">` +
    `<a href="/room">Go to room</a>` +
  `</div>`;
}

function renderButton() {
  gapi.signin2.render('my-signin2', {
    scope: 'profile email',
    width: 240,
    height: 50,
    longtitle: true,
    theme: 'dark',
    onsuccess: onSignIn
  });
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  removeProfileScreen();
  removeSignOutButton();
}

function removeSignButton() {
  var selectButton = document.querySelector('.login').classList.add('hidden');
}

function addSignOutButton() {
  var selectButton = document.querySelector('.g-signout').classList.remove('hidden');
}

function removeSignOutButton() {
  var selectButton = document.querySelector('.g-signout').classList.add('hidden');
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
