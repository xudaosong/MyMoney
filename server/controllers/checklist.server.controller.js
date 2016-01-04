var util = require('util');
var Checklist = require('mongoose').model('Checklist');

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

exports.create = function(req, res, next) {
    var checklist = new Checklist(req.body);
    checklist.creator = req.user;
    checklist.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            return res.json(checklist);
        }
    });
};

exports.list = function(req, res) {
    var filter = {};
    if (!!req.query.keywords) {
        filter.$or = [];
        filter.$or.push({content:new RegExp(req.query.keywords, 'i')});
    }
    if (!!req.query.author) {
        filter.author = new RegExp(req.query.author, 'i');
    }
    if (!!req.query.startDate) {
        filter.created = filter.created || {};
        filter.created.$gte = new Date(req.query.startDate);
    }
    if (!!req.query.endDate) {
        filter.created = filter.created || {};
        filter.created.$lte = new Date(req.query.endDate);
    }

    Checklist.count(filter, function(err, total) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            Checklist.find(filter).sort({
                "created": -1
            })
            .skip((req.query.page - 1) * req.query.limit).limit(req.query.limit)
            .exec(function(err, checklist) {
                if (err) {
                    return res.status(400).send({
                        message: getErrorMessage(err)
                    });
                } else {
                    return res.json({
                        total: total,
                        data: checklist
                    });
                }
            });
        }
    });
};

exports.checklistById = function(req, res, next, id) {
    if (id.indexOf(',') > 0) {
        next();
    } else {
        Checklist.findById(id).exec(function(err, checklist) {
            if (err) return next(err);
            if (!checklist) {
                return next(new Error('Checklist不存在，id为' + id));
            }
            req.checklist = checklist;
            next();
        });
    }
};

exports.read = function(req, res) {
    return res.json(req.checklist);
};

exports.update = function(req, res) {
    var checklist = req.checklist;
    checklist.title = req.body.title;
    checklist.group = req.body.group;
    checklist.author = req.body.author;
    checklist.content = req.body.content;
    checklist.save(function(err) {
        if (err) {
            res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            return res.json(checklist);
        }
    });
};

exports.delete = function(req, res) {
    if (req.params.checklistId) {
        var ids = req.params.checklistId.split(',');
        Checklist.remove({
            _id: {
                $in: ids
            }
        }, function(err) {
            res.end();
        });
    } else {
        var checklist = req.checklist;
        checklist.remove(function(err) {
            if (err) {
                res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                return res.json(checklist);
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
    //if (req.VoiceBroadcast.creator !== req.user.id) {
    //    res.status(403).send({
    //        message: '对不起，您没有权限操作该文章'
    //    });
    //}
    next();
};