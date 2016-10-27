'use strict';

let ReverseReader = require('./reverseReader.js');

class FileReader {

    constructor(filePath) {
        this.rr = new ReverseReader(filePath);
    }

    readLine() {
        return new Promise((resolve)=> {
            this.rr.readLine((line, last)=> {
                resolve({msg: line, last: last});
            });
        })
            .catch((err)=> {
                return Promise.reject(err);
            })
    }
}
module.exports = FileReader;
