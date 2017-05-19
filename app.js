var express = require('express');

var GoogleAuth = require('google-auth-library');

var app = express();

var port = process.env.PORT || '3000';
var host = process.env.HOST || '0.0.0.0';

app.use(express.static('src'))
  .set('views', 'views')
  .set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/login', function (req, res) {
  res.render('pages/login');
});

app.listen(port, function () {
  console.log('Running on:', host, port);
});
