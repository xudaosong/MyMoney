process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('./config/mongoose'),
    express = require('./config/express'),
    config = require('./config/config'),
    passport = require('./config/passport');

var db = mongoose();
var app = express(db);
var passport = new passport();

app.listen(config.port); 

module.exports = app;

console.log('Server running at http://127.0.0.1:'+config.port);

