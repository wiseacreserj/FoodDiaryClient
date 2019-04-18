import React, { Component } from 'react';
import { connect } from "react-redux"
import { LinkContainer } from "react-router-bootstrap";
import {  Row, Col, Navbar, Nav } from 'react-bootstrap';
import NavLink from 'react-bootstrap/NavLink';
import {setNavAdmin, setNavUser, setNavDefault} from "../actions/navActions"
import {logout} from "../actions/userActions"


class Navigation extends Component {
    constructor(props) {
        super(props)
        this.logoutHandler = this.logoutHandler.bind(this)
    }

    async logoutHandler(event){
        event.preventDefault()
        await this.props.logout()
    }

    render() {

        return (

            <Row>
                <Col>
                    <Navbar bg="dark" variant="dark" sticky="top">
                        <Nav className="mr-auto">
                            {this.props.nav.map((elem, index) => 
                                <LinkContainer key={index} exact to={elem.to} >
                                    <NavLink>
                                        {elem.text}
                                    </NavLink>
                                </LinkContainer>
                            )}
                            {this.props.userStatus === "logged_in" ? (
                                <NavLink onClick={this.logoutHandler}>
                                        Выйти
                                    </NavLink>
                            ) : null }
                            
                        </Nav>
                    </Navbar>
                </Col>
            </Row>

        );
    }
}

let mapStateToProps = state => ({ userStatus: state.user.status, nav: state.ui.nav})
let mapDispatchToProps = {setNavAdmin, setNavDefault, setNavUser, logout}
let ConnectedNavigation =  connect(mapStateToProps, mapDispatchToProps)(Navigation)
export default ConnectedNavigation