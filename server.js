var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var routes = require('./server/routes');
var mongoose = require('mongoose');
var config = require('./config');

var morgan = require('morgan');

// use morgan to log requests to the console
app.use(morgan('dev'));

// Connect to db
mongoose.connect(config.database);
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

var port = process.env.PORT || 8000;

// start the server
app.listen(port, function() {
  console.log('Magic happens at http://localhost:' + port);
});

module.exports = app;
