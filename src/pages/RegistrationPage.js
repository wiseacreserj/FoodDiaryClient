import React, { Component } from 'react';
import Navigation from "../components/Navigation";
import { Container, Row, Col,  Form,  Button } from 'react-bootstrap';
import url from "../config"


class RegistrationPage extends Component{
    constructor(props){
        super(props)

        this.validateRegistrationData = this.validateRegistrationData.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

        this.state = {
            isError : false,
            errorMessage: ""
        }
    }


    validateRegistrationData(registrationData ) {
        
        let loginCharArr = registrationData.login.split("")
        let loginIsValid;
       loginCharArr.forEach(char => {
            if (char.charCodeAt() < 48 || char.charCodeAt() > 122 ){
              loginIsValid = false
            } else {loginIsValid = true}            
        })

        if (loginIsValid === false || registrationData.login.length === 0){
            this.setState({
                isError: true,
                errorMessage:"Некорректное имя пользователя"
            })
        } else if (registrationData.password.length < 6){
            this.setState({
                isError: true,
                errorMessage:"Пароль слишком короткий"
            })
        } else  if (registrationData.password !== this.confirmationPassword.value){
            this.setState({
                isError: true,
                errorMessage:"Пароли не совпадают"
            })
        } else  if (registrationData.age.length === 0 || registrationData.age < 5 || registrationData.age > 120 ){
            this.setState({
                isError: true,
                errorMessage:"Некорректное значение возраста"
            })
        } else if (registrationData.weight.length === 0 || registrationData.weight < 20 || registrationData.weight > 300 ){
            this.setState({
                isError: true,
                errorMessage:"Некорректное значение веса"
            })
        }  else if (registrationData.height.length === 0 || registrationData.height < 80 || registrationData.height > 300 ){
            this.setState({
                isError: true,
                errorMessage:"Некорректное значение роста"
            })
        } else {this.setState({
            isError:false,
            errorMessage:""
        })}
    }

    async handleSubmit(){

        let registrationData = {
            login: this.login.value,
                name: "",
                surname: "",
                password: this.password.value,
                gender: this.gender.value, 
                age: this.age.value, 
                weight: this.weight.value,
                height: this.height.value,
                activityLevel: this.activityLevel.value
        }
    
       await this.validateRegistrationData(registrationData)
      if (this.state.isError === false){
        await fetch(`${url}user`, {
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                login: this.login.value,
                name: "",
                surname: "",
                password: this.password.value,
                gender: this.gender.value, 
                age: this.age.value, 
                weight: this.weight.value,
                height: this.height.value,
                activityLevel: this.activityLevel.value

            })
        }).then(response => {
            if (response.status === 404){ 
                this.setState({
                    isError:true,
                    errorMessage: "Пользователь с таким именем уже существует"
                })
            }
        } )
       if (!this.state.isError) {
           this.props.history.push("/login")
       }
    }
            
    }

    render(){
        return(
            <Container fluid className="page-container">
                <Navigation history={this.props.history} />
                <Row className="profile-page-form-wrapper">{
                    <Form className="profile-page-form">
                   <Form.Group as={Row} controlId="formHorizontalUsername">
                    <Form.Label column sm={3} md={4} lg={4}>
                      Имя пользователя
                    </Form.Label>
                    <Col sm={9} md={8} lg={8}>
                      <Form.Control type="text" placeholder="Имя пользователя, только латинские символы и цифры" ref={c => this.login = c} defaultValue={this.props.login} />
                    </Col>
                  </Form.Group>
                
                  <Form.Group as={Row} controlId="formHorizontalPassword">
                    <Form.Label column sm={3} md={4} lg={4}>
                      Пароль
                    </Form.Label>
                    <Col sm={9} md={8} lg={8}>
                      <Form.Control type="password" placeholder="Пароль, минимум 6 символов" ref={c => this.password = c} />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formHorizontalConfirmationPassword">
                    <Form.Label column sm={3} md={4} lg={4}>
                      Подтверждение пароля
                    </Form.Label>
                    <Col sm={9} md={8} lg={8}>
                      <Form.Control type="password" placeholder="Подтвердите пароль" ref={c => this.confirmationPassword = c} />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="formHorizontalGender">
                    <Form.Label column sm={3} md={4} lg={4}>
                      Пол:
                    </Form.Label>
                    <Col sm={9} md={8} lg={8}>
                      <Form.Control as="select"  ref={c => this.gender = c}>
                        <option value="male">Мужской</option>
                        <option value="female" >Женский</option>
                      </Form.Control>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="formHorizontalAge">
                    <Form.Label column sm={3} md={4} lg={4}>
                      Возраст:
                    </Form.Label>
                    <Col sm={9} md={8} lg={8}>
                      <Form.Control type="number" min="5" max="120"  ref={c => this.age = c}  />
                    </Col>
                  </Form.Group>


                  <Form.Group as={Row} controlId="formHorizontalWeight">
                  <Form.Label column sm={3} md={4} lg={4}>
                    Вес, кг:
                  </Form.Label>
                  <Col sm={9} md={8} lg={8}>
                    <Form.Control type="number" min="20" max="300"  ref={c => this.weight = c}/>
                  </Col>
                </Form.Group>

                  
                <Form.Group as={Row} controlId="formHorizontalHeight">
                <Form.Label column sm={3} md={4} lg={4}>
                  Рост, см:
                </Form.Label>
                <Col sm={9} md={8} lg={8}>
                  <Form.Control type="number" min="80" max="300" ref={c => this.height = c}  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formHorizontalActivityLevel">
                  <Form.Label column sm={3} md={4} lg={4}>
                    Уровень физ. активности:
                  </Form.Label>
                  <Col sm={9} md={8} lg={8}>
                    <Form.Control as="select"  ref={c => this.activityLevel = c}>
                        <option value="1">1 - минимальная нагрузка(сидячая работа) </option> 
                        <option value="2">2 - легкие тренировки 1-3 раза в неделю </option> 
                        <option value="3">3 - тренировки 4-5 раз в неделю </option> 
                        <option value="4">4 - интенсивные тренировки 4-5 раз в неделю </option> 
                        <option value="5">5 - ежедневные тренировки </option> 
                        <option value="6">6 - ежедневные интенсивные тренировки </option> 
                        <option value="7">7 - интенсивные тренировки 2 раза в день </option> 
                    </Form.Control>
                  </Col>
                </Form.Group>

                    <Button variant="primary" onClick={this.handleSubmit}> Зарегистрироваться</Button>
                    { this.state.isError === true ?
                      (<div role="alert" className="alert alert-danger profile-error" ref={c => this.loginError = c}> {this.state.errorMessage}</div>)
                       : null
                 } 
                 { this.state.isSuccess === true ?
                     (<div role="alert" className="alert alert-success profile-succes"  ref={c => this.profileUpdateMessage = c}> {this.state.successMessage}</div>)
                      : null
                } 
                  
                </Form>}
                </Row>
            </Container>
        )
    }
}

export default RegistrationPage