let React = require('react');

let Panel = React.createClass ({

    handleSearchButtonClick: function (e) {
        e.preventDefault();
        let searchExpr = document.getElementById('search_input').value;
        this.props.clearLogsFromViewer();
        this.props.setFilterExpression(searchExpr);
        this.props.getLogs();
    },

    render: function () {
        return (
            <form id="searchForm">
                <button id="search_btn" type="button" onClick={this.handleSearchButtonClick}>Search</button>
                <input id="search_input" type="text" placeholder="Search"/>
                <button id="live_status_btn" type="button" onClick=''>{this.props.liveStatus}</button>
            </form>
        );
    }
});

module.exports = Panel;
