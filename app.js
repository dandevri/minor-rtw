var express = require('express');
var app = express();

var port = process.env.PORT || '3000';
var host = process.env.HOST || '0.0.0.0';

app.get('/', function (req, res) {
  res.send('Hello world');
});

app.listen(port, function () {
  console.log('Running on:', host, port);
});
