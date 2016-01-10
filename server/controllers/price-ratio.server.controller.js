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
    Checklist
        .find()
        .sort({
            "code": 1
        })
        .exec(function(err, checklist) {
            if (err) {
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                return res.json(checklist);
            }
        });
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
