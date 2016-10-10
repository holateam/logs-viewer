let React = require('react');

let LogChunk = React.createClass ({
    render: function () {
        return (
            <dd>{this.props.text }</dd>
        );
    }
});

module.exports = LogChunk;