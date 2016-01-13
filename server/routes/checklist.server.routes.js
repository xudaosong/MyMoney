var checklist = require('../controllers/checklist.server.controller');

module.exports = function (app) {
    app.route('/api/checklist')
        .get(checklist.requiresLogin,checklist.list)
        .post(checklist.requiresLogin, checklist.create);
    app.route('/api/checklist/:checklistId')
        .get(checklist.requiresLogin, checklist.checklistById, checklist.read)
        .put(checklist.requiresLogin, checklist.hasAuthorization, checklist.update)
        .delete(checklist.requiresLogin, checklist.hasAuthorization, checklist.delete);
    app.param('checklistId', checklist.checklistById);
};
