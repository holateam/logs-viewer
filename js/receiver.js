let tcp = require('net');

let Receiver = function (port) {
    return {

        buffers: [],

        createServer: function () {
            return tcp.createServer();
        },

        listen: function (port) {
            this.server.listen(port);
            console.log(('server is on port ', port));
        },

        hadleConnection: function () {
            this.server.on('connection', function (socket) {
                socket.on('data', (data) => {
                    console.log(data.toString());
                })
                console.log('connection');
            });
        },

        run: function () {
            this.server = this.createServer();
            this.listen(port);
            this.hadleConnection();
        }
    }
};

module.exports = Receiver;

