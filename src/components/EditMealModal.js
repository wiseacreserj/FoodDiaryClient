import React, { Component } from 'react';
import { Modal, Button, Form, ListGroup } from 'react-bootstrap';
import { connect } from "react-redux"
import { editMealModalHide } from "../actions/modalActions"
import { getMeals } from "../actions/mealActions"
import { getChartData } from "../actions/chartDataActions"
import url from "../config"


class EditMealModal extends Component {
    constructor(props) {
        super(props)
        this.handleClose = this.handleClose.bind(this)
        this.deleteFoodHandler = this.deleteFoodHandler.bind(this)
        this.setStateToDefault = this.setStateToDefault.bind(this)
        this.getFoodListByCategory = this.getFoodListByCategory.bind(this)
        this.foodCategorySelectHandler = this.foodCategorySelectHandler.bind(this)
        this.addFoodHandler = this.addFoodHandler.bind(this)
        this.handleSave = this.handleSave.bind(this)

        this.state = {
            isError: false,
            errorMessage: "",
            category: [],
            foodList: [],
            addedFoodList: this.props.initData.food.map((food, index) => { return food }),
            selectedFoodItemIndex: 0
        }


    }

    async setStateToDefault() {
        this.setState({
            category: await fetch(`${url}category`).then(r => r.json()).then(arr => arr.map((category) => category.category)),
            foodList: [],
            addedFoodList: this.props.initData.food.map((food, index) => { return { foodId: food.id, name: food.name, portion: food.meal_food.portion } }),
            selectedFoodItemIndex: 0
        })
        this.getFoodListByCategory()
        let cat = await fetch(`${url}category`).then(r => r.json()).then(arr => arr.map((category) => category.category))

    }

    async foodCategorySelectHandler() {
        let foodList = await fetch(`${url}foods`, {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ category: this.foodCategory.value })
        }).then(r => r.json())

        await this.setState({ ...this.state, foodList: foodList })

    }

    async getFoodListByCategory() {
        let foodList = await fetch(`${url}foods`, {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ category: this.state.category[0] })
        }).then(r => r.json())
        await this.setState({ ...this.state, foodList: foodList })
    }

    async handleClose() {
        await this.setStateToDefault()
        this.getFoodListByCategory()
        await this.props.editMealModalHide()

    }

    async deleteFoodHandler() {
       
        await this.setState({
            addedFoodList: this.state.addedFoodList.filter((food, index) => index !== this.state.selectedFoodItemIndex)
        })
        this.portion.value = ""
       
    }

    async addFoodHandler() {
        let arr = this.state.addedFoodList.filter((food, index) =>
            food.foodId === this.state.foodList[this.foodItem.value].id
        )
        if (arr.length > 0) {
            this.setState({
                isError: true,
                errorMessage: "Дубли продуктов не допускаются"
            })
        } else if ((this.portion.value < 0)) {
            this.setState({
                isError: true,
                errorMessage: "Размер порции не может быть отрицательным"
            })
        }
        else {
            this.setState({
                ...this.state,
                isError: false,
                addedFoodList: [
                    ...this.state.addedFoodList,
                    {
                        foodId: this.state.foodList[this.foodItem.value].id,
                        name: this.state.foodList[this.foodItem.value].name,
                        portion: this.portion.value
                    }
                ]
            })
        }
    }

    async handleSave() {

        let id = this.props.initData.id
        let oldFoods = this.props.initData.food.map((foodItem, index) => foodItem.id)

        

        await fetch(`${url}${id}`, {
            method: "POST",
            credentials: 'include',
            headers: {

                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                meal: { name: this.mealName.value },
                foods: this.state.addedFoodList.map((food, index) => {
                    return { foodId: food.foodId, portion: food.portion }
                }),
                oldFoods: oldFoods,

            })
        }).then(r => r)
        await this.props.getMeals()
        await this.props.getChartData()
        await this.setStateToDefault()
        this.props.editMealModalHide()
    }

    async componentWillMount() {
        await this.setStateToDefault()
        await this.getFoodListByCategory()
    }

    render() {

        return (
            <Modal show={this.props.show} onHide={this.handleClose} onShow={this.setStateToDefault} >

                <Modal.Header closeButton>
                    <Modal.Title>
                        Редактировать прием пищи
                     </Modal.Title>

                </Modal.Header>

                <Modal.Body>


                    {this.state.isError === true ?
                        (<div role="alert" className="alert alert-danger" ref={c => this.editMealError = c}> {this.state.errorMessage}</div>)
                        : null
                    }
                    <Form>

                        <Form.Group>
                            <Form.Label >Укажите название прием пищи</Form.Label>
                            <Form.Control type="text" placeholder="Название приема пищи" ref={c => this.mealName = c} defaultValue={this.props.initData.name} />
                        </Form.Group>
                        
                        <Form.Group>
                            <Form.Label >Выберите категорию продуктов питания</Form.Label>
                            <Form.Control as="select" ref={c => this.foodCategory = c} onChange={this.foodCategorySelectHandler}>
                                {this.state.category.map((category, index) => {
                                    return <option key={index}>{category}</option>
                                })}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group>

                            <Form.Label>Выберите продукт </Form.Label>
                            <Form.Control as="select" ref={c => this.foodItem = c}>
                                {this.state.foodList.map((food, index) => {
                                    return <option key={index} value={index}>{food.name} </option>
                                })}
                            </Form.Control>

                            <Form.Label>Размер порции, г.</Form.Label>
                            <Form.Control type="number" ref={c => this.portion = c} />

                        </Form.Group>

                    </Form>
                    <ListGroup defaultActiveKey="0">
                        {this.state.addedFoodList.map((food, index) => {
                            return <ListGroup.Item
                                variant="success"
                                onClick={() => {
                                   
                                    this.setState({ selectedFoodItemIndex: index })

                                }}
                                key={index} action  >
                                {`${index + 1}.  ${food.name} Размер порции:${food.portion}г.`}

                            </ListGroup.Item>
                        })}
                    </ListGroup>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={this.handleClose}>Закрыть</Button>
                    <Button onClick={this.addFoodHandler}>Добавить</Button>
                    <Button onClick={this.deleteFoodHandler}>Удалить</Button>
                    <Button onClick={this.handleSave}>Сохранить</Button>
                </Modal.Footer>

            </Modal>
        )
    }
}

let mapStateToProps = state => ({
    show: state.ui.modals.status.modal.editMealModal,
    initData: state.ui.modals.data.editModalState.initData
})
let mapDispatchToProps = { editMealModalHide, getMeals, getChartData }
let ConnectedEditMealModal = connect(mapStateToProps, mapDispatchToProps)(EditMealModal)


export default ConnectedEditMealModal

