let React = require('react');
let LogChunk =  require('./LogChunk');

let Viewer = React.createClass ({

    renderNewChunks: function () {
        let logs = this.props.newLogs;
        logs.map( function (chunk, index){
            return (
                <LogChunk text={chunk} key={index} />
            );
        })
    },

    render: function () {
        return (
            <div id="logs_wrapper">
                <dl id="logs_history_list"></dl>

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