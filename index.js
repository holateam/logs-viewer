var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public/'));

io.on('connection', function (socket) {
    var socketId = socket.id.toString();

    console.log('a user connected');

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    var isPaused = false;
    var msg = {};
    msg.logText = "at /home/kr/web/hola/hola-study/papertrail/server-socket.js:6:13  at Layer.handle [as handle_request] (/home/kr/web/hola/hola-study/papertrail/node_modules/express/lib/router/layer.js:95:5)";
    msg.oldLogs = 'Those an equal point no years do. Depend warmth fat but her but played. Shy and subjects wondered trifling pleasant. Prudent cordial comfort do no on colonel as assured chicken. Smart mrs day which begin. Snug do sold mr it if such. Terminated uncommonly at at estimating. Man behaviour met moonlight extremity acuteness direction. ';

    setInterval(function () {
        if (!isPaused) {
            io.to(socketId).emit('newest logs', msg.logText);
        }
    }, 1000);

    socket.on('request for more old logs', function () {
        io.to(socketId).emit('more logs', msg.oldLogs);
    });

    socket.on("pause_updating", function () {
        console.log("pause_updating");
        isPaused = true;
    });

    socket.on("resume_updating", function () {
        isPaused = false;
    });

});

http.listen(3000, function () {
    console.log('listening on *:3000');
});
