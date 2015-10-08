var passport = require('passport'),
    mongoose = require('mongoose');

module.exports = function () {
    var User = mongoose.model('User');
    // 当用户鉴权完成后，会将用户的_id属性存储到会话中。
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    // 当需要使用user对象时，Passport便使用_id属性从数据库中获取用户信息
    passport.deserializeUser(function (id, done) {
        // 返回的用户信息不包含password和salt
        User.findOne({
            _id: id
        }, '-password -salt', function (err, user) {
            done(err, user);
        });
    });
    require('./strategies/local')();
};