const mongoose = require('mongoose');
const db = require('./modules/db');
const UserLogSchema = require('./modules/userLog');

let users = [{
  "host": "new.holateam.io",
  "port": "30000"
}];

let tcp = require("net");
let socketIO = require("socket.io-client")("http://localhost:3000");

users.forEach(user => {
  let server = tcp.createServer();

  server.on("connection", socket => {
    socket.on("data", (data) => {
      // convert data to JSON

      // write JSON to DB
      onDataReceived(data)

      //socketIO.emit("new_logs_received", data);
      //socket.end();
    });
  });

  server.listen(user.port);
});


function dataToJSON(data) {
    let tempData = data.split(" ");
    tempData[1] = tempData[1].substr(0, 10) + " " + tempData[1].substr(11,8);
    let result = {
        'date':`${tempData[1]}`,
        'user_id': `${user.host}:${user.port}`,
        'sender_ip': `${tempData[2]}`,
        'file_name': `${tempData[3]}`,
        'message': `${tempData[7]}`
    };
    return result;
}

function generateEntityFromData (data){
    // return  dataToJSON(data);
    console.log("my Log: "+data);
    return {
        date: "2016-10-06 23:59:59",
        user_id: `localhost:30000`,
        sender_ip: '127.0.0.1',
        file_name: 'admin.log',
        message: 'Some body text'
    };
}

function onDataSaved(err){
    if (err) throw err;
}

function onDataReceived(data){
     let record = new UserLogSchema(generateEntityFromData (data));
     record.save(onDataSaved);
}
