var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');
var Cuenta = new Schema({
    username: String,
    company: String,
    store: String
});

Cuenta.plugin(passportLocalMongoose);

module.exports = mongoose.model('Cuenta', Cuenta)
