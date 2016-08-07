exports.render = function(req, res) {
    var domain =
        (req.get('X-Forwarded-Proto') || req.protocol) +
        '://' +
        req.get('host') + '/'
    res.render('index', {
        title: 'API: URL Shortener Microservice',
        url1: domain + 'new/https://www.google.com',
        url2: domain + 'new/http://www.example.com:80',
        output: '{"original_url":"https://www.google.com","short_url":"' + domain + 'rAAA"}',
        usage: domain + 'rAAA',
        redirect: 'https://www.google.com'
    })
};