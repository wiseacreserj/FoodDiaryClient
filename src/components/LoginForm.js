import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Button,  Form, } from 'react-bootstrap';
import {connect} from "react-redux"
import {login} from "../actions/userActions"
 


class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.loginHandler = this.loginHandler.bind(this)
        
        this.state = {
            loginError: false
        }
    }

    async loginHandler(event) {
        event.preventDefault()
        await this.props.login(this.login.value, this.password.value)
        if (this.props.status === "logged_in"){
          
            this.props.history.push("/diet")
        } else if (this.props.status === "rejected") {
            this.loginError.classList.add("alert", "alert-danger")
            this.loginError.innerText = "Неверный логин или пароль!"
        }
    } 

    async componentWillUnmount(){
        this.loginError.innerText = ""
        this.loginError.removeAttribute("class")
    }

    render() {
        return (
            <Container className="login-container">
                <Form.Group as={Row}>
                    <Form.Label column sm={3} md={4} lg={4}>Имя пользователя:</Form.Label>
                    <Col sm={9} md={8} lg={8}>
                    <Form.Control type="text" placeholder="Имя пользователя" ref={c => this.login = c} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column sm={3} md={4} lg={4}>Пароль</Form.Label>
                    <Col sm={9} md={8} lg={8}>
                    <Form.Control type="password" placeholder="Введите пароль" ref={c => this.password = c} />
                    </Col>
                </Form.Group>

                <Button variant="primary" onClick={this.loginHandler}>
                        Войти
                  </Button>
                  <div  role="alert" className="profile-error" ref={c => this.loginError = c}></div>
            </Container>
        )
    }
}
let mapStateToProps = state => ({status: state.user.status})
let mapDispatchToProps = {login}
let connectedLoginForm = connect (mapStateToProps, mapDispatchToProps)(LoginForm) 
export default connectedLoginForm