var Url = require('mongoose').model('Url');

exports.create = function(req, res, next) {
    var url = new Url({
        originalUrl: req.params[0]
    });

    url.save(function(err) {

        var getErrorMessage = function(err) {
            var message = '';
            if (err.code) {
                switch (err.code) {
                    case 11000:
                    case 11001:
                        message = 'shortUrl already exists';
                        break;
                    default:
                        message = 'Something went wrong';
                }
            }
            else {
                for (var errName in err.errors) {
                    if (err.errors[errName].message) message = err.errors[errName].
                    message;
                }
            }
            return message;
        };

        var getshortUrl = function(url) {
            return {
                original_url: url.originalUrl,
                short_url: (req.get('X-Forwarded-Protocol') || req.protocol) + '://' + req.get('host') + '/' + url.shortUrl
            }
        }

        if (err) {
            console.log(err.message)
            res.json({
                'error': getErrorMessage(err)
            })
            return next(err)
        }
        else {
            res.json(getshortUrl(url))
        }
    });
};



exports.redirect = function(req, res) {
    if(req.url) {
        res.redirect(req.url.originalUrl.toString());
    } else {
        res.json({"error":"This url is not on the database."})
    }
};
exports.urlByID = function(req, res, next, id) {
        Url.findOne({
            shortUrl: id
        }, function(err, url) {
            if (err) {
                return next(err);
            }
            else {
                req.url = url;
                next();
            }
        });
};