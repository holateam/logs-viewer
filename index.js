var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public/'));
app.number = 333;

io.on('connection', function (socket) {
    var socketId = socket.id.toString();

    console.log('a user connected');

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    var isPaused = false;
    var msg = {};
    msg.logText =  '{ "events": { "created_at" : "2016-10-06 23:59:59", "sender_ip":"127.0.0.1","file_name":"somefile.log", "message":"some logs..."}, "isOldestEventReached":false}';
    msg.oldLogs = '{ "events": { "created_at" : "2016-10-06 23:59:59 oldldldl", "sender_ip":"127.0.0.1","file_name":"somefile.log", "message":"some logs..."}, "isOldestEventReached":false}';

    setInterval(function () {
        if (!isPaused) {
            io.to(socketId).emit('live logs update', msg.logText);
        }
    }, 1000);

    socket.on('get logs from server', function (filter) {
        io.to(socketId).emit('send logs from server to client', msg.oldLogs);
    });

    socket.on("pause live update", function () {
        isPaused = true;
    });

    socket.on("resume live update", function () {
        isPaused = false;
    });

});

http.listen(3000, function () {
    console.log('listening on *:3000');
});
