var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var logSchema = new Schema({
    date: Date,
    user_id: String,
    sender_ip: String,
    file_name: String,
    message: String
});

var UserLogSchema = mongoose.model('UserLogSchema',logSchema);

module.exports = UserLogSchema;
