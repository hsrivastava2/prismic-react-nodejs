// Set Babel
require('babel-register')({
  "presets": [
    ["react"]
  ]
});

// Express
var express = require('express');
var app = express();
var path = require('path');

// ejs Template engine
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

// Configure Prismic
var prismic = require('express-prismic').Prismic;
var configuration = require('./prismic-configuration').Configuration;
prismic.init(configuration);

// ROUTES
var routes = require('./routes'); 
routes(app, prismic);

// Start Server
var PORT  = 5000;
app.listen(PORT, function() {
	console.log("http://localhost:" + PORT);
});