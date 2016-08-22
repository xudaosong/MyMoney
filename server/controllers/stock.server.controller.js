var util = require('util');
var Stock = require('mongoose').model('Stock');

var getErrorMessage = function(err) {
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
    if (util.isArray(req.body)) {
        Stock.collection.drop();
        Stock.collection.insert(req.body, function (err) {
            if (err) {
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                return res.end();
            }
        });
    } else {
        var stock = new Stock(req.body);
        stock.creator = req.user;
        stock.save(function (err) {
            if (err) {
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                return res.json(stock);
            }
        });
    }
};

exports.list = function (req, res) {
    var filter = {};

    Stock.count(filter, function (err, total) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            Stock.find(filter).sort({"created": 1})
                .skip((req.query.page - 1) * req.query.limit).limit(req.query.limit)
                .exec(function (err, stock) {
                    if (err) {
                        return res.status(400).send({
                            message: getErrorMessage(err)
                        });
                    } else {
                        return res.json({total: total, data: stock});
                    }
                });
        }
    });
};

exports.stockById = function (req, res, next, id) {
    if (id.indexOf(',') > 0) {
        next();
    } else {
        Stock.findById(id).exec(function (err, stock) {
            if (err) return next(err);
            if (!stock) {
                return next(new Error('股票不存在，id为' + id));
            }
            req.stock = stock;
            next();
        });
    }
};

exports.read = function (req, res) {
    return res.json(req.stock);
};

exports.update = function (req, res) {
    var stock = req.stock;
    // stock.isEssential = req.body.isEssential;
    // stock.content = req.body.content;
    // stock.created = req.body.created;
    stock.save(function (err) {
        if (err) {
            res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            return res.json(stock);
        }
    });
};

exports.delete = function (req, res) {
    if (req.params.stockId) {
        var ids = req.params.stockId.split(',');
        Stock.remove({_id: {$in: ids}}, function (err) {
            res.end();
        });
    } else {
        var stock = req.stock;
        stock.remove(function (err) {
            if (err) {
                res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                return res.json(stock);
            }
        });
    }
};

exports.requiresLogin = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).send({
            message: '请先登录'
        });
    }
    next();
};

exports.hasAuthorization = function(req, res, next) {
    next();
};