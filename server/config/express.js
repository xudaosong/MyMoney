var config = require('./config'),
    http = require('http'),

//    socketio = require('socket.io'),
    express = require('express'),
    ejs = require('ejs'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    flash = require('connect-flash'),
    passport = require('passport');

module.exports = function (db) {
    var app = express();
    var server = http.createServer(app);
//    var io = socketio.listen(server);

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    var mongoStore = new MongoStore({
        db: db.connection.name
    });
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret,
        store: mongoStore
    }));
    app.set('views', config.static);
    app.engine('.html', ejs.__express);
    app.set('view engine', 'html');
    //app.set('view engine', 'ejs');

    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());

    require('../routes/index.server.routes')(app);
    require('../routes/users.server.routes')(app);
    require('../routes/voice-broadcast.server.routes')(app);

    if (process.env.NODE_ENV === 'development') {
        app.use(express.static('../../'));
        app.use(express.static('../web'));
    }
    app.use(express.static(config.static));

//    require('./socketio')(server, io, mongoStore);

    return server;
};