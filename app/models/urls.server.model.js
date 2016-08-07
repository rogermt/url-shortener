var mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment'),
    Schema = mongoose.Schema;



var UrlSchema = new Schema({
    originalUrl: {
        type: String,
        required: true,
        //match: /^(https?:\/\/)([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-:]*)*\/?$/,
        validate: {
            validator: function(url) {
                return /^(https?:\/\/)([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-:]*)*\/?$/.test(url);
            },
            message: 'Wrong url format, make sure you have a valid protocol and real site.'
        }
    },
    shortUrl: {
        type: String,
        unique: true
    },
    shortUrlNum: {
        type: Number,
        unique: true
    }
});

mongoose.model('Url', UrlSchema);

autoIncrement.initialize(mongoose)
UrlSchema.plugin(autoIncrement.plugin, {
    model: 'Url',
    field: 'shortUrlNum'
});


UrlSchema.pre('save', function(next) {
    //Convert shortUrlNum to alphabetic 4 chars long
    var convNumToChars = function(num) {
        var arr = []
        if (num < Math.pow(52, 3)) {
            var y = num
            for (var i = 3; i >= 0; i--) {
                var x = Math.floor(y / Math.pow(52, i))
                y = num - x * Math.pow(52, i)
                arr[i] = x + (x > 25 ? 71 : 65)
                
            }
            return String.fromCharCode.apply(String, arr)
        }
    }

    self = this
    self.shortUrl = convNumToChars(self.shortUrlNum)
    next()
})
