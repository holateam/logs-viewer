var socket = io();

socket.on('newest logs', function(msg){
    $('#new_logs_list').append($('<dd>').text(msg.logText));
    keepWrapperScrolledToBottom();

});

var keepWrapperScrolledToBottom = function () {
    var logsWrapper = document.getElementById('logs_wrapper');
    logsWrapper.scrollTop = logsWrapper.scrollHeight;
};
$('#get_more_logs_btn').click(function () {
    socket.emit('request for more old logs');
});

socket.on('more logs', function (msg) {
    $('#logs_history_list').append($('<dd>').text(msg.oldLogs));
});

$('#updating_checkbox').change(function() {
    if (this.checked) {
        socket.emit("pause_updating");
    } else {
        socket.emit("resume_updating");
    }
});