const fs = require('fs');
const mkdirp = require('mkdirp');
const config = require('../config.json');

function saveInFile(userName, namefile, buffer, callback) {
    let dirname = generatedDirectoryAndFileName(userName);
    let fileName = new Date().toISOString() + '-' + namefile + '.txt';
    let address = dirname + fileName;

    // mkdirp.sync(dirname);
    function createDirs(dirname) {
        return new Promise((resolve, reject) => {

            mkdirp(dirname, (err) => {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                else {
                    console.log(" ---> Directory created - OK");
                    resolve();
                }
            });
        }).catch("Error ");

    }

    createDirs(dirname)
        .then(() => createWStream(address))
        .then((wstream) => writeLog(wstream, buffer))
        .then(()=>callback(address))
        .catch(error => console.error(error));
}

function createWStream(address) {
    let promise = new Promise((resolve) => {
        let wstream = fs.createWriteStream(address, {flags: 'w'});
        wstream.on('finish', () => {
            console.log(` ---> Write log in file: ${address}`);
        });
        console.log(" ---> WStream created - OK ");
        resolve(wstream);
    });
    return promise;
}

function writeLog(wstream, buffer) {
    let promise = new Promise((resolve) => {
        buffer.forEach((line) => {
            console.log(" ---> Write to the file:" + line);
            let ok = wstream.write(`${line}\n`, 'utf8');
            if (!ok) {
                wstream.once('drain', writeLog);
                //noinspection JSAnnotator
                return false;
                /*break;*/
            }
        });
        wstream.end('', ()=> {
            console.log(" ---> Write to the file finish - OK");
            resolve();
        });
    });
    return promise;
}

function generatedDirectoryAndFileName(userName) {
    return config.dirname + userName + '/' + new Date().getFullYear() + '/'
        + new Date().getMonth() + '/' + new Date().getDay()
        + '/';
}

module.exports = saveInFile;
