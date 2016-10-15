let tcp = require('net');

let Receiver = function (port) {
    return {

        buffers: {},
        server: {},

        createServer: function () {
            return tcp.createServer();
        },

        listen: function (port) {
            this.server.listen(port);
            console.log(('server is on port ', port));
        },

        hadleConnection: function () {
            let self = this;
            this.server.on('connection', function (socket) {
                socket.on('data', (data) => {
                    self.addFreshLogsToBuffer(data);
                });
                console.log('connection');
            });
        },

        run: function () {
            this.server = this.createServer();
            this.listen(port);
            this.hadleConnection();
        },

        addFreshLogsToBuffer: function (newIncomingLogs) {
            let self = this;
            let logs = newIncomingLogs.toString().split('\n');
            logs.forEach((log) => {

                let logArr = log.split(' ');
                let fileName = `${logArr[2]}_${logArr[3]}}`;

                if (!self.buffers[fileName]) {
                    self.buffer[fileName] = [];
                }
                self.buffer[fileName].push(log);
            });
        },

        writeBufferToFile: function (buffer) {
            
        }
    }
};

module.exports = Receiver;

