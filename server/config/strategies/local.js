var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('mongoose').model('User');

module.exports = function () {
    // 注册本地验证策略，当需要对用户鉴权时，会执行LocalStrategy实例的回调函数
    // 鉴权完成时，需要调用回调函数done
    passport.use(new LocalStrategy(function (username, password, done) {
        User.findOne({ // 通用username查找用户并执行鉴权
            username: username
        }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {
                    message: '用户不存在'
                });
            }
            if (!user.authenticate(password)) {
                return done(null, false, {
                    message: '密码不正确'
                });
            }
            return done(null, user);
        });
    }));
};