let tcp = require('net');
let fs = require('fs');

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
                if (logArr.length > 1) {
                    let fileName = `${logArr[2]}_${logArr[3]}`;
                    let currentBuffer = self.buffers[fileName];

                    if (!currentBuffer) {
                        currentBuffer = [];
                    }
                    currentBuffer.push(log.toString());
                    if (currentBuffer.length > 10) {
                        self.writeBufferToFileAndClearThisBuffer(currentBuffer, fileName, function() {
                            self.clearBuffer(currentBuffer);
                        });

                    }
                }
            });
        },

        writeBufferToFileAndClearThisBuffer: function (buffer, name, callback) {
            for (let i = 0; i < buffer.length; i++) {
                fs.writeFile(`./log files/${name}.txt`, buffer[i] + "\n");
            }
        },


        clearBuffer: function (buffer) {
            delete buffer;
        }
    };
};

    module.exports = Receiver;

