const lineReader = require('reverse-line-reader');
const fs = require('fs');
const config = require('../config.json');


let fileInReadReverse = function (limit, heartbeatInterval, filters, streamId, pointTimestamp,
                                  reverseDirection, filename, callback) {
    this.filename = "/home/lex/myProject/logs-viewer/logs/localhost:30000/2016/11/15/2016-11-15T09:11:54.614Z__log.txt";
    this.size = fs.statSync(this.filename).size;
    this.chunk = 1024;
    this.chunkSize = this.chunk;
    this.separator = '\n';
    this.start = () => {
        this.point = this.size - this.chunk;
        this.pointEnd = this.size;
        this.savedBuffer = '';
        this.line = '';
        this.resume();
    };

    this.resume = () => {
        let rstream = new fs.ReadStream(this.filename, {
            start: this.point,
            end: this.pointEnd,
            encoding: "utf8"
        });

        rstream.on("data", (data) => {
            let buffer = data;
            buffer += this.line;
            let separatorPos = buffer.indexOf(this.separator);
            if (this.point > this.chunk) {
                this.point = this.point - this.chunkSize - 1;
                this.pointEnd = this.pointEnd - this.chunkSize;
            } else {
                this.pointEnd = this.point;
                this.point = 0;
            }
            this.savedBuffer = buffer.substr(separatorPos + this.separator.length, buffer.length);
            this.line = buffer.substr(0, separatorPos);

            callback(streamId, (this.savedBuffer.split(this.separator)));
        });

        rstream.on('error', (err) => {
            console.error(err.message);
        });
        rstream.on('end', () => {
            console.log('--> rstream finish read file');
        });
    };
};

module.exports = fileInReadReverse;