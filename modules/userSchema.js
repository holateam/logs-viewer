const mongoose = require('mongoose');
const db = require('./db');

const Schema = mongoose.Schema;
let UserSchema = new Schema({
    user: String,
    email: String,
    host: String,
    port: Number,
    streams: [
        {
            name: String,
            fileslist: [{
                namefile: String,
                search: [{}]
            }],

        }
    ]
});

let Users = mongoose.model('users', UserSchema);

module.exports = Users;
