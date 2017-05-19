// Import Express module - have acces to
var express = require('express');

// Trigger express function
var app = express();

var port = process.env.PORT || '3000';
var host = process.env.HOST || '0.0.0.0';

// Host the files (make public client side)
app.use(express.static('src'))
  .set('views', 'views')
  .set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/room', function (req, res) {
  res.render('pages/room');
});

app.get('/login', function (req, res) {
  res.render('pages/login');
});

app.listen(port, function () {
  console.log('Running on:', host, port);
});
