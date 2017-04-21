// Require express module
var express = require('express');

// Require request to make HTTP calls
var request = require('request');

// Require environment variables
var dot = require('dotenv').config();

var app = express();

// Add environment variables for deployment
var port = process.env.PORT || 3100;
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
      console.log(body);
      // Parse the response to json. We have access to the token here.
      var accessToken = JSON.parse(body);

      request('https://www.googleapis.com/youtube/v3/playlists?part=snippet&mine=true&access_token=' + accessToken.access_token,
        function (err, httpResponse, body) {
          console.log(body);
          var data = JSON.parse(body);
          res.render('pages/list.ejs', {data: data});
        }
      );
    });
});

// Starts a UNIX socket and listen for connections
app.listen(port, host, function () {
  console.log('It has works on', host, port);
});
