let app = require("express")();
let http = require("http").Server(app);
let io = require("socket.io")(http);

http.listen(3000, function(){
  console.log("listening on *:3000");
});

io.on("connection", function (socket){

  // socket.on('name message', function(msg) {
  //   name = msg;
  //   console.log('a user ' + name + ' connected');
  //   socket.broadcast.emit('chat message', 'a user ' + name + ' connected');
  //   updateOnline('add', socket, name);
  // });
  //
  // socket.on('disconnect', function(){
  //   console.log('a user ' + name + ' disconnected');
  //   socket.broadcast.emit('chat message', 'a user ' + name + ' disconnected');
  //   updateOnline('remove', socket);
  // });
  //
  // socket.on('chat message', function(msg){
  //   socket.broadcast.emit('chat message', name + ': ' + msg);
  // });
  //
  // socket.on('private message', function(msg) {
  //   io.sockets.sockets[msg['id']].emit('chat message', 'private message from ' + name + ': ' + msg['text']);
  // });

});