// const mongoose = require('mongoose');
// const db = require('./db');
// const Users = require('./userSchema');
//
// function dataToJSON(data, user) {
//     let tempData = data.toString().split(" ");
//     tempData[1] = tempData[1].substr(0, 10) + " " + tempData[1].substr(11,8);
//     let result = {
//         'date':`${tempData[1]}`,
//         'user_id': `${user.host}:${user.port}`,
//         'sender_ip': `${tempData[2]}`,
//         'file_name': `${tempData[3]}`,
//         'message': `${tempData[7]}`
//     };
//     return result;
// }
//
// function generateEntityFromData (data, user){
//     return  dataToJSON(data, user);
//     // return {
//     //     date: "2016-10-06 23:59:59",
//     //     user_id: `localhost:30000`,
//     //     sender_ip: '127.0.0.1',
//     //     file_name: 'admin.test.js',
//     //     message: 'Some body text'
//     // };
// }
//
// function onDataSaved(err){
//     if (err) throw err;
// }
//
// function saveDataMongoDB(data, user){
//      let record = new UserLogSchema(generateEntityFromData (data, user));
//      record.save(onDataSaved);
//      console.log("work");
// }
//
// exports.saveDataMongoDB = saveDataMongoDB;
