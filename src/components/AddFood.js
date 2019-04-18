import React, { Component } from 'react';
import { Button, ButtonToolbar, Badge, Container, Form, FormGroup, FormControl } from 'react-bootstrap';
import { Router, Route, Link, Switch } from 'react-router-dom';



class AddFood extends Component {
    constructor() {
        super()
        this.addFoodHandler = this.addFoodHandler.bind(this)
    }

    async addFoodHandler(event) {
        event.preventDefault()
        await fetch("http://localhost:4000/food", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: this.name.value,
                description: this.description.value,
                calories: this.calories.value,
                protein: this.protein.value,
                fat: this.fat.value,
                carbohydrate: this.carbohydrate.value
            })
        }).then(r => r.json())
    }
   
    render() {
        return (
            <Container>

                <Form>

                    <Form.Group controlId="formAddFoodName">
                        <Form.Label>Наименование продукта</Form.Label>
                        <Form.Control type="text" placeholder="Наименование продукта" ref={ref => this.name = ref} />
                    </Form.Group>

                    <Form.Group controlId="formAddFoodDescription">
                        <Form.Label>Описание продукта</Form.Label>
                        <Form.Control type="text" placeholder="Описание продукта" ref={c => this.description = c} />
                    </Form.Group>

                    <Form.Group controlId="formAddFoodCalories">
                        <Form.Label>Калорийность продукта</Form.Label>
                        <Form.Control type="text" placeholder="Калорийность продукта" ref={c => this.calories = c} />
                    </Form.Group>

                    <Form.Group controlId="formAddFoodProtein">
                        <Form.Label>Количество белка</Form.Label>
                        <Form.Control type="text" placeholder="количество белка" ref={c => this.protein = c} />
                    </Form.Group>

                    <Form.Group controlId="formAddFoodName">
                        <Form.Label>Количество жиров</Form.Label>
                        <Form.Control type="text" placeholder="количество жиров" ref={c => this.fat = c} />
                    </Form.Group>
                    
                    <Form.Group controlId="formAddFoodName">
                        <Form.Label>Количество углеводов</Form.Label>
                        <Form.Control type="text" placeholder="Количество углеводов" ref={c => this.carbohydrate = c} />
                    </Form.Group>

                    <Button variant="primary" onClick={this.addFoodHandler}>
                        Submit
                  </Button>

                </Form>

            </Container>
        )
    }
}

export default AddFood