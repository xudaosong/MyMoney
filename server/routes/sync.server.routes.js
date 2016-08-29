var sync = require('../controllers/sync.server.controller');

module.exports = function (app) {
    app.route('/api/sync')
        .get(sync.requiresLogin, sync.list)
        .post(sync.requiresLogin, sync.create);
};
