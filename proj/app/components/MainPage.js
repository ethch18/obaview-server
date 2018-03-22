import React from 'react';
import SearchBar from './controls/SearchBar';
import StopHolder from './controls/StopHolder';
import SearchModal from './controls/SearchModal';
import axios from 'axios';

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
        const stopIds = ['1_29700', '1_29720', '1_29865', '1_75407', '1_29660'];
        const stopSet = new Set(stopIds);
        this.state = {
            temp: null,
            stopIds,
            stopSet,
        };
        this.search = this.search.bind(this);
        this.appendStop = this.appendStop.bind(this);
        this.clearModal = this.clearModal.bind(this);
        this.updateTemp = this.updateTemp.bind(this);
    }

    appendStop(stopId) {
        if (!this.state.stopIds) {
            this.setState({ stopIds: [stopId] });
        }
        else {
            if (!this.state.stopSet.has(stopId)) {
                this.state.stopIds.push(stopId);
                this.state.stopSet.add(stopId);
            }
            
        }
        this.clearModal();
    }

    clearModal() {
        this.setState({ currQuery: undefined });
    }

    updateTemp(response) {
        this.setState({ temp: JSON.stringify(response.data.data) });
        console.log(response);
    }

    search(query) {
        this.setState({ currQuery: query });
        axios.get('http://localhost:8080/stops-for-route/1_100224')
            .then(this.updateTemp)
            .catch((error) => console.log(error));
    }

    render() {
        return (
        <div>
            <SearchBar searchFunction={this.search} />
            <StopHolder stopIds={this.state.stopIds} />
            {/* <div>{this.state.temp}</div> */}
            {!!this.state.currQuery && 
                <SearchModal input={this.state.currQuery} updater={this.appendStop} closer={this.clearModal} />
            }
        </div>
        );
    }
}
