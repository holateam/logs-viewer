const lineReader = require('reverse-line-reader');
const fs = require('fs');
const config = require('../config.json');


let fileInReadReverse = function (limit, heartbeatInterval, filters, streamId, pointTimestamp,
                           reverseDirection, filename, pauseSearch, callback) {
    this.filename = "/home/lex/myProject/logs-viewer/logs/localhost:30000/tolstoi_l_n__voina_i_mir.txt";
    this.point = 0;
    this.chunk = 1024;
    this.buff = [];
    this.start = () => {
        this.point = 0;
        this.buff = [];
        let rstream = new fs.ReadStream(this.filename, {start: this.point, end: this.chunk, encoding: "utf8"});
        rstream.on("data", (data) => {
            this.point += this.chunk;
            console.log("--> " + data + " <--");
            this.buff.push(data.split("\n"));
            callback(streamId, this.buff);
        });

        // this.rstream.on('data', (chunk) => {
        //     setTimeout(() => {
        //         callback(streamId, chunk);
        //     }, 1000);
        //     this.rstream.pause();
        // });
        //
        rstream.on('error', (err) => {
            console.error(err.message);
        });
        rstream.on('end', () => {
            console.log('--> rstream finish read file');
        });
    };

    this.resume = () => {
        console.log("resume start= "+ this.point + " end= " + (this.chunk+this.point) );

        let rstream = new fs.ReadStream(this.filename, {start: this.point, end: this.chunk+this.point, encoding: "utf8"});
        rstream.on("data", (data) => {
            this.point += this.chunk;
            console.log("--> " + data + " <--");
            this.buff.push(data.split("\n"));
            callback(streamId, this.buff);
        });
        // this.rstream.resume();
        // console.log(JSON.stringify(this.cb));
        // this.cb();
    };
};

module.exports = fileInReadReverse;