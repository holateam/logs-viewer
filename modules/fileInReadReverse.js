const lineReader = require('reverse-line-reader');
const fs = require('fs');
const config = require('../config.json');


let fileInReadReverse = function (limit, heartbeatInterval, filters, streamId, pointTimestamp,
                           reverseDirection, filename, pauseSearch, callback) {
    this.filename = "/home/lex/myProject/logs-viewer/logs/localhost:30000/tolstoi_l_n__voina_i_mir.txt";
    // this.size = fs.statSync(this.filename).size;
    this.size = fs.statSync(this.filename).size;
    this.chunk = 1024;
    this.point = 0;
    this.line = '';
    this.strBuffer = '';
    this.separator = '\n';
    this.start = () => {
        this.point = this.size - this.chunk;
        this.strBuffer = '';
        this.line = '';
        this.resume();
    };

    this.resume = () => {
        let rstream = new fs.ReadStream(this.filename, {start: this.point , end: this.point + this.chunk , encoding: "utf8"});
        rstream.on("data", (data) => {
            console.log("Data:" + data);
            let separatorPos = data.indexOf(this.separator);
            console.log("separatorPos:" + separatorPos);
            this.strBuffer = data + this.line;
            console.log("strBuffer:" + this.strBuffer);
            this.line = this.strBuffer.substr(0, separatorPos);
            console.log("line:" + this.line);
            this.strBuffer = this.strBuffer.substr(separatorPos + this.separator.length, this.strBuffer.length);
            console.log("strBuffer:" + this.strBuffer);
            this.point -= this.chunk;
            callback(streamId, this.strBuffer.split(this.separator));
            // console.log("--> " + data + " <--");
            // let logs = [];
            // logs.push(...data.split('\n'));
            //
            // this.buff.push(data.split("\n"));
            // //     buff = buff.substring(buff.length - arrayLine[arrayLine.length-1].length);
            // //     arrayLine.pop();
            //
            // this.buff = data.split("\n");
            // callback(streamId, logs.pop());
            // this.buff = this.buff.substring(this.buff.length - arrayLine[arrayLine.length-1].length);

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