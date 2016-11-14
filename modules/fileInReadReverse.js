const lineReader = require('reverse-line-reader');
const config = require('../config.json');

let fileInReadReverse = function (limit, heartbeatInterval, filters, streamId, pointTimestamp,
                           reverseDirection, filename, pauseSearch, callback) {

    // this.rstream = new fs.ReadStream(filename, {encoding: "utf8"});
    this.start = () => {
        let count = 0;
        let chunk = 5;
        let buff = [];
        callback("log", ["dkdfskdjfksdfjksdfjksdjfksdjfksjfskjfkljf"]);


        // this.rstream.on('data', (chunk) => {
        //     setTimeout(() => {
        //         callback(streamId, chunk);
        //     }, 1000);
        //     this.rstream.pause();
        // });
        //
        // this.rstream.on('error', (err) => {
        //     console.error(err.message);
        // });
        // this.rstream.on('end', () => {
        //     console.log('--> rstream finish read file');
        // });
    };


    this.resume = () => {
        callback("log", ["resume ddkgjkdgjdlkgj"]);
        // this.rstream.resume();
        // console.log(JSON.stringify(this.cb));
        // this.cb();
    };
};

module.exports = fileInReadReverse;