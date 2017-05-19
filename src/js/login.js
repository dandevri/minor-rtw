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
};

function welcomeScreen() {
  document.querySelector('.welcome').innerHTML +=
  `<p>Hi ` + profileName + `</p>` +
  `<img src="` + profileImage + `">`;
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}
