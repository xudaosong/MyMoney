var config = require('./config'),
    http = require('http'),

//    socketio = require('socket.io'),
    express = require('express'),
    ejs = require('ejs'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    // cookieParser = require('cookie-parser'),
    // session = require('express-session'),
    cors = require('cors'),
    // MongoStore = require('connect-mongo')(session),
    flash = require('connect-flash'),
    unless = require('express-unless'),
    // passport = require('passport');
    expressJwt = require('express-jwt'),
    jwt = require('jsonwebtoken');

module.exports = function (db) {
    var app = express();
    var server = http.createServer(app);
    // var whitelist = ['http://app.money.dev']; // Acceptable domain names. ie: https://www.example.com
    // var corsOptions = {
    //   credentials: true,
    //   origin: function(origin, callback){
    //     var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    //     callback(null, originIsWhitelisted);
    //     // callback(null, true); uncomment this and comment the above to allow all
    //   }
    // };
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

    // var jwtCheck = expressJwt({
    //     secret: config.sessionSecret
    // });
    var jwtCheck = expressJwt({secret: config.secret}).unless( {path: 
        [
            '/api/login',
            '/api/signup',
            '/api/logout'
        ]
    });
    // app.use(jwtCheck);
    app.use('/api', jwtCheck);
    // app.use(utils.middleware().unless({path: '/api/login' }));
    // var mongoStore = new MongoStore({
    //     db: db.connection.name
    // });
    // app.use(cookieParser());
    // app.use(session({
    //     key:'money.sid',
    //     saveUninitialized: true,
    //     resave: true,
    //     secret: config.sessionSecret,
    //     store: mongoStore, 
    //     cookie: { 
    //         path: '/',
    //         domain: '.money.dev',
    //         maxAge: 1000 * 60 * 24
    //     }
    // }));
    app.use(cors());
    app.set('views', config.static);
    app.engine('.html', ejs.__express);
    app.set('view engine', 'html');
    //app.set('view engine', 'ejs');

    app.use(flash());
    // app.use(passport.initialize());
    // app.use(passport.session());

    // require('../routes/index.server.routes')(app);
    require('../routes/authentication.server.routes')(app);
    require('../routes/voice-broadcast.server.routes')(app);
    require('../routes/article.server.routes')(app);
    require('../routes/file-upload.server.routes')(app);
    require('../routes/checklist.server.routes')(app);
    require('../routes/price-ratio.server.routes')(app);
    require('../routes/stock.server.routes')(app);
    require('../routes/stock-technology.server.routes')(app);
    require('../routes/sync.server.routes')(app);

    if (process.env.NODE_ENV === 'development') {
        app.use(express.static('../../'));
        app.use(express.static('../web'));
    }
    app.use(express.static(config.static));
    app.use(express.static(config.resources));

//    require('./socketio')(server, io, mongoStore);

    return server;
};