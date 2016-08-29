var stockTechnology = require('../controllers/stock-technology.server.controller');

module.exports = function (app) {
    app.route('/api/stockTechnology')
        .get(stockTechnology.requiresLogin, stockTechnology.list)
        .post(stockTechnology.requiresLogin, stockTechnology.create);
    app.route('/api/stockTechnology/:id')
        .get(stockTechnology.requiresLogin, stockTechnology.findById, stockTechnology.read)
        .put(stockTechnology.requiresLogin, stockTechnology.hasAuthorization, stockTechnology.update)
        .delete(stockTechnology.requiresLogin, stockTechnology.hasAuthorization, stockTechnology.delete);
    app.param('id', stockTechnology.findById);
};
