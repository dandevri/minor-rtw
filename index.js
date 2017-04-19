// Require express module
var express = require('express');

// Require request to make HTTP calls
var request = require('request');

// Require environment variables
var dot = require('dotenv').config();

var app = express();

// Add environment variables for deployment
var port = process.env.PORT || '3000';
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
        client_id: process.env.CLIENT_ID, // eslint-disable-line
        client_secret: process.env.CLIENT_SECRET, // eslint-disable-line
        redirect_uri: process.env.REDIRECT_URI, // eslint-disable-line
        grant_type: 'authorization_code' // eslint-disable-line
      }, function(err, httpResponse, body) {
        if (err) throw err
;        console.log(body);
        res.send('joe');
      }
    });
});

// Starts a UNIX socket and listen for connections
app.listen(port, host, function () {
  console.log('It has works on', host, port);
});
