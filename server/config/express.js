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
    cors = require('cors'),
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
    app.use(cors());

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
    require('../routes/authentication.server.routes')(app);
    require('../routes/voice-broadcast.server.routes')(app);
    require('../routes/article.server.routes')(app);
    require('../routes/file-upload.server.routes')(app);
    require('../routes/checklist.server.routes')(app);
    require('../routes/price-ratio.server.routes')(app);

    if (process.env.NODE_ENV === 'development') {
        app.use(express.static('../../'));
        app.use(express.static('../web'));
    }
    app.use(express.static(config.static));
    app.use(express.static(config.resources));

//    require('./socketio')(server, io, mongoStore);

    return server;
};