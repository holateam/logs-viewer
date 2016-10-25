let React  = require('react');
let Viewer = require('./Viewer');
let Panel = require('./Panel');

let Main = React.createClass({

    setScrollPosRelToBottom: function () {
        this.setState(scrollPosRelToBottom);
    },

    setLiveUpdatingOnResume: function () {
        this.setState({isLiveUpdateRunning: true});
        socket.emit('resume live update');
    },

    setLiveUpdatingOnPause: function () {
        this.setState({isLiveUpdateRunning: false});
        socket.emit('pause live update');
    },

    setFilterExpression: function (expr) {
        this.setState({ filterExpression: expr });
    },

    clearLogsFromViewer: function () {
        this.setState({newLogs: []});
    },

    getLogs: function (prevScrollHeight) {
        socket.emit('get logs from server', this.state.filterExpression);
    },

    componentDidMount: function () {
        let self = this;

        socket.on('live logs update', function(msg){
            let m = JSON.parse(msg);
            self.handleLogsUpdate(m.events, 'new');
            self.setState({isOldestEventReached: m.isOldestEventReached});
            if (self.state.isLiveUpdateRunning) {
                // let logsWrapper = document.getElementById('logs_wrapper');
                // logsWrapper.scrollTop = logsWrapper.scrollHeight;
            }
        });

        // var keepWrapperScrolledToBottom = function () {
        //     var logsWrapper = document.getElementById('logs_wrapper');
        //     logsWrapper.scrollTop = logsWrapper.scrollHeight;
        // };

        socket.on('send logs from server to client', function (msg) {
            let m = JSON.parse(msg);
            self.handleLogsUpdate(m.events, 'old');
            self.setState({isOldestEventReached: m.isOldestEventReached});
        });
    },

    getInitialState: function () {
        return {
            newLogs: [],
            filterExpression: '',
            isLiveUpdateRunning: true,
            isOldestEventReached: false,
            scrollPosRelToBottom: 0
        };
    },

    handleLogsUpdate: function (events, oldOrNewParam) {
        let l = [];
        if (oldOrNewParam === 'old') {
            l = this.state.newLogs;
            l.unshift(events);


        } else {
            l = this.state.newLogs;
            l.push(events);
            this.setState({newLogs: l});
        }
    },

    render: function () {
        return (
            <div id="container">
                    <Viewer newLogs={this.state.newLogs}
                            setLiveUpdatingOnPause={this.setLiveUpdatingOnPause}
                            setLiveUpdatingOnResume={this.setLiveUpdatingOnResume}
                            getLogs={this.getLogs}
                            isLiveUpdateRunning={this.isLiveUpdateRunning}
                            scrollPosRelToBottom={this.state.setScrollPosRelToBottom}
                            setScrollPosRelToBottom={this.setScrollPosRelToBottom}

                    />
                <Panel setFilterExpression={this.setFilterExpression}
                       clearLogsFromViewer={this.clearLogsFromViewer}
                       liveStatus={this.state.isLiveUpdateRunning ? 'pause' : 'live update'}
                />

            </div>
        );
    }
});

module.exports = Main;
