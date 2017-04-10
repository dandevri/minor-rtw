var express = require('express');

var app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', '/views');

app.get('/', function (req, res) {
  res.render('index');
});

app.listen(1337, function () {
  console.log('App is listening on port 1337!');
});
