let createAgregator = (filters, streamIds, limit, heartbeatInterval, callback) => {
    const TIMESTAMP_LENGTH = 24;
    let buffers = [];
    let timestamps = [];
    let minTimestamp;

    let logSearchers = streamIds.map((streamId, index) => {
        return createLogSearcher(index, streamId, filters, limit, heartbeatInterval, agregateLogs);
    });

    function createLogSearcher(index, streamId, filters, limit, heartbeatInterval, agregateLogs) {
        return //searcher
    }

    function agregateLogs(index, logs, lastTimestamp, finished) {
        if(!buffers[index]){
            buffers[index] = [];
        }
        buffers[index].push(...logs);
        timestamps[index] = lastTimestamp;
        srez();
    }

    function srez() {
        let newMinTimestamp = timestamps.reduce((prev, cur) => { return prev < cur ? prev : cur });

        if(!minTimestamp || newMinTimestamp > minTimestamp){
            minTimestamp = newMinTimestamp;

            let logsForSend = [];
            buffers = buffers.map(cutByMinimalTimestamp);

            callback(logsForSend.sort(timestampComparator));
        }
    }

    function cutByMinimalTimestamp(oneBuffer) {
        return oneBuffer.filter(log => {
            if(logToTimestamp(log) > minTimestamp){
                return true;
            }else {
                logsForSend.push(log);
                return false;
            }
        });
    }

    function logToTimestamp(log) {
        return Date.parse(log.substr(0, TIMESTAMP_LENGTH))
    }

    function timestampComparator(firstLog, secondLog) {
        let firstTimestamp = logToTimestamp(firstLog);
        let secondTimestamp = logToTimestamp(secondLog);
        if(firstTimestamp < secondTimestamp){
            return -1;
        }else if (firstTimestamp > secondTimestamp){
            return 1;
        }else{
            return 0;
        }
    }
    
    return {
        start: function () {
            logSearchers.forEach((searcher) => {
                searcher.start();
            });
        },
        stop: function () {
            logSearchers.forEach((searcher) => {
                searcher.stop();
            });
        }
    }
};