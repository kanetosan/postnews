var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var UserSchema = new mongoose.Schema({
    username: { type: String, required: true, lowercase: true, unique: true }
});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserSchema);
