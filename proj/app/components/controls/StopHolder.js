import React from 'react';
import PropTypes from 'prop-types';
import StopView from './StopView';
import { Col, Container, Row } from 'reactstrap';

const propTypes = {
    stopIds: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default class StopHolder extends React.Component {
    constructor(props) {
        super(props);
        this.views = [];
    }
    
    render() {
        const { stopIds } = this.props;
        const cols = [];
        const views = [];
        for (let i = 0; i < stopIds.length; i++) {
            const currId = stopIds[i];
            const currView = (<StopView stopId={currId} />);
            views.push(currView);
            cols.push(
                <Col 
                    key={currId}    
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                >
                    {currView}
                </Col>
            )
        }
        this.views = views;

        return (
            <Container>
                <Row>
                    {cols}
                </Row>
            </Container>
        );
    }
}

StopHolder.propTypes = propTypes;
