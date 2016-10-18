const fs = require('fs');

function saveInFile(namefile, buffer, callback) {
    let nameFile = new Date().toISOString() + namefile + '.txt';
    //noinspection JSAnnotator
    fs.open(nameFile, "w", 0644, function (err, file_handle) {
        if (!err) {
            let wstream = fs.createWriteStream(nameFile, {flags: 'w'});
            wstream.on('finish', () => {
                console.log(`write log in file: ${nameFile}`);
            });
            writeLog(wstream, buffer, callback);
        } else {
            console.log(`Error to open file ${nameFile}: ${err}`);
        }
    });
}

function writeLog(wstream, buffer, callback) {
    buffer.forEach((line) => {
        let ok = wstream.write(`${line}\n`, 'utf8');
        if (!ok) {
            wstream.once('drain', writeLog);
            //noinspection JSAnnotator
            return false;
            /*break;*/
        }
    });
    wstream.end('', callback);
}

module.exports = saveInFile;
