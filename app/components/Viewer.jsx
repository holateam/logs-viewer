let React = require('react');
let LogChunk =  require('./LogChunk');

let Viewer = React.createClass ({

    componentDidMount: function () {
        let logsWrapper = document.getElementById("logs_wrapper");
        logsWrapper.scrollTop = this.props.scrollPosRelToBottom;
    },

    handleScroll: function () {
        let logsWrapper = document.getElementById("logs_wrapper");
        this.props.setScrollPosRelToBottom(logsWrapper.scrollHeight - logsWrapper.scrollTop);
        if ( (logsWrapper.scrollTop + logsWrapper.clientHeight) == logsWrapper.scrollHeight) {
            this.props.setLiveUpdatingOnResume();
        } else {
            this.props.setLiveUpdatingOnPause();
        } if (logsWrapper.scrollTop === 0) {
            // let prevHeight = logsWrapper.scrollTop;
            // let scrollPosition = logsWrapper.scrollHeight - logsWrapper.scrollTop;
            this.props.getLogs();
            // logsWrapper.scrollTop = logsWrapper.scrollHeight;
        }
    },

    renderNewChunks: function () {
        let logs = this.props.newLogs;
        logs.map( function (chunk, index){
            return (
                <LogChunk text={chunk} key={index} />
            );
        });

    },

    render: function () {
        return (
            <div id="logs_wrapper" onScroll={this.handleScroll}>
                <dl id="new_logs_list">
                    {
                        this.props.newLogs.map( (chunk, index) => {
                            return (
                                <LogChunk text={chunk} key={`new${index}`} />
                            );
                        })
                    }
                </dl>
            </div>
        );
    }
});

module.exports = Viewer;