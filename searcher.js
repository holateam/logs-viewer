'use strict';


const FileReader = require('./modules/fileReader.js');
const logsHandler = require('./modules/logsHandler.js');

class Searcher {
    constructor(heartbeatInterval, filePath, filter, limit, cb) {
        this.heartbeatInterval = heartbeatInterval;
        this.filter = logsHandler.filtersToMap(filter); // ['-test', '.info']
        this.limit = limit;
        this.cb = cb;
        this.fr = new FileReader(filePath);
        this.relevantLogs = [];
        this.timeouts = [];
        this.fileEnd = false;
        this.finalTimestamp = 0;
        this.pauseSearch = false;
        this.search();
        this.periodicallySearcherInfo();
    }


    search () {
        if (this.limit && !this.fileEnd && !this.pauseSearch) {
            this.checkSingleLine()
                .then(()=> {
                    this.search();
                })
                .catch((err)=> {
                    console.log('err: ', err);
                })
        } else {
            this.stop();
        }
    }

    checkSingleLine() {
        return this.fr.readLine()
            .then((line)=> {
                if (line.last) {
                    this.fileEnd = true;
                }
                if (logsHandler.isMatchesFilter(line.msg, this.filter)) {
                    this.relevantLogs.push(line.msg);
                    this.limit--;
                }
                this.finalTimestamp = logsHandler.getTimestamp(line.msg);
            })
            .catch((err)=> {
                console.log('err: ', err);
            })
    }

    pause () {
        this.pauseSearch = true;
    }

    stop () {
        this.timeouts.forEach((timeout)=> {
            clearTimeout(timeout);
        });
        this.timeouts = [];
        this.transmitLogPortion();
        console.log('stop')
    }

    resume () {
        this.pauseSearch = false;
        this.search();
        this.periodicallySearcherInfo();
        console.log('resume');
    }

    periodicallySearcherInfo () {
        let _this = this;
        this.timeouts.push(setTimeout(function nextTick() {
            _this.transmitLogPortion();
            _this.timeouts.push(setTimeout(nextTick, _this.heartbeatInterval));
        }, _this.heartbeatInterval))
    }

    transmitLogPortion () {
        this.cb(this.fileEnd, this.relevantLogs, this.finalTimestamp);
        this.relevantLogs = [];
    }

}

module.exports = Searcher;
