var config = require('./config'),
    mongoose = require('mongoose')

module.exports = function() {
    var db = mongoose.connect(config.db, {authMechanism: 'ScramSHA1'})
    require('../app/models/urls.server.model')
    return db;
}