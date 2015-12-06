var util = require('util');
var Article = require('mongoose').model('Article');

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
    var article = new Article(req.body);
    article.creator = req.user;
    article.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            return res.json(article);
        }
    });
};

exports.list = function(req, res) {
    var filter = {};
    if (!!req.query.keywords) {
        filter.content = new RegExp(req.query.keywords, 'i');
    }
    if (!!req.query.author) {
        filter.author = new RegExp(req.query.author, 'i');
    }
    if (!!req.query.source) {
        filter.source = new RegExp(req.query.source, 'i');
    }
    if (req.query.isGood !== undefined) {
        filter.isGood = req.query.isGood;
    }
    if (!!req.query.startDate) {
        filter.created = filter.created || {};
        filter.created.$gte = new Date(req.query.startDate);
    }
    if (!!req.query.endDate) {
        filter.created = filter.created || {};
        filter.created.$lte = new Date(req.query.endDate);
    }

    Article.count(filter, function(err, total) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            Article.find(filter).sort({
                "created": -1
            })
            .skip((req.query.page - 1) * req.query.limit).limit(req.query.limit)
            .exec(function(err, article) {
                if (err) {
                    return res.status(400).send({
                        message: getErrorMessage(err)
                    });
                } else {
                    return res.json({
                        total: total,
                        data: article
                    });
                }
            });
        }
    });
};

exports.articleById = function(req, res, next, id) {
    if (id.indexOf(',') > 0) {
        next();
    } else {
        Article.findById(id).exec(function(err, article) {
            if (err) return next(err);
            if (!article) {
                return next(new Error('文章不存在，id为' + id));
            }
            req.article = article;
            next();
        });
    }
};

exports.read = function(req, res) {
    return res.json(req.article);
};

exports.update = function(req, res) {
    var article = req.article;
    article.title = req.body.title;
    article.content = req.body.content;
    article.category = req.body.category;
    article.isGood = req.body.isGood;
    article.arthor = req.body.arthor;
    article.created = req.body.created;
    article.source = req.body.source;
    article.save(function(err) {
        if (err) {
            res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            return res.json(article);
        }
    });
};

exports.delete = function(req, res) {
    if (req.params.articleId) {
        var ids = req.params.articleId.split(',');
        Article.remove({
            _id: {
                $in: ids
            }
        }, function(err) {
            res.end();
        });
    } else {
        var article = req.article;
        article.remove(function(err) {
            if (err) {
                res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                return res.json(article);
            }
        });
    }
};

exports.requiresLogin = function(req, res, next) {
    if (!req.isAuthenticated()) {
        res.status(401).send({
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