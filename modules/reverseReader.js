"use strict";
const fs = require('fs');


class ReverseReader {

    constructor(filename, separator, encoding, chunkSize) {
        this.size = fs.statSync(filename).size;
        this.filename = filename;
        this.separator = separator || '\n';
        this.encoding = encoding || 'utf8';
        this.chunkSize = chunkSize || 1024;
        this.pos = Math.max(this.size - this.chunkSize, 0);
        this.pointer = this.pos;
        this.buffer = null;
        this.savedBuffer = '';
    }


    searchBuffer() {
        if (this.buffer === null) {
            return false;
        }
        let separatorPos = this.buffer.lastIndexOf(this.separator);
        let savedBuffer;
        if (this.pos <= 0 && separatorPos === -1) {
            let lastLine = this.buffer;
            this.buffer = '';
            savedBuffer = this.savedBuffer;
            this.savedBuffer = "";
            return lastLine + savedBuffer;
        }
        if (separatorPos === -1) {
            this.pointer = this.pos - this.chunkSize - 1;
            this.pos = this.pointer;
            this.savedBuffer = this.buffer + this.savedBuffer;
            this.buffer = "";
            return false;
        } else {
            let line = this.buffer.substr(separatorPos + this.separator.length, this.buffer.length);
            this.buffer = this.buffer.substr(0, separatorPos);
            savedBuffer = this.savedBuffer;
            this.savedBuffer = "";
            return line + savedBuffer;
        }
    }

    readLine(cb) {
        let _this = this;
        let chunkSize = 0;
        let line = _this.searchBuffer();
        if (line !== false) {
            cb(line, _this.buffer === '' && this.pos <= 0);
        } else {
            let stream = fs.createReadStream(this.filename, {
                start: Math.max(this.pointer, 0),
                end: Math.max(this.pointer + this.chunkSize, 0),
                encoding: this.encoding
            });

            stream.on('error', function (err) {
                throw err;
            });
            stream.on('end', function () {
                if (_this.buffer === null) {
                    cb(null, true);
                } else {
                    _this.readLine(cb);
                }
            });
            stream.on('data', function (data) {
                if (_this.buffer === null) {
                    _this.buffer = '';
                }
                _this.buffer += data;
                chunkSize += data.length;
            });
        }
    }

}
module.exports = ReverseReader;
