// Load libraries and modules
var express = require('express');

var app = express();

// GET, POST etc. go through static folder to look for files
app.use(express.static('src'));

// Set templating engine to ejs
app.set('view engine', 'ejs');
app.set('views', 'views');

// Middleware to render page
app.get('/', function (req, res) {
  res.render('index');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
