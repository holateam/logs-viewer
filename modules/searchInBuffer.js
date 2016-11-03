/**
 * Created by lex on 27.10.16.
 */

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

function searchInBuffer (limit, heartbeatInterval, filters, streamId, lastTimestamp, callback) {
    console.log("filter ------->: " + filters);


    // if(!finish){
        // let lastTimestamp = '';
        let logs = buffer.filter((str) => {
            lastTimestamp = str.split(" ")[0];
            return str.indexOf(filters) != -1
        });
        console.log("my buffer --------> " + JSON.stringify(logs));
        // finish = true;
    callback(streamId, logs, lastTimestamp, finish);
    //     let setIntId = setInterval( ()=>{
    //         callback(streamId, logs, lastTimestamp, finish)
    //     }, 1000);
    // }else {
    //     clearInterval(setIntId);
    // }

}

// function logSearcher (streamId,filters,limit,heartbeatInterval,callback) {
//     this.streamId = streamId;
//     this.filters = filters;
//     this.limit = limit;
//     this.heartbeatInterval = heartbeatInterval;
//     this.callback = callback;
//     this.start = () => {
//         searchInBuffer(limit, heartbeatInterval,filters,callback);
//     };
// }


// let serch = new logSearcher('log', 'ya.ru', 2, 100, function (logs) {
//     console.log((logs.forEach(line =>{
//         console.log(line);
//     })));
// });


// console.log(JSON.stringify(serch));
// serch.start();


// searchInBuffer(10, 1000, "min/avg/max/mdrrev", "log", "2016-10-26T14:27:36.335Z", (streamId, logs, lastTimestamp) => {
//     console.log("my buffer --------> " + JSON.stringify(logs));
//     let llogs = logs;
//     // logs.forEach(line =>{
//     //     console.log(line);
//     // });
//
//     llogs.forEach((line) => {
//        line = "5465w45rew465r4w5r4w65";
//     });
// });

module.exports = searchInBuffer;