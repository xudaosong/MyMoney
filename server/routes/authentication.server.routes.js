var authentication = require('../controllers/authentication.server.controller.js');
module.exports = function(app) {
    app.route('/api/signup').post(authentication.signup);
    // 在路由中注册passport.authenticate()方法进行身份验证。
    // app.route('/login').get(authentication.renderLogin);
    app.route('/api/login').post(authentication.login);
    // app.route('/api/logout').get(authentication.logout);

    //    app.route('/users').post(users.create).get(users.list);
    //    app.route('/users/:userId').get(users.read).put(users.update).delete(users.delete);
    //    app.param('userId', users.userByID)
};

// ,{ // 使用local策略进行身份验证
//         successRedirect: '/', // 告知passport身份验证成功后跳转的地址
//         failureRedirect: '/login', // 告知passport身份验证失败后跳转的地址
//         failureFlash: true // 告知passport是否使用flash消息
//     }
