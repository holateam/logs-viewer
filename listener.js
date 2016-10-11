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
      //socketIO.emit("new_logs_received", data);
      //socket.end();
      console.log(data.toString());
    });
  });

  server.listen(user.port);
});
