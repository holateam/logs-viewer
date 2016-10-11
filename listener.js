const mongoose = require('mongoose');
const db = require('./modules/db');
const bodyParser = require('body-parser');
var UserLogSchema = require('./modules/userLog');

let users = [{
  "host": "localhost",
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
      var record = new UserLogSchema(
          {
              date: "2016-10-06 23:59:59",
              user_id: `${user.host}:${user.port}`,
              sender_ip: '127.0.0.1',
              file_name: 'admin.log',
              message: 'Some body text'
          });
      record.save(function (err) {
        if (err) throw err;
        // saved!
      });

      //socketIO.emit("new_logs_received", data);
      //socket.end();
      console.log(data.toString());
    });
  });

  server.listen(user.port);
});
