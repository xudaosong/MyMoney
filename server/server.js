process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('./config/mongoose'),
    express = require('./config/express'),
    passport = require('./config/passport');

var db = mongoose();
var app = express(db);
var passport = new passport();

app.listen(3000); 

module.exports = app;

console.log('Server running at http://127.0.0.1:3000/');

