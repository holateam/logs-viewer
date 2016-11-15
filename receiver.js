// const logging = require('./modules/logging');
// const Users = require('./modules/userSchema');
const saveInFile = require('./modules/saveInFile');
const db_query = require('./modules/db_query');

const tcp = require("net");
const socketIO = require("socket.io-client")("http://localhost:8080");


db_query.getUsers().then((result) => {
    console.log(`Created TCP servers for each user...`);
    runServers(result);
}, (err) => {
    console.log(`Error mongoDB ${err}`);
});

function runServers(users) {
    users.forEach(user => {
        let server = tcp.createServer();
        let arrayBuff = {};
        server.on("connection", socket => {
            socket.on("data", (data) => {
                console.log(`User Port? ${user.port} User Host? ${user.host}`);
                saveInBuffer(data, arrayBuff, user.host, user.port);
                // if(data.filename != buff.name)
                // convert data to JSON

                // write JSON to DB
                //   onDataReceived(data, user);

                //socketIO.emit("new_logs_received", data);
                //socket.end();
            });
        });

        server.listen(user.port, user.host, () => {
            console.log(`Server running on: ${user.host}:${user.port}`)
        });
    });
}

function selectFileNameFromDataStream(data) {
    return data.toString().split(' ')[3];
}

function saveInBuffer(data, arrayBuffer, userHost, userPort) {
    let limit = 50;
    let nameFile = selectFileNameFromDataStream(data);
    let buffer = data.toString().split('\n');
    if (!arrayBuffer[nameFile]) {
        arrayBuffer[nameFile] = [];
    }

    buffer.forEach((line) => {
        if (line != "") {
            let time = new Date().toISOString();
            console.log(line);
            arrayBuffer[nameFile].push(time + ' ' + parseToString(line));

            if (arrayBuffer[nameFile].length == limit) {
                let buff = JSON.parse(JSON.stringify(arrayBuffer[nameFile]));
                saveInFile(userHost + ":" + userPort, nameFile, buff, (address) => {
                    db_query.saveAddressOfFile(userHost, userPort, nameFile, address);
                    // arrayBuffer[nameFile].splice(0, limit);
                });
                arrayBuffer[nameFile].splice(0, limit);
                // console.log(`---> Buff: ${buff}`);
            }
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

