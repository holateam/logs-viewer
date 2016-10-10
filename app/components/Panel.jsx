let React = require('react');

let Panel = React.createClass ({
    pauseResumeUpdating: function (e) {
        if (e.target.checked) {
            socket.emit('pause_updating');
        } else {
            socket.emit('resume_updating');
        }
    },

    getMoreLogsButtonOnClick: function () {
        socket.emit('request for more old logs');
    },

    render: function () {
        return (
            <div>
                <button id="get_more_logs_btn" type="button" onClick={this.getMoreLogsButtonOnClick}>Get more logs</button>
                <input id="updating_checkbox" type="checkbox" onChange={this.pauseResumeUpdating} /><span>pause updating</span>
            </div>
        );
    }
});

module.exports = Panel;
