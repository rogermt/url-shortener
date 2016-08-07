var urls = require('../../app/controllers/urls.server.controller');
module.exports = function(app) {

    app.route("/new/*").get(urls.create);

    app.route('/:shortUrlId')
        .get(urls.redirect);
    app.param('shortUrlId', urls.urlByID);

    app.get('*', function(req, res) {
        res.redirect('/#' + req.originalUrl);
    });
};
