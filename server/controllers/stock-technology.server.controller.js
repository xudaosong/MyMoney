var util = require('util');
var StockTechnology = require('mongoose').model('StockTechnology');

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
        StockTechnology.collection.drop();
        StockTechnology.collection.insert(req.body, function (err) {
            if (err) {
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                return res.end();
            }
        });
    } else {
        var model = new StockTechnology(req.body);
        model.creator = req.user;
        model.save(function (err) {
            if (err) {
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                return res.json(model);
            }
        });
    }
};

exports.list = function (req, res) {
    var filter = {};

    StockTechnology.count(filter, function (err, total) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            StockTechnology.find(filter).sort({"created": 1})
                .skip((req.query.page - 1) * req.query.limit).limit(req.query.limit)
                .exec(function (err, data) {
                    if (err) {
                        return res.status(400).send({
                            message: getErrorMessage(err)
                        });
                    } else {
                        return res.json({total: total, data: data});
                    }
                });
        }
    });
};

exports.findById = function (req, res, next, id) {
    if (id.indexOf(',') > 0) {
        next();
    } else {
        StockTechnology.findById(id).exec(function (err, model) {
            if (err) return next(err);
            if (!model) {
                return next(new Error('股票技术不存在，id为' + id));
            }
            req.model = model;
            next();
        });
    }
};

exports.read = function (req, res) {
    return res.json(req.model);
};

exports.update = function (req, res) {
    var model = req.model;
    model.save(function (err) {
        if (err) {
            res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            return res.json(model);
        }
    });
};

exports.delete = function (req, res) {
    if (req.params.id) {
        var ids = req.params.id.split(',');
        StockTechnology.remove({_id: {$in: ids}}, function (err) {
            res.end();
        });
    } else {
        var model = req.model;
        model.remove(function (err) {
            if (err) {
                res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                return res.json(model);
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