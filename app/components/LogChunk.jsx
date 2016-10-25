let React = require('react');

let LogChunk = React.createClass ({
    render: function () {
        return (
            <dd>{this.props.text.created_at}</dd>
        );
    }
});

module.exports = LogChunk;