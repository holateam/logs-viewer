const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const db_query = require('./modules/db_query');
let aggregator = require('./modules/aggregator');
// const bodyParser = require('body-parser');


app.get("/", (req, res) => {
    app.use(express.static(__dirname + "/public/"));
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/login", (req, res) => {
    app.use(express.static(__dirname + "/public/"));
    res.sendFile(__dirname + "/public/views/login.html");
});

app.get("/register", (req, res) => {
    app.use(express.static(__dirname + "/public/"));
    res.sendFile(__dirname + "/public/views/register.html");
});

io.sockets.on('connection', (socket) => {

    let user = {
        username: "",
        host: "",
        port: null,
        streams: [],
        filters: "",
        reverseDirection: null, // false = the direction of the reader from old to new, true = from new to old
    };

    let myAggregator = null;

    let callback = (logs) => {
        socket.emit('get logs', {
            data: 'new logs on localhost:8080',
            logs: logs
        });
    };

    // myAggregator = aggregator.createAggregator(obj.userId, obj.streamsId, obj.filters,
    //     obj.reverseDirection, callback);
    // myAggregator.start();
    socket.on('cookie-session', (data) => {
        console.log(data);
        db_query.cookieSession(data).then((result) => {
            socket.emit('cookie-session', result);
        });
    });

    socket.on('sign up', (data) => {
        db_query.signUp(data).then((result) => {
            socket.emit('sign up', result);
        }).catch((err) => {
            console.log(`Error sign up ${err}`);
        });
    });

    socket.on('sign in', (data) => {
        db_query.signIn(data).then((result) => {
            socket.emit('sign in', result);
        }, (err) => {
            console.log(`Error mongoDB ${err}`);
        });
    });

    // socket.on('get logs', (data) => {
    //     // Todo get user options in DB -> query data.port, data.host, data.streamsId,
    //     obj.filters.push(data.filter);
    //     obj.streamsId = data.streamsId;
    //
    //     myAggregator = aggregator.createAggregator(obj.userId, obj.streamsId, obj.filters,
    //         data.reverseDirection, callback);
    //     myAggregator.start();
    // });

    socket.on('get logs old', (data) => {
        console.log("socket.on('get logs old')");
        if (user.reverseDirection == true) {
            user = data;
            myAggregator.resume();
        } else {
            user = data;
            myAggregator = aggregator.createAggregator(user.host + user.port, user.streams, user.filters,
                user.reverseDirection, callback);
            myAggregator.start();
        }
    });

    socket.on('get logs new', (data) => {
        console.log("socket.on('get logs new')");
        console.log('User ' + JSON.stringify(user));
        console.log('data ' + JSON.stringify(data));
        if (user.reverseDirection == false) {
            console.log("s");
            user = data;
            myAggregator.resume();
        } else {
            console.log("else");
            user = data;
            // user.reverseDirection = false;
            myAggregator = aggregator.createAggregator(user.host + user.port, user.streams, user.filters,
                user.reverseDirection, callback);
            myAggregator.start();
        }
    });

});

server.listen(3000, () => {
    console.log(`Web Server running on port 3000`);
});
