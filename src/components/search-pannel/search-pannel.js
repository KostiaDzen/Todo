import React from "react";

import './search-pannel.css';

export default class SearchPannel extends React.Component {

    state = {
        tern: ''
    };

    onSearchChange = (e) => {
        const term = e.target.value;
        this.setState({ term });
        this.props.onSearchChange(term);
    }

    render () {
    return <input type="text"
                className="search-pannel form-control" 
                placeholder='search'
                value={this.state.term}
                onChange={this.onSearchChange}/>;
    }
};
