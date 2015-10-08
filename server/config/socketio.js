var config = require('./config'),
    cookieParser = require('cookie-parser'),
    passport = require('passport');
module.exports = function (server, io, mongoStore) {
    io.use(function (socket, next) {
        cookieParser(config.sessionSecret)(socket.request, {}, function (err) {
            var sessionId = socket.request.signedCookies['connect.sid'];
            mongoStore.get(sessionId, function (err, session) {
                socket.request.session = session;
                passport.initialize()(socket.request, {}, function () {
                    passport.session()(socket.request, {}, function () {
                        if (socket.request.user) {
                            next(null, true);
                        } else {
                            next(new Error('请登录'), false);
                        }
                    });
                });
            });
        });
    });

    io.on('connection', function (socket) {
        require('../controllers/chat.server.controller')(io, socket);
    });
};