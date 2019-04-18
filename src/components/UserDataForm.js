import React, { Component } from 'react';
import Navigation from "../components/Navigation";
import { Container, Row, Col, Tabs, Tab, Form, FormControl, Button } from 'react-bootstrap';


class UserDataForm extends Component {
    constructor(props){
        super(props)

    }

    render(){
        return(
            <Form>
            <Form.Group as={Row} controlId="formHorizontalUsername">
             <Form.Label column sm={2}>
               Имя пользователя
             </Form.Label>
             <Col sm={10}>
               <Form.Control type="text" placeholder="Имя пользователя" ref={c => this.login = c} defaultValue={this.props.login} />
             </Col>
           </Form.Group>
         
           <Form.Group as={Row} controlId="formHorizontalPassword">
             <Form.Label column sm={2}>
               Пароль
             </Form.Label>
             <Col sm={10}>
               <Form.Control type="password" placeholder="Пароль" ref={c => this.password = c} defaultValue={this.props.password} />
             </Col>
           </Form.Group>
           <Form.Group as={Row} controlId="formHorizontalConfirmationPassword">
             <Form.Label column sm={2}>
               Подтверждение пароля
             </Form.Label>
             <Col sm={10}>
               <Form.Control type="password" placeholder="Подтвердите пароль" ref={c => this.confirmationPassword = c} defaultValue={this.props.confirmationPassword} />
             </Col>
           </Form.Group>

           <Form.Group as={Row} controlId="formHorizontalGender">
             <Form.Label column sm={2}>
               Пол:
             </Form.Label>
             <Col sm={10}>
               <Form.Control as="select"  ref={c => this.gender = c} defaultValue={this.props.gender}>
                 <option value="male" >Мужской</option>
                 <option  value="female">Женский</option>
               </Form.Control>
             </Col>
           </Form.Group>

           <Form.Group as={Row} controlId="formHorizontalAge" >
             <Form.Label column sm={2}>
               Возраст:
             </Form.Label>
             <Col sm={10}>
               <Form.Control type="number" min="5" max="120"  ref={c => this.age = c} defaultValue={this.props.age} />
             </Col>
           </Form.Group>


           <Form.Group as={Row} controlId="formHorizontalWeight">
           <Form.Label column sm={2}>
             Вес, кг:
           </Form.Label>
           <Col sm={10}>
             <Form.Control type="number" min="20" max="300"  ref={c => this.weight = c} defaultValue={this.props.weight}/>
           </Col>
         </Form.Group>

           
         <Form.Group as={Row} controlId="formHorizontalHeight">
         <Form.Label column sm={2}>
           Рост, см:
         </Form.Label>
         <Col sm={10}>
           <Form.Control type="number" min="80" max="300" ref={c => this.height = c} defaultValue={this.props.height}  />
         </Col>
       </Form.Group>

       <Form.Group as={Row} controlId="formHorizontalActivityLevel">
           <Form.Label column sm={2}>
             Уровень физ. активности:
           </Form.Label>
           <Col sm={10}>
             <Form.Control as="select"  ref={c => this.activityLevel = c} defaultValue={this.props.activityLevel}>
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
             

           
             </Form>
        )
    }
}

export default UserDataForm