import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormControl } from 'react-bootstrap';

const propTypes = {
    searchFunction: PropTypes.func.isRequired,
};

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
        };
        this.updateQuery = this.updateQuery.bind(this) 
    }

    updateQuery(event) {
        this.setState({ query: event.target.value })
    }

    render() {
        return (
            <div className="searchbar-wrap">
                <FormControl
                    type="text"
                    placeholder="Search..."
                    onChange={this.updateQuery}
                    className="searchbar-input searchbar-content"
                />
                <div className="searchbar-button-outer searchbar-content">
                    <Button 
                        className="searchbar-button-inner icon fa fa-2x fa-search"
                        onClick={() => this.props.searchFunction(this.state.query)}
                    />
                </div>
            </div>
        );
    }
}

SearchBar.propTypes = propTypes;
