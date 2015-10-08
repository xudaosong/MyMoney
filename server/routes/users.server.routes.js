var users = require('../controllers/users.server.controller.js'),
    passport = require('passport');
module.exports = function (app) {
    app.route('/signup').get(users.renderSignup).post(users.signup);
    // 在路由中注册passport.authenticate()方法进行身份验证。
    app.route('/signin').get(users.renderSignin).post(passport.authenticate('local', { // 使用local策略进行身份验证
        successRedirect: '/', // 告知passport身份验证成功后跳转的地址
        failureRedirect: '/signin', // 告知passport身份验证失败后跳转的地址
        failureFlash: true // 告知passport是否使用flash消息
    }));
    app.route('/signout').get(users.signout);
//    app.route('/users').post(users.create).get(users.list);
//    app.route('/users/:userId').get(users.read).put(users.update).delete(users.delete);
//    app.param('userId', users.userByID)
};