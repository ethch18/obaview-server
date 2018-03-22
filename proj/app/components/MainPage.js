import React from 'react';
import SearchBar from './controls/SearchBar';
import StopHolder from './controls/StopHolder';
import axios from 'axios';

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            temp: null,
            stopIds: ['1_29700', '1_29720', '1_29865', '1_75407', '1_29660'],
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
            <StopHolder stopIds={this.state.stopIds} />
            <div>{this.state.temp}</div>
        </div>
        );
    }
}
