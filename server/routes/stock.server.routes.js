var stock = require('../controllers/stock.server.controller');

module.exports = function (app) {
    app.route('/api/stock')
        .get(stock.requiresLogin, stock.list)
        .post(stock.requiresLogin, stock.create);
    app.route('/api/stock/:stockId')
        .get(stock.requiresLogin, stock.stockById, stock.read)
        .put(stock.requiresLogin, stock.hasAuthorization, stock.update)
        .delete(stock.requiresLogin, stock.hasAuthorization, stock.delete);
    app.param('stockId', stock.stockById);
};
