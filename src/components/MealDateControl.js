import React, { Component } from 'react';
import {  Row,  Button, Form, ButtonGroup } from 'react-bootstrap';
import { connect } from "react-redux"
import { getMeals } from "../actions/mealActions"
import moment from "moment/moment"

import "../App.css"


class MealDateControl extends Component {
    constructor(props) {
        super(props)

        this.byDayButtonHandler = this.byDayButtonHandler.bind(this)
        this.byWeekButtonHandler = this.byWeekButtonHandler.bind(this)
        this.byMonthButtonHandler = this.byMonthButtonHandler.bind(this)
        this.byAllTimeButtonHandler = this.byAllTimeButtonHandler.bind(this)
        this.getMealsByDate = this.getMealsByDate.bind(this)
    }


    byDayButtonHandler() {
        this.mealDateFrom.value = moment().startOf("day").format("YYYY-MM-DD")
        this.mealDateTo.value = moment().endOf("day").format("YYYY-MM-DD")
        this.getMealsByDate()
    }

    byWeekButtonHandler() {
        this.mealDateFrom.value = moment().subtract(7, "day").startOf("day").format("YYYY-MM-DD")
        this.mealDateTo.value = moment().endOf("day").format("YYYY-MM-DD")
        this.getMealsByDate()
    }

    byMonthButtonHandler() {
        this.mealDateFrom.value = moment().subtract(30, "day").startOf("day").format("YYYY-MM-DD")
        this.mealDateTo.value = moment().endOf("day").format("YYYY-MM-DD")
        this.getMealsByDate()

    }

    byAllTimeButtonHandler(){
        this.props.getMeals()
    }

    getMealsByDate() {
   
        let rangeFrom = this.mealDateFrom.value
        let rangeTo = this.mealDateTo.value
        if (rangeTo < rangeFrom) {
            this.dateError.classList.add("alert", "alert-danger")
            this.dateError.innerText = "Некорректно указан временной диапазон!"
        } else {
            this.dateError.removeAttribute("class")
            this.dateError.innerText = ""
            this.props.getMeals(rangeFrom, rangeTo)
        }

        this.props.getMeals(rangeFrom, rangeTo)
    }
    render() {
        return (
            
            <Row className="meal-date-control-wrapper">
            <Form  className="meal-date-control-form">

                <Form.Group>
                    <Form.Label  style={{paddingRight: "15px"}}> Отобразить за:</Form.Label>
                    <ButtonGroup>
                        <Button size="sm" variant="secondary" onClick={this.byDayButtonHandler}>Сегодня</Button>
                        <Button size="sm" variant="secondary" onClick={this.byWeekButtonHandler}>7 дней</Button>
                        <Button size="sm" variant="secondary" onClick={this.byMonthButtonHandler}>30 дней</Button>
                        <Button size="sm" variant="secondary" onClick={this.byAllTimeButtonHandler}>Все</Button>
                    </ButtonGroup>
                </Form.Group>

                <Form.Group className="range-date-control">

                    <Form.Label style={{paddingRight: "15px"}}>Период c </Form.Label>

                    <Form.Control
                        className="w-25"
                        type="date"
                        ref={c => this.mealDateFrom = c}
                        defaultValue={moment().format("YYYY-MM-DD")}
                        onChange={this.getMealsByDate}
                    />

                    <Form.Label  style={{paddingRight: "15px", paddingLeft: "15px"}}>по</Form.Label>

                    <Form.Control
                        className="w-25"
                        type="date"
                        ref={c => this.mealDateTo = c}
                        defaultValue={moment().format("YYYY-MM-DD")}
                        onChange={this.getMealsByDate}
                    />

                </Form.Group>
                <div  role="alert" ref={c => this.dateError = c}></div>

            </Form>

</Row>
        )
    }
}

let mapStateToProps = state => ({})
let mapDispatchToProps = { getMeals }
let ConnectedMealDateControl = connect(mapStateToProps, mapDispatchToProps)(MealDateControl)
export default ConnectedMealDateControl