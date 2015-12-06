var fs = require('fs'),
    config = require('../config/config'),
    mkdirOrig = fs.mkdir,
    // directory = config.root + '/files/public',
    directory = config.resources + '/upload',
    osSep = '/';

function getNewFilename(file) {
    var names = file.name.split('.');
    return new Date().getTime() + '.' + names[names.length - 1];
}

function rename(file, dest, user, callback) {
    var filename = getNewFilename(file);
    fs.rename(file.path, directory + dest + filename, function(err) {
        if (err) throw err;
        else
            callback({
                success: true,
                file: {
                    src: '/upload' + dest + filename,
                    name: filename,
                    size: file.size,
                    type: file.type,
                    created: Date.now(),
                    createor: (user) ? {
                        id: user.id,
                        name: user.username
                    } : {}
                }
            });
    });
}

function mkdir_p(path, callback, position) {
    var parts = require('path').normalize(path).split(osSep);

    position = position || 0;

    if (position >= parts.length) {
        return callback();
    }

    var directory = parts.slice(0, position + 1).join(osSep) || osSep;
    fs.stat(directory, function(err) {
        if (err === null) {
            mkdir_p(path, callback, position + 1);
        } else {
            mkdirOrig(directory, function(err) {
                if (err && err.code !== 'EEXIST') {
                    return callback(err);
                } else {
                    mkdir_p(path, callback, position + 1);
                }
            });
        }
    });
}
exports.upload = function(req, res) {
    var dest = '/article/';
    var path = directory + dest;
    if (!fs.existsSync(path)) {
        mkdir_p(path, function(err) {
            rename(req.files.file, dest, req.user, function(data) {
                res.jsonp(data);
            });
        });
    } else {
        rename(req.files.file, dest, req.user, function(data) {
            res.jsonp(data);
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