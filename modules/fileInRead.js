const fs = require('fs');
const config = require('../config.json');

let fileInRead = function (limit, heartbeatInterval, filters, streamId, pointTimestamp,
                           reverseDirection, filename, pauseSearch, callback) {
    console.log(filename);
    this.rstream = new fs.ReadStream(filename, {encoding: "utf8"});
    this.start = () => {

        this.rstream.on('data', (chunk) => {
            setTimeout(() => {
                callback(streamId, chunk.split('\n'));
            }, 1000);
            this.rstream.pause();
        });

        this.rstream.on('error', (err) => {
            console.error(err.message);
        });
        this.rstream.on('end', () => {
            console.log('--> rstream finish read file');
        });
    };

    this.resume = () => {
        this.rstream.resume();
    };

};

module.exports = fileInRead;

