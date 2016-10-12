const PORT = 3000;

let app = require("express")();
let http = require("http").Server(app);
let io = require("socket.io")(http);

let connectedUsers = new Map();

app.get('/', function (req, res) {
    app.use(express.static(__dirname + '/public/'));
    res.sendFile(__dirname + '/public/index.html');
});

http.listen(PORT, function(){
    console.log("listening on *:" + PORT);
});

io.on("connection", function (socket){
    let userId;
    let isPaused;
    let minId;
    let maxId;
    let filterSearch;
    let watchedIP;
    let logsPortion;

    socket.on("send user data", function (data) {
        userId = data.user_id;
        watchedIP = data.watched_ip;
        logsPortion = data.logs_portion;
        isPaused = false;
        minId = 0;
        maxId = 0;
        filterSearch = "";
        connectedUsers.set(userId, socket);
        // request to BD for last logsPortion events
        // socket.emit("send_logs", LOGS);
    });

    socket.on("get logs", function (data) {
        let newFilterSearch = data.filter_search;
        if (newFilterSearch != filterSearch) {
            minId = 0;
            maxId = 0;
        }
        filterSearch = newFilterSearch;
        // request to BD for next logsPortion events with filter
        // socket.emit("send logs from server to client", LOGS);
    });

    socket.on("new_logs_received", function(data){
        //socket.emit("live_update_logs", LOGS);
    });

    socket.on("disconnect", function() {
        connectedUsers.delete(userId);
    });

    socket.on("pause live update", function(msg) {
        isPaused = true;
    });

    socket.on("resume live update", function(msg) {
        isPaused = false;
        // request to BD for last logsPortion events
    });

    socket.on("new logs from listener to server", function () {});
});