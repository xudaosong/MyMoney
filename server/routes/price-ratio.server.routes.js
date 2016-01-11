var authentication = require('../controllers/authentication.server.controller.js'),
	priceRatio = require('../controllers/price-ratio.server.controller');

module.exports = function (app) {
    app.route('/api/priceRatio')
        .get(authentication.requiresLogin, priceRatio.list)
        .post(authentication.requiresLogin, priceRatio.create);
};
