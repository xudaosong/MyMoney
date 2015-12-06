var fileUpload = require('../controllers/file-upload.server.controller'),
	multipart = require('connect-multiparty'),
	multipartMiddleware = multipart();

module.exports = function (app) {
    app.route('/api/upload')
        .post(fileUpload.requiresLogin, multipartMiddleware, fileUpload.upload);
};
