module.exports = {
    // Development configuration options
    //db: process.env.ORMONGO_URL + '/urlshortener',
     db: 'mongodb://rogermt/Tr4ff0rd@iad2-c6-0.mongo.objectrocket.com:52216' + '/urlshortener?authSource=dbWithUserCredentials',
    sessionSecret: 'productionSessionSecret'
};