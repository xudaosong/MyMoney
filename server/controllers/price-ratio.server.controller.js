var util = require('util');
var PriceRatio = require('mongoose').model('PriceRatio');

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
    var created = new Date();
    if (util.isArray(req.body)) {
        var priceRatios = [];
        for (var i = 0; i < req.body.length; i++) {
            var priceRatio = new PriceRatio(req.body[i]).toObject();
            priceRatios.created = created;
            priceRatios.push(priceRatio);
        }

        PriceRatio.collection.insert(priceRatios, function (err) {
            if (err) {
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                return res.end();
            }
        });
    } else{
        return res.status(400).send({
            message: '类型必须是数组'
        });
    }
};

exports.list = function(req, res) {
    PriceRatio
        .find()
        .sort({
            "created": 1,
            "code": 1
        })
        .exec(function(err, priceRatio) {
            if (err) {
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                return res.json(priceRatio);
            }
        });
};
