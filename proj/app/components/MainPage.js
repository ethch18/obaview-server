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
        this.updateTemp = this.updateTemp.bind(this);
    }

    updateTemp(response) {
        this.setState({ temp: JSON.stringify(response.data.data) });
        console.log(response);
    }

    search(query) {
        axios.get('http://localhost:8080/stops-for-route/1_100224')
            .then(this.updateTemp)
            .catch((error) => console.log(error));
    }

    render() {
        return (
        <div>
            <SearchBar searchFunction={this.search} />
            <div>{this.state.temp}</div>
        </div>
        );
    }
}
