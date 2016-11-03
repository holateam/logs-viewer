/**
 * Created by lex on 26.10.16.
 */
const LogSearcher = require('./logSearcher');
const searchInBuffer = require('./searchInBuffer');

let obj = {
    filters: '',
    streamsId: ['log', 'sys_log', 'nginx'],
    miniTimestamp: 1,
    limit: 2,
    heartbeatInterval: 2000,
    isNew: true,
    callback: (logs) => {
        console.log('Finish my searchers logs:'+ logs.toString());
    }
};

let miniTimestamp = '';
let maxTimestamp = '';




let createAggregator = (userId, streamsId, filters, limit, heartbeatInterval, isNew, callback) => {
    let count = 0;
    let buffers = {};
    let lastTimestamp = (isNew) ? maxTimestamp : miniTimestamp;

    function createLogSearcher (userId, streamId, filters, limit, heartbeatInterval, lastTimestamp, isNew, callback) {

        return new LogSearcher(userId, streamId, filters, limit, heartbeatInterval, lastTimestamp, isNew, callback);

        // let logs = [];
        // let lastTimestamp = 0;
        // let finish = false;
        // if(streamId == "log"){
        //     logs = [22,21,20,19,18,15,16,14,13,12];
        //     lastTimestamp = 12;
        // } else if(streamId == "sys_log") {
        //     logs = [17,15,11,9,5];
        //     lastTimestamp = 5;
        // } else {
        //     logs = [20,16,15,9,2,1];
        //     lastTimestamp = 1;
        // }
        // callback(streamId, logs, lastTimestamp, finish);
        //
        // // searchInFile()

    }

    function aggregateLogs(streamId, logs, lastTimestamp, finish){
        // if(finish){
        //     logSearchers[streamId].stop();
        // }
        console.log(`aggregatorsLogs -> streamId: ${streamId}`);
        console.log(`aggregatorsLogs -> logs: ${logs}`);
        if (!buffers[streamId]) {
            buffers[streamId] = [];
        }
        buffers[streamId].push(...logs);
        console.log('bufers[streamId]: ' + JSON.stringify(buffers[streamId]));
        srez(buffers);
    }


    let logSearchers = streamsId.map((streamId) => {
        return createLogSearcher (userId, streamId, filters, limit, heartbeatInterval, lastTimestamp, isNew, aggregateLogs);
    });

    console.log("LogSerchers--> "+ logSearchers);

    function srez(buffers) {
        count++;
        if(count >= 3){

            let filteredLogs = [];
            let srezTimestamp = getTimestampOfToSrez(buffers);

            for(i in buffers){
                let count = 0;
                buffers[i].forEach(line => {
                    if( srezTimestamp <= Date.parse(line.split(" ", 1)) ){
                        filteredLogs.push(line);
                        count++;
                    }
                });
                buffers[i].splice(0, count);
            }

            // console.log(JSON.stringify(cutByMinimalTimestamp(buffers[i])));
            // filteredLogs.push(...cutByMinimalTimestamp(buffers[i]));

            callback(filteredLogs);
            // setTimeout(function(){
            //     callback(["sdkfjsk","dfdf"])
            // }, 2000);
        }
    }

    function cutByMinimalTimestamp(buffer) {
        // Todo something in the buffer
        // console.log("sdsdsd: "+ JSON.stringify(array));
        return buffer.filter(log => {
            return log <= 20;
        });
    }

    function getTimestampOfToSrez(buffers) {
        let srezTimestamp = 0;
        for(i in buffers) {
            let digitalTimestampValue = Date.parse(buffers[i][buffers[i].length-1].split(" ", 1));
            if(srezTimestamp < digitalTimestampValue){
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
        }
    }

};

module.exports.createAggregator = createAggregator;

// createAggregator(obj.filters, obj.streamsId, obj.miniTimestamp,
//     obj.limit, obj.heartbeatInterval, obj.callback).start();


