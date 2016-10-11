var mongoose = require('mongoose');
var config = require('../config.json');

mongoose.connect(config.mongoose.urli, (err) => {
    if(err){
        console.log(`Error: ${err.toString()}`);
    }else{
        console.log(`Connection db hola`);
    }
});

module.exports.db = mongoose.connection;
