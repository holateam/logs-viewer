const mongoose = require('mongoose');
const db = require('./db');
const UserLogSchema = require('./userLog');

function queryDB(json){
    var col = UserLogSchema.find({}, function(err, res){
        if (err) return console.error(err);
        console.log(res);
    })
}

module.exports = queryDB;
