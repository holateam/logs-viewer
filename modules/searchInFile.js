/**
 * Created by lex on 27.10.16.
 */
const fs = require('fs');


let searchInFile = function (heartbeatInterval, filename, filter,
                      skipLinesCount, limit, updatesHandler) {
    let rstream = new fs.ReadStream(filename, {encoding: 'utf8'});

    rstream.on('readable', () => {
        let data = rstream.read();
        console.log(String(data));
    });

    rstream.on('end', () => {
        console.log('--> rstream finish read file');
    });

};

module.exports = searchInFile;

let filename = "/home/lex/myProject/logs-viewer/logs/localhost:30000/2016/10/3/2016-11-02T08:12:32.759Z-log.txt";

searchInFile(2000, filename, 3, 5, function () {
    console.log('updatesHandler');
});
