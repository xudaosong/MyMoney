process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('./server/config/mongoose'),
    express = require('./server/config/express'),
    passport = require('./server/config/passport');

var db = mongoose();
var app = express(db);
var passport = new passport();

app.listen(63342);

module.exports = app;

console.log('Server running at http://localhost:63342/');

