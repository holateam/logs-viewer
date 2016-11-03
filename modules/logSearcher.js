/**
 * Created by lex on 28.10.16.
 */

const searchInBuffer = require('./searchInBuffer');
// const searchInFile = require('./searchInFile');



// let filenameGetter = (userId, isNew) => {
//     let arrayFilename = [];
//     console.log("UserId: " + userId);
//     console.log("isNew: " + isNew);
// };
//
// let searchInFile = (limit, heartbeatInterval, filters, streamId, lastTimestamp, filenameGeter, callback) => {
//     console.log(filenameGeter);
// };

function LogSearcher (userId, streamId, filters, limit, heartbeatInterval, lastTimestamp, isNew, callback) {
    this.userId = userId;
    this.streamId = streamId;
    this.filters = filters;
    this.limit = limit;
    this.heartbeatInterval = heartbeatInterval;
    this.lastTimestamp = lastTimestamp;
    this.isNew = isNew;
    this.callback = callback;
    this.start = () => {
        console.log('Start');
        searchInBuffer(limit, heartbeatInterval,filters, streamId, lastTimestamp, callback);
        // searchInFile(limit, heartbeatInterval, filters, streamId, lastTimestamp, filenameGeter, callback);
    };

}

// let dd = new LogSearcher('localhost:30000', 'log', 'filter', 10, 500, "2016-11-02T08:12:32.754Z", true, () => {
//     console.log('finish');
// });
// dd.start();

module.exports = LogSearcher;