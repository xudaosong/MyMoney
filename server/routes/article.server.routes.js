var article = require('../controllers/article.server.controller');

module.exports = function (app) {
    app.route('/api/article')
        .get(article.requiresLogin, article.list)
        .post(article.requiresLogin, article.create);
    app.route('/api/article/:articleId')
        .get(article.requiresLogin, article.articleById, article.read)
        .put(article.requiresLogin, article.hasAuthorization, article.update)
        .delete(article.requiresLogin, article.hasAuthorization, article.delete);
    app.param('articleId', article.articleById);
};
