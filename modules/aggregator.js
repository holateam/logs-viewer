const LogSearcher = require('./logSearcher');
const searchInBuffer = require('./searchInBuffer');

let firstTimestamp = new Date(); // first Timestamp
let lastTimestamp = new Date(); // last Timestamp
let pointTimestamp = '';
let limit = 5; // ??
let heartbeatInterval = 1000; // ??
let logSearchers = null;

let createAggregator = (userId, streamsId, filters, reverseDirection, callback) => {
    let count = 0; // ?
    let buffers = {}; // buffer logs?
    limit = 20;
    pointTimestamp = (reverseDirection) ? lastTimestamp : firstTimestamp;

    logSearchers = streamsId.map((streamId) => {
        return createLogSearcher(userId, streamId, filters, limit, reverseDirection, aggregateLogs);
    });

    function createLogSearcher(userId, streamId, filters, limit, reverseDirection, callback) {
        return new LogSearcher(userId, streamId, filters, limit, heartbeatInterval, pointTimestamp, reverseDirection, callback);
    }

    function aggregateLogs(streamId, logs, pointTimestamp, finish) {
        console.log(`aggregatorsLogs -> streamId: ${streamId}`);
        // console.log(`aggregatorsLogs -> logs: ${logs}`);
        limit -= 5;
        console.log("Limit: " + limit);
        if (limit > 0) {
            console.log("Resume search");
            logSearchers.forEach((searcher) => {
                if (searcher.streamId == streamId) {
                    searcher.resume();
                }
            });
        }
        callback(logs);
        // callback(logs.split('\n'));
        // if (!buffers[streamId]) {
        //     buffers[streamId] = [];
        // }
        // buffers[streamId].push(...logs);
        // console.log('bufers[streamId]: ' + JSON.stringify(buffers[streamId]));
        // srez(buffers);
    }

    function srez(buffers) {
        count++;
        if (count >= 3) {

            let filteredLogs = [];
            let srezTimestamp = getTimestampOfToSrez(buffers);

            for (i in buffers) {
                let count = 0;
                buffers[i].forEach(line => {
                    if (srezTimestamp <= Date.parse(line.split(" ", 1))) {
                        filteredLogs.push(line);
                        count++;
                    }
                });
                buffers[i].splice(0, count);
            }
            callback(filteredLogs);
        }
    }

    function getTimestampOfToSrez(buffers) {
        let srezTimestamp = 0;
        for (i in buffers) {
            let digitalTimestampValue = Date.parse(buffers[i][buffers[i].length - 1].split(" ", 1));
            if (srezTimestamp < digitalTimestampValue) {
                srezTimestamp = digitalTimestampValue;
            }
        }
        return srezTimestamp;
    }

    return {
        start: () => {
            logSearchers.forEach((searcher) => {
                searcher.start();
            });
        },
        stop: () => {
            logSearchers.forEach((searcher) => {
                searcher.stop();
            });
        },
        resume: () => {
            limit = 15;
            logSearchers.forEach((searcher) => {
                searcher.resume();
            });
        }
    }

};

module.exports.createAggregator = createAggregator;


