var util = require('util');
var StockTechnology = require('mongoose').model('StockTechnology');
var Stock = require('mongoose').model('Stock');
var Todo = require('mongoose').model('Todo');

var getErrorMessage = function (err) {
    if (err.errors) {
        for (var errName in err.errors) {
            if (err.errors[errName].message)
                return err.errors[errName].message;
        }
    } else {
        return "发生未知错误";
    }
};
exports.create = function (req, res, next) {
    StockTechnology.collection.drop();
    Stock.collection.drop();
    Todo.collection.drop();
    var count = 3, messages = []

    StockTechnology.collection.insert(req.body.StockTechnology, function (err) {
        count--;
        if (err) {
            messages.push(getErrorMessage(err))
            if (count === 0) {
                return res.status(400).send({
                    messages: messages
                });
            }
        } else if (count === 0) {
            if (messages.length > 0) {
                return res.status(400).send({
                    messages: messages
                });
            } else {
                return res.end();
            }
        }
    });
    Stock.collection.insert(req.body.Stock, function (err) {
        count--;
        if (err) {
            messages.push(getErrorMessage(err))
            if (count === 0) {
                return res.status(400).send({
                    messages: messages
                });
            }
        } else if (count === 0) {
            if (messages.length > 0) {
                return res.status(400).send({
                    messages: messages
                });
            } else {
                return res.end();
            }
        }
    });
    console.log(req.body)
    Todo.collection.insert(req.body.Todo, function (err) {
        count--;
        if (err) {
            messages.push(getErrorMessage(err))
            if (count === 0) {
                return res.status(400).send({
                    messages: messages
                });
            }
        } else if (count === 0) {
            if (messages.length > 0) {
                return res.status(400).send({
                    messages: messages
                });
            } else {
                return res.end();
            }
        }
    });
};

exports.list = function (req, res) {
    var result = {}, count = 3, messages = [];
    Stock.find().sort({"created": 1}).exec(function (err, data) {
        count--;
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            result.Stock = data;
            if (count === 0) {
                if (messages.length > 0) {
                    return res.status(400).send({
                        messages: messages
                    });
                } else {
                    res.json(result);
                }
            }
        }
    })
    StockTechnology.find().sort({"created": 1})
        .exec(function (err, data) {
            count--;
            if (err) {
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                result.StockTechnology = data;
                if (count === 0) {
                    if (messages.length > 0) {
                        return res.status(400).send({
                            messages: messages
                        });
                    } else {
                        return res.json(result);
                    }
                }
            }
        });
    Todo.find().sort({"created": -1})
        .exec(function (err, data) {
            count--;
            if (err) {
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                result.Todo = data;
                if (count === 0) {
                    if (messages.length > 0) {
                        return res.status(400).send({
                            messages: messages
                        });
                    } else {
                        return res.json(result);
                    }
                }
            }
        });
};

exports.requiresLogin = function (req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).send({
            message: '请先登录'
        });
    }
    next();
};

exports.hasAuthorization = function (req, res, next) {
    next();
};