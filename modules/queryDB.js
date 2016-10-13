const mongoose = require('mongoose');
const db = require('./db');
const UserLogSchema = require('./userLog');

function queryDB(json){
    return new Promise(function(resolve, reject){
        UserLogSchema.find(json, function(err, res){
            if (err){
                reject(err);
            }
            resolve(res);
        });
    });
}

module.exports = queryDB;

/*
    {
        user_id: String,
        watched_ip: String,
        logs_portion: Number,
        min_id: Number,
        max_id: Number,
        filter_search: String
    }
*/
