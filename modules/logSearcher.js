const searchInBuffer = require('./searchInBuffer');
const fileInRead = require('./fileInRead');
const fileInReadReverse = require('./fileInReadReverse');

let filenameGetter = "/home/lex/myProject/logs-viewer/logs/localhost:30000/tolstoi_l_n__voina_i_mir.txt";
// let filenameGetter  = "/home/lex/myProject/logs-viewer/logs/localhost:30000/test.txt";
// let filenameGetter = (userId, reverseDirection) => {
//     let arrayFilename = [];
//      // Todo some function getter file
// };
//
// function fileNameGetter (userId, streamId, pointTimestamp, reverseDirection) {
//     this.listOfFies  = [];
//     this.reverseDirection = reverseDirection;
//     this.pointTimestamp =
// };



function LogSearcher(userId, streamId, filters, limit, heartbeatInterval, pointTimestamp, reverseDirection, callback) {
    // this.fileInRead = (reverseDirection) ?
    //         new fileInReadReverse(limit, heartbeatInterval, filters, streamId, pointTimestamp,
    //             reverseDirection, filenameGetter, callback) :
    //         new fileInRead(limit, heartbeatInterval, filters, streamId, pointTimestamp,
    //             reverseDirection, filenameGetter, callback);

    this.userId = userId;
    this.streamId = streamId;
    this.filters = filters;
    this.limit = limit;
    this.heartbeatInterval = heartbeatInterval;
    this.pointTimestamp = pointTimestamp;
    this.reverseDirection = reverseDirection;
    this.pauseSearch = false;
    this.callback = callback;
    this.fileInRead = (reverseDirection) ?
        new fileInReadReverse(this.limit, this.heartbeatInterval, this.filters, this.streamId, this.pointTimestamp,
            this.reverseDirection, filenameGetter, this.callback) :
        new fileInRead(this.limit, this.heartbeatInterval, this.filters, this.streamId, this.pointTimestamp,
            this.reverseDirection, filenameGetter, this.callback);

    this.start = () => {
        console.log('Start');
        // searchInBuffer(this.limit, this.heartbeatInterval, this.filters, this.streamId, this.pointTimestamp, this.callback);

        this.fileInRead.start();
    };

    this.resume = () => {
        console.log("LogSearcher resume()");
        this.fileInRead.resume();


        // this.pauseSearch = true;
    };

    // this.pause = () => {
    //     this.searchInFile.pause();
    //     console.log("pause");
    // };
}


module.exports = LogSearcher;