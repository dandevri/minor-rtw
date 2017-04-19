// Require express module
var express = require('express');

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

// Route -
app.get('/oauth', function (req, res) {
  res.send('It has kinda works');
});

// Starts a UNIX socket and listen for connections
app.listen(port, host, function () {
  console.log('It has works on', host, port);
});
