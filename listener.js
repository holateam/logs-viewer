// const logging = require('./modules/logging');
const Users = require('./modules/userSchema');
const saveInFile = require('./modules/saveInFile');

let tcp = require("net");
let socketIO = require("socket.io-client")("http://localhost:3000");


users().then(function (result) {
    console.log(`Created TCP servers for each user...`);
    runServers(result);
}, function (err) {
    console.log(`Error mongoDB ${err}`);
});

function runServers(users) {
    users.forEach(user => {
        let server = tcp.createServer();
        let arrayBuff = {};

        server.on("connection", socket => {
            socket.on("data", (data) => {
                saveInBuffer(data, arrayBuff);

                // if(data.filename != buff.name)
                // convert data to JSON

                // write JSON to DB
                //   onDataReceived(data, user);

                //socketIO.emit("new_logs_received", data);
                //socket.end();
            });
        });

        server.listen(user.port, () => {
            console.log(`Server running on PORT: ${user.port}`)
        });
    });
}

function users() {
    let promise = new Promise(function (resolve, reject) {
        Users.find({}, function (err, res) {
            if (err) {
                reject(err);
            }
            let array = [];
            res.forEach(user => {
                array.push(user);
            });
            resolve(array);
        });
    });
    return promise;
}

function selectFileNameFromDataStream(data) {
    return data.toString().split(' ')[3];
}

function saveInBuffer(data, arrayBuff) {
    let limit = 10;
    let nameFile = selectFileNameFromDataStream(data);
    let baff = data.toString().split('\n');

    if (!arrayBuff[nameFile]) {
        arrayBuff[nameFile] = [];
    }

    baff.forEach((line) => {
        if (arrayBuff[nameFile].length + 1 >= limit) {
            let buff = arrayBuff[nameFile];
            saveInFile(nameFile, buff, () => {
                arrayBuff[nameFile].splice(0, 10);
            });
        }
        if (line != "") {
            let time = new Date().toISOString();
            arrayBuff[nameFile].push(time + ' ' + parseToString(line));
        }
    });
}

function parseToString(line) {
    let n = 0;
    for (let i = 0; i < line.length; i++) {
        if (n != 2) {
            if (line[i] == ' ') {
                n++;
            }
        } else {
            n = i;
            break;
        }
    }
    return line.substring(n, line.length);
}

