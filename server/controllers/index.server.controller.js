exports.render = function (req, res) {
    if (req.session.lastVisit) {
        console.log(req.session.lastVisit);
    }
    req.session.lastVisit = new Date();

    res.render('index', {
        title: 'Hello World',
        user: JSON.stringify(req.user)
    });

};
exports.requiresLogin = function (req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect('/signin');
    }
    next();
};