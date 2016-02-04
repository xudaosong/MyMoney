var authentication = require('../controllers/authentication.server.controller.js'),
	checklist = require('../controllers/checklist.server.controller');

module.exports = function (app) {
    app.route('/api/checklist')
        .get(authentication.requiresLogin,checklist.list)
        .post(authentication.requiresLogin, checklist.create);
    app.route('/api/checklist/:checklistId')
        .get(authentication.requiresLogin, checklist.checklistById, checklist.read)
        .put(authentication.requiresLogin, checklist.hasAuthorization, checklist.update)
        .delete(authentication.requiresLogin, checklist.hasAuthorization, checklist.delete);
    app.param('checklistId', checklist.checklistById);
};
