var User = require('mongoose').model('User'),
    passport = require('passport');
// 用于处理Mongoose错误对象并返回统一的错误消息
var getErrorMessage = function (err) {
    var message = '';
    if (err.code) {// 如果是MongoDB索引错误
        switch (err.code) {
            case 11000:
            case 11001:
                message = '用户名已经存在';
                break;
            default:
                message = '发生未知错误';
                break;
        }
    } else { // 如果是MongoDB校验错误
        for (var errName in err.errors) {
            if (err.errors[errName].message) {
                message = err.errors[errName].message;
            }
        }
    }
    return message;
};
exports.login = function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) { return next(err); }
        if (!user) {
            return res.status(401).send({
                code: 401,
                message: info.message
            });
        }
        req.logIn(user, function (err) {
            if (err) { return next(err); }
            return res.send();
        });
    })(req, res, next);
    // return res.json({
    //     code: 200
    // });
};
// 使用User模型来创建新用户
exports.signup = function (req, res, next) {
    if (!req.user) {
        var user = new User(req.body);
        var message = null;
        user.provider = 'local';
        user.save(function (err) {
            if (err) {
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
                //message = getErrorMessage(err);
                // 当对页面进行重新定向时，无法直接将参数传给目的页面。
                // 所以需要Node模块connect-flash，它具有在不同的请求之间传递临时消息的机制
                //req.flash('error', message); // 将错误消息写入flash中
                //return res.redirect('/signup');
            } else {
                return res.json({
                    message: 'success'
                });
            }
            // 如果注册成功，则使用passport的login方法进行登录，登录成功后，user对象会注册到req.user对象中
            //req.login(user, function (err) {
            //    if (err) return next(err);
            //    return res.redirect('/');
            //});
        });
    } else {
        return res.redirect('/');
    }
};
// 退出当前用户
exports.logout = function (req, res, next) {
    if (req.user) {
        req.logout(); // 使用passport里的logout方法进行用户退出
        return res.redirect('/');
    }
};
// 用于展现views/signin.ejs登录页面
exports.renderLogin = function (req, res, next) {
    if (!req.user) {// 登录成功后，passport会在session中存储user
        res.render('login');
    } else {
        return res.redirect('/');
    }
};
// 用于展现view/signup.ejs注册页面
exports.renderSignup = function (req, res, next) {
    if (!req.user) { // 登录成功后，passport会在session中存储user
        res.render('signup');
    } else {
        return res.redirect('/');
    }
};
// note: 我们没有编写signin()方法，因为passport提供了一个专门的身份验证方法，可以直接用于定义路由。

/*




exports.create = function (req, res, next) {
    var user = new User(req.body);
    user.save(function (err) {
        if (err) {
            return next(err);
        } else {
            res.json(user);
        }
    });
};

exports.delete = function (req, res, next) {
    req.user.remove(function (err) {
        if (err) {
            return next(err);
        } else {
            res.json(req.user);
        }
    })
};

exports.update = function (req, res, next) {
    console.log(req.user.id, req.body);
    User.findByIdAndUpdate(req.user.id, req.body, function (err, user) {
        if (err) {
            return next(err);
        } else {
            res.json(user);
        }
    });
}

exports.read = function (req, res) {
    res.json(req.user);
};

exports.userByID = function (req, res, next, id) {
    User.findOne({
        _id: id
    }, function (err, user) {
        if (err) {
            return next(err);
        } else {
            req.user = user;
            next();
        }
    })
};

exports.list = function (req, res, next) {
    User.find({}, function (err, users) {
        if (err) {
            return next(err);
        } else {
            res.json(users);
        }
    });
};*/
