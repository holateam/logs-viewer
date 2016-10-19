'use strict';

const net = require('net');

let host = '127.0.0.1';
let port = 30000;
let logs = [
    "<45>Oct 12 2016 16:31:28 ip-172-31-21-248 info.log.js: Wed Oct 12 2016 16:31:28 GMT+0000 (UTC) INFO >>> 421018086373806 ...DockerExecutor prepareCallback called",
    "<45>Oct 12 2016 16:35:13 ip-172-31-21-248 info.log.js: Wed Oct 12 2016 16:35:13 GMT+0000 (UTC) INFO >>> 9587812004610896 ...and call own callback with: 9",
    "<45>Oct 12 2016 16:35:13 ip-172-31-21-248 info.log.js: Wed Oct 12 2016 16:35:13 GMT+0000 (UTC) INFO >>> 9587812004610896 ..but before DockerExecutor must rm container 9587812004610896",
    "<45>Oct 12 2016 16:35:13 ip-172-31-21-248 info.log.js: Wed Oct 12 2016 16:35:13 GMT+0000 (UTC) INFO >>> 9587812004610896 rm: docker rm 9587812004610896",
    "<45>Oct 12 2016 16:35:13 ip-172-31-21-248 info.log.js: Wed Oct 12 2016 16:35:13 GMT+0000 (UTC) INFO >>> 9587812004610896 ...cb from rm container 9587812004610896",
    "<45>Oct 12 2016 16:35:13 ip-172-31-21-248 info.log.js: Wed Oct 12 2016 16:35:13 GMT+0000 (UTC) INFO >>> 9587812004610896 Then in dockerExecutor",
    "<45>Oct 12 2016 16:40:13 ip-172-31-21-248 info.log.js: Wed Oct 12 2016 16:40:13 GMT+0000 (UTC) INFO >>> 7524738111533225 ...returned from dockerExecutor to TestCasesRunner with stdout: 9, err:",
    "<45>Oct 12 2016 16:40:13 ip-172-31-21-248 info.log.js: Wed Oct 12 2016 16:40:13 GMT+0000 (UTC) INFO >>> 7524738111533225 Running testcase 2",
    "<45>Oct 12 2016 16:40:13 ip-172-31-21-248 info.log.js: Wed Oct 12 2016 16:40:13 GMT+0000 (UTC) INFO >>> 7524738111533225 ...testcases finished",
    "<45>Oct 12 2016 16:41:48 ip-172-31-21-248 info.log.js: Wed Oct 12 2016 16:41:48 GMT+0000 (UTC) INFO >>> 3325652845669538 ...return from testCasesRunner and merge response.",
    "<45>Oct 12 2016 16:41:48 ip-172-31-21-248 info.log.js: Wed Oct 12 2016 16:41:48 GMT+0000 (UTC) INFO >>> 3325652845669538 Deleting tmp folder /tmp/dockerShared/3325652845669538",
    "<45>Oct 12 2016 16:41:48 ip-172-31-21-248 info.log.js: Wed Oct 12 2016 16:41:48 GMT+0000 (UTC) INFO >>> 3325652845669538 Run DockerRunner callback function for 3325652845669538",
    "<45>Oct 12 2016 16:41:48 ip-172-31-21-248 info.log.js: Wed Oct 12 2016 16:41:48 GMT+0000 (UTC) INFO >>> 3325652845669538 ...task solution 3325652845669538 received from docker-manager to coderunnerQueue",
    "<45>Oct 12 2016 16:41:48 ip-172-31-21-248 info.log.js: Wed Oct 12 2016 16:41:48 GMT+0000 (UTC) INFO >>> 3325652845669538 Sending answer 3325652845669538 to API-server",
    "<45>Oct 12 2016 16:41:48 ip-172-31-21-248 info.log.js: Wed Oct 12 2016 16:41:48 GMT+0000 (UTC) INFO >>> 3325652845669538 ...return from CoderunnerQueue to API-server. Task ID 3325652845669538",
    "<45>Oct 12 2016 16:41:48 ip-172-31-21-248 info.log.js: Wed Oct 12 2016 16:41:48 GMT+0000 (UTC) INFO >>> 3325652845669538 Sending answer to 3325652845669538:",
    "<45>Oct 12 2016 16:41:48 ip-172-31-21-248 info.log.js: {",
    "<45>Oct 12 2016 16:41:48 ip-172-31-21-248 info.log.js:  \"dockerError\": null,",
    "<45>Oct 12 2016 16:41:48 ip-172-31-21-248 info.log.js:  \"compilerErrors\": null,",
    "<45>Oct 12 2016 16:41:48 ip-172-31-21-248 info.log.js:  \"stdout\": [",
    "<45>Oct 12 2016 16:41:48 ip-172-31-21-248 info.log.js:      \"6\",",
    "<45>Oct 12 2016 16:41:48 ip-172-31-21-248 info.log.js:      \"9\",",
    "<45>Oct 12 2016 16:41:48 ip-172-31-21-248 info.log.js:   ]",
    "<45>Oct 12 2016 16:41:48 ip-172-31-21-248 info.log.js:  \"stderr\": [",
    "<45>Oct 12 2016 16:41:48 ip-172-31-21-248 info.log.js:      \"\",",
    "<45>Oct 12 2016 16:41:48 ip-172-31-21-248 info.log.js:      \"\",",
    "<45>Oct 12 2016 16:41:48 ip-172-31-21-248 info.log.js:   ]",
    "<45>Oct 12 2016 16:41:48 ip-172-31-21-248 info.log.js:  \"timestamps\": [",
    "<45>Oct 12 2016 16:41:48 ip-172-31-21-248 info.log.js:      380",
    "<45>Oct 12 2016 16:41:48 ip-172-31-21-248 info.log.js:      395",
    "<45>Oct 12 2016 16:41:48 ip-172-31-21-248 info.log.js:   ]",
    "<45>Oct 12 2016 16:41:48 ip-172-31-21-248 info.log.js:   \"codeRunnerVersion\": \"0.0.1\"",
    "<45>Oct 12 2016 16:41:48 ip-172-31-21-248 info.log.js: }"
];

let timeout_id;


var client = new net.Socket();
client.connect(port, host, ()=> {
    let i = 0;
    setTimeout(function writeLogs() {
        i = (i < logs.length) ? i : 0;
        client.write(logs[i++]);
        timeout_id = setTimeout(writeLogs, 500)
    }, 500)
});
client.on('error', ()=> {
    console.log('Something wrong');
});
client.on('close', ()=> {
    console.log('Connection closed');
    clearTimeout(timeout_id);
    client.destroy();
});
