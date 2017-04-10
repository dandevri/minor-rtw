var express = require('express');

var app = express();

app.use(express.static('src'));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/', function (req, res) {
  res.render('index');
});

app.listen(3000, function () {
  console.log('App is listening on port 3000!');
});
