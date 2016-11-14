let buffer = [
    "2016-10-26T14:27:36.335Z bel log - - - --- ya.ru ping statistics ---",
    "2016-10-26T14:27:36.335Z bel log - - - --- ya.ru ping statistics ---",
    "2016-10-26T14:27:36.335Z bel log - - - 10 packets transmitted, 10 received, 0% packet loss, time 9011ms",
    "2016-10-26T14:27:36.335Z bel log - - - 10 packets transmitted, 10 received, 0% packet loss, time 9011ms",
    "2016-10-26T14:27:36.335Z bel log - - - --- ya.ru ping statistics ---",
    "2016-10-26T14:27:36.335Z bel log - - - rtt min/avg/max/mdev = 23.623/24.677/26.445/1.035 ms",
    "2016-10-26T14:27:36.335Z bel log - - - --- ya.ru ping statistics ---",
    "2016-10-27T07:38:58.464Z bel log - - - rtt min/avg/max/mdrrev = 27.651/28.079/28.855/0.425 ms",
    "2016-10-26T14:27:36.335Z bel log - - - --- google.com ping statistics ---",
    "2016-10-26T14:58:59.335Z bel log - - - 10 packets transmitted, 10 received, 0% packet loss, time 9011ms",
];

let finish = false;

function searchInBuffer (limit, heartbeatInterval, filters, streamId, pointTimestamp, callback) {
    console.log("filter ------->: " + filters);

        let logs = buffer.map(str => {
            pointTimestamp = str.split(" ")[0];
            return (str.indexOf(filters) != -1) ? str :  pointTimestamp;
        });
        console.log("my buffer --------> " + JSON.stringify(logs));
    callback(streamId, logs, pointTimestamp, finish);

}

module.exports = searchInBuffer;