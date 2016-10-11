const PORT = 3000;

let app = require("express")();
let http = require("http").Server(app);
let io = require("socket.io")(http);

let connectedUsers = []; // replace by map

app.get('/', function (req, res) {
  app.use(express.static(__dirname + '/public/'));
  res.sendFile(__dirname + '/public/index.html');
});

http.listen(PORT, function(){
  console.log("listening on *:" + PORT);
});

io.on("connection", function (socket){
  let minId = 0;
  let maxId = 0;
  let isPaused = false;
  let watchedIP;
  let logsPortion;

  socket.on("send_user_data", function (data) {
    let userId = data.user_id;
    connectedUsers.push({         // replace with saving to map
      userId : userId,            //
      socket: socket              //
    });                           //
    watchedIP = data.watched_ip;
    logsPortion = data.logs_portion;
    // request to BD for last logsPortion events
    // socket.emit("send_logs", LOGS);
  });

  socket.on("get_logs", function () {
    // request to BD for last logsPortion events
    // socket.emit("send_logs", LOGS);
  });

  socket.on("new_logs_received", function(data){
    //socket.emit("live_update_logs", LOGS);
  });

  socket.on("disconnect", function() {
    // remove user from map
  });

  socket.on("pause_live_update", function(msg) {
    isPaused = true;
  });

  socket.on("resume_live_update", function(msg) {
    isPaused = false;
  });
});