import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import Spinner from 'react-spinner';

const propTypes = {
    input: PropTypes.string.isRequired,
    updater: PropTypes.func.isRequired,
    closer: PropTypes.func.isRequired,
};

export default class SearchModal extends React.Component {
    constructor(props) {
        super(props);
        // TODO: fancy logic for converting route no. to route id
        console.log("new modal")
        this.state = {
            routeId: this.props.input,
        };
    }

    render() {
        let content;
        if (this.state.data) {
            content = <div>DATA</div>;
        }
        else {
            content = <Spinner />;
        }

        return (
            <div>
                <Modal isOpen className={"show"} toggle={this.props.closer}>
                        <ModalHeader toggle={this.props.closer}>
                            Search Results
                        </ModalHeader>
                        <ModalBody>
                            {content}
                        </ModalBody>
                </Modal>
            </div>
        );
    }
}

SearchModal.propTypes = propTypes;
