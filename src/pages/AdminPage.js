import React, { Component } from 'react';
import Navigation from "../components/Navigation"
import { Router, Route, Link, Switch } from 'react-router-dom';
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';


import AddFood from "../components/AddFood";


class AdminPage extends Component {
    render() {
        return (
            <Container>
                <Navigation history={this.props.history} />
                <Row>

                    <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                        <Tab eventKey="dietTab" title="Питание">

                        </Tab>
                        
                        <Tab eventKey="fittnesTab" title="Тренировки">

                        </Tab>

                    </Tabs>
                </Row>

            </Container>
        )
    }
}

export default AdminPage