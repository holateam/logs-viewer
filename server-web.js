const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
let aggregator = require('./modules/aggregator');
// const bodyParser = require('body-parser');



app.get("/", (req, res) => {
    app.use(express.static(__dirname + "/public2/"));
    res.sendFile(__dirname + "/public2/index.html");
});

io.sockets.on('connection', (socket) =>{
   socket.on('get logs', (data) => {
       console.log('get logs: '+ JSON.stringify(data));
       // Todo get user options in DB -> query data.port, data.host, data.streamsId,
       let obj = {
           filters: data.filter,
           streamsId: ['log', 'sys_log', 'nginx'],
           miniTimestamp: 1,
           limit: 2,
           heartbeatInterval: 2000,
           userId: "localhost:30000",
       };
       let callback = (logs) => {
           socket.emit('get logs',{
               data: 'new logs on localhost:8080',
               logs: logs
           });
       };
       aggregator.createAggregator(obj.userId,  obj.streamsId, obj.filters,
           obj.limit, obj.heartbeatInterval, true, callback).start();

   });

   // socket.emit('get logs', {hello: 'world'});
   // socket.on('my other event', (data) => {
   //      console.log(data);
   //  });
});

server.listen(3000, () => {
    console.log(`Web Server running on port 3000`);
});
