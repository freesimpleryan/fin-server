process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('./config/mongoose'),
	express = require('./config/express');

var db = mongoose();
var app = express(db);

app.listen(8080);
module.exports = app;

console.log('server running at http://localhost');

