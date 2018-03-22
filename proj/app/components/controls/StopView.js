import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Spinner from 'react-spinner';
import { ENDPOINTS } from '../../util/Constants';

const propTypes = {
    stopId: PropTypes.string.isRequired,
};

export default class StopView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    componentDidMount() {
        this.refreshName();
        this.refreshArrivals();
    }
    
    refreshName() {
        console.log(`${this.props.stopId} name refresh`);
        axios.get(`${ENDPOINTS['BASE_URL']}${ENDPOINTS['STOP']}${this.props.stopId}`)
            .then((response) => {
                console.log(response);
                if (response.data.code != 200 || !response.data.data) {
                    this.setState({ stopError: response.data.text });
                }
                else {
                    this.setState({ stopName: `${response.data.data.entry.name} (${response.data.data.entry.direction})` })
                }
            })
            .catch((error) => {
                console.log(error);
                this.setState({ stopError: error })
            });
    }

    refreshArrivals() {
        console.log(`${this.props.stopId} arr refresh`);
        axios.get(`${ENDPOINTS['BASE_URL']}${ENDPOINTS['ARRIVALS_DEPARTURES']}${this.props.stopId}`)
        .then((response) => {
            console.log(response);
            if (response.data.code != 200 || !response.data.data) {
                this.setState({ arrError: response.data.text });
            }
            else {
                const arrDep = response.data.data.entry.arrivalsAndDepartures;
                const stopEntries = [];
                let i = 0;
                for (let entry of arrDep) {
                    const shortName = entry.routeShortName;
                    const dest = entry.tripHeadsign;
                    const arrEntity = new Date(entry.scheduledDepartureTime);
                    const arrTime = arrEntity.toLocaleTimeString();
                    const timeDiff = Math.floor((arrEntity - new Date()) / 60000);
                    stopEntries.push(
                        <div key={i}>
                            <div>{`${shortName} - ${dest}`}</div>
                            <div>{`${arrTime} (${timeDiff} min.)`}</div>
                        </div>);
                    i++;
                }
                this.setState({ stopEntries })
            }
        })
        .catch((error) => {
            this.setState({ arrError: error })
        });
    }

    render() {
        let heading;
        if (this.state.stopName) {
            heading = this.state.stopName;
        }
        else if (this.state.stopError) {
            heading = "An error occurred.";
        }
        else {
            heading = "Loading...";
        }

        let content;
        if (this.state.stopEntries) {
            content = this.state.stopEntries;
        }
        else if (this.state.arrError) {
            content = "An error occurred.";
        }
        else {
            content = (
                <div className="stop-spinner">
                    <Spinner />
                </div>
            );
        }

        
        return (
            <div className="stop-wrapper">
                <div className="stop-heading">{heading}</div>
                <div className="stop-content">{content}</div>
            </div>
        );
    }
}

StopView.propTypes = propTypes;
