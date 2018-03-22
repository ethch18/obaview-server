import React from 'react';
import SearchBar from './controls/SearchBar';
import axios from 'axios';

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            temp: null,
        };
        this.search = this.search.bind(this);
    }

    search(query) {
        axios.get('http://localhost:8080/hello')
            .then(function (response) {
                this.setState({ temp: response });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
        <div>
            <SearchBar searchFunction={this.search} />
            <div>{!!this.state.temp}</div>
        </div>
        );
    }
}
