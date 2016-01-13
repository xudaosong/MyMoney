var User = require('mongoose').model('User'),
    path = require('path'),
    _ = require("lodash"),
    passport = require('passport'),
    config = require(path.join(__dirname, "..", "config", "config.js")),
    jwt = require('jsonwebtoken');
// 用于处理Mongoose错误对象并返回统一的错误消息
var getErrorMessage = function(err) {
    var message = '';
    if (err.code) { // 如果是MongoDB索引错误
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
exports.login = function(req, res, next) {
    var username = req.body.username,
        password = req.body.password;
    if (_.isEmpty(username) || _.isEmpty(password)) {
        return res.status(401).send({
            message: '用户名或密码不能为空'
        });
    }
    User.findOne({
        username: username
    }, function(err, user) {
        if (err || !user) {
            return res.status(401).send({
                message: '用户名不存在'
            });
        }
        if (!user.authenticate(password)) {
            return res.status(401).send({
                message: '密码不正确'
            });
        }
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: jwt.sign({
                _id: user._id
            }, config.secret, {
                expiresInMinutes: 60 * 5
            })
        });
    });
}

// 使用User模型来创建新用户
exports.signup = function(req, res, next) {
    if (!req.user) {
        var user = new User(req.body);
        var message = null;
        user.provider = 'local';
        user.save(function(err) {
            if (err) {
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                return res.json({
                    message: 'success'
                });
            }
        });
    } else {
        return res.redirect('/');
    }
};
// 需要登录后才行进行下一步
exports.requiresLogin = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).send({
            message: '请先登录'
        });
    }
    next();
};

// note: 我们没有编写signin()方法，因为passport提供了一个专门的身份验证方法，可以直接用于定义路由。

/*

// 退出当前用户
exports.logout = function(req, res, next) {
    if (req.user) {
        req.logout(); // 使用passport里的logout方法进行用户退出
        return res.redirect('/');
    }
};
// 用于展现views/signin.ejs登录页面
exports.renderLogin = function(req, res, next) {
    if (!req.user) { // 登录成功后，passport会在session中存储user
        res.render('login');
    } else {
        return res.redirect('/');
    }
};
// 用于展现view/signup.ejs注册页面
exports.renderSignup = function(req, res, next) {
    if (!req.user) { // 登录成功后，passport会在session中存储user
        res.render('signup');
    } else {
        return res.redirect('/');
    }
};



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
