'use strict';

let FileLineReader = require('./fileLineReader.js');

class FileReader {

    constructor(filePath, direction, chankSize, separator, encoding) {
        this.flr = new FileLineReader(filePath, direction, chankSize, separator, encoding);
    }

    readLine() {
        return new Promise((resolve)=> {
            this.flr.readLine((line, last)=> {
                resolve({msg: line, last: last});
            });
        })
            .catch((err)=> {
                return Promise.reject(err);
            })
    }
}
module.exports = FileReader;
