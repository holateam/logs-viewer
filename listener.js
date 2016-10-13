const queryDB = require('./modules/queryDB');
const logging = require('./modules/logging');

let users = [{
  host: "localhost",
  port: 30000
}];

let tcp = require("net");
let socketIO = require("socket.io-client")("http://localhost:3000");

users.forEach(user => {
  let server = tcp.createServer();

  server.on("connection", socket => {
    socket.on("data", (data) => {
      // convert data to JSON

      // write JSON to DB
    //   onDataReceived(data, user);
        logging.saveDataMongoDB(data, user);

      //socketIO.emit("new_logs_received", data);
      //socket.end();
    });
  });

  server.listen(user.port);
});
