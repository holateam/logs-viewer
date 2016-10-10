let React  = require('react');
let Viewer = require('./Viewer');
let Panel = require('./Panel');

let Main = React.createClass({

    componentDidMount: function () {
        let self = this;
        socket.on('newest logs', function(msg){
            self.handleLogsUpdate(msg, 'new');
        });

        // var keepWrapperScrolledToBottom = function () {
        //     var logsWrapper = document.getElementById('logs_wrapper');
        //     logsWrapper.scrollTop = logsWrapper.scrollHeight;
        // };

        socket.on('more logs', function (msg) {
            self.handleLogsUpdate(msg, 'old');
        });
    },

    getInitialState: function () {
        return {
            newLogs: ['sdfgsdfgsdf', 'sdffffffffgdddddddddddddd'],
            oldLogs: ['gg', 'sdf']
        };
    },

    handleLogsUpdate: function (logs, oldOrNewParam) {
        let l = [];
        if (oldOrNewParam === 'old') {
            l = this.state.newLogs;
            l.unshift(logs);
            this.setState({newLogs: l});

        } else {
            l = this.state.newLogs;
            l.push(logs);
            this.setState({newLogs: l});
        }
    },

    render: function () {
        return (
            <div id="container">
                    <Viewer newLogs={this.state.newLogs}/>
                <Panel />
            </div>
        );
    }
});

module.exports = Main;

