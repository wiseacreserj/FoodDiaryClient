import React, { Component } from 'react';
import { Container, Row, Col,  Button, } from 'react-bootstrap';
import { connect } from "react-redux"
import url from "../config"
import Navigation from "../components/Navigation"
import EditMealModal from "../components/EditMealModal"
import AddMealModal from "../components/AddMealModal"
import { getMeals } from "../actions/mealActions"
import { foodsDefault } from "../actions/foodActions"
import { editMealModalShow, editMealModalHide, addMealModalShow, addMealModalHide } from "../actions/modalActions"
import MealTable from "../components/MealTable"
import moment from "moment"
import MealDateControl from "../components/MealDateControl"
import DietChart from "../components/DietChart"
import { getChartData, chartDefault } from '../actions/chartDataActions';


class DietPage extends Component {
    constructor(props) {
        super(props)
        this.timeButtonHandler = this.timeButtonHandler.bind(this)
        this.handleRadio = this.handleRadio.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    async timeButtonHandler(param) {
        this.dateFrom.value = moment().format("YYYY-MM-DD")
        this.dateFrom.disabled = false
    }
    async handleDelete(){
        
        await fetch(`${url}meal/${this.props.currentMeal.id}`, {
            method: "DELETE",
            credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                }
        }).then(r => r)
        await this.props.getMeals()
        this.props.getChartData()
    }

    async handleRadio(event) {
        await this.props.getMeals(event.target.value)
    }

    async componentWillMount() {
        let rangeFrom = moment().subtract(14, "day").startOf("day").format("YYYY-MM-DD")
        let rangeTo = moment().endOf("day").format("YYYY-MM-DD")
        await this.props.getMeals(rangeFrom, rangeTo)
        await(this.props.getChartData())
    }

    render() {

        return (
            <Container fluid className="page-container">
                <AddMealModal />
                {<EditMealModal />}
                
                <Row>
                    <Col>
                        <Navigation history={this.props.history} />
                    </Col>

                </Row>
                <div className="diet-page-content-wrapper"> 
                <Row >
                    <Col sm={12} lg={12} md={12}>
                    <MealDateControl />
                    </Col>
                </Row>
                <Row>
                    <Col  sm={12} md={12} lg={12} className="meal-btn-group">

                        <Button className="add-edit-meal-btn" onClick={this.props.addMealModalShow} variant="success">Добавить </Button>
                        <Button className="add-edit-meal-btn" onClick={this.props.editMealModalShow} variant="info">Редактировать</Button>
                        <Button className="delete-meal-btn" onClick={this.handleDelete} variant="danger">Удалить </Button>

                    </Col>
                    <Col>

                    </Col>
                </Row>
                <Row>
                    <Col>
                        <MealTable data={this.props.meals}  ></MealTable>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        
                        <DietChart />

                    </Col>
                </Row>
                </div>
            </Container>


        )
    }
}

let mapStateToProps = state => ({
    user: state.user,
    mealTableHead: state.ui.thead.meal,
    foodTableHead: state.ui.thead.food,
    meals: state.data.meal.meals,
    currentMeal: state.ui.modals.data.editModalState.initData,
   
})
let mapDispatchToProps = { getMeals, foodsDefault, editMealModalShow,
                                            editMealModalHide, addMealModalShow, addMealModalHide,
                                             getChartData, chartDefault }

let connectedDietPage = connect(mapStateToProps, mapDispatchToProps)(DietPage)
export default connectedDietPage