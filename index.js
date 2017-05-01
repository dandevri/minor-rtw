// Require express module
var express = require('express');

// Require request to make HTTP calls
var request = require('request');

// Require environment variables
var dot = require('dotenv').config();

var app = express();

// Add environment variables for deployment
var port = process.env.PORT || 3000;
var host = process.env.HOST || '0.0.0.0';

// Set src as static folder
app.use(express.static('src'));

// Templating Engine - Set view engine to ejs and views folder
app.set('view engine', 'ejs');
app.set('views', 'views');

// Route - Render index.ejs if you get response
app.get('/', function (req, res) {
  res.render('index.ejs');
});

// Route - Post request if user is granted
app.get('/oauth', function (req, res) {
  request
    .post({
      url: 'https://www.googleapis.com/oauth2/v4/token',
      form: {
        code: req.query.code, // Get code from request URL
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: process.env.REDIRECT_URI,
        grant_type: 'authorization_code'
      }
    }, function (err, httpResponse, body) {
      // console.log(body);

      // Parse the response to json. We have access to the token here.
      var accessToken = JSON.parse(body);

      // Make request to Google Api to get list of playlists.
      request('https://www.googleapis.com/youtube/v3/playlists?part=snippet&mine=true&access_token=' + accessToken.access_token,
        function (err, httpResponse, body) {
          // console.log(body);
          var playlists = JSON.parse(body);

          // Loop over all the items in de playlist
          var urls = playlists.items.map(function (item) {
            return 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=' + item.id + '&access_token=' + accessToken.access_token;
          });

          var playlistInfo = [];
          var completedRequests = 0;

          urls.forEach(function (url) {
            request(url, function (err, httpResponse, body) {
              // Push the playlist info to the array.
              playlistInfo.push(JSON.parse(body));
              completedRequests++;
              if (completedRequests === urls.length) {
                console.log('im done. :tada:');
                console.log(playlistInfo);
                res.render('pages/list.ejs', {playlists: playlists, playlistInfo: playlistInfo});
              }
            });
          });
        }
      );
    });
});
// Starts a UNIX socket and listen for connections
app.listen(port, host, function () {
  console.log('It has works on', host, port);
});
