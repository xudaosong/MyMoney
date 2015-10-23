var user = require('../controllers/users.server.controller'),
    voiceBroadcast = require('../controllers/voice-broadcast.server.controller');

module.exports = function (app) {
    app.route('/api/voiceBroadcast')
        .get(voiceBroadcast.requiresLogin, voiceBroadcast.list)
        .post(voiceBroadcast.requiresLogin, voiceBroadcast.create);
    app.route('/api/voiceBroadcast/:voiceBroadcastId')
        .get(voiceBroadcast.requiresLogin, voiceBroadcast.voiceBroadcastById, voiceBroadcast.read)
        .put(voiceBroadcast.requiresLogin, voiceBroadcast.hasAuthorization, voiceBroadcast.update)
        .delete(voiceBroadcast.requiresLogin, voiceBroadcast.hasAuthorization, voiceBroadcast.delete);
    app.param('voiceBroadcastId', voiceBroadcast.voiceBroadcastById);
};
