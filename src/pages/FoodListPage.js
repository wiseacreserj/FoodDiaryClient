import React, { Component } from 'react';
import { Container, Row, Col,  Form } from 'react-bootstrap';
import { connect } from "react-redux"
import { getFoodListData, foodListDefault } from "../actions/foodListActions"
import { BootstrapTable, TableHeaderColumn, SearchField } from 'react-bootstrap-table'
import Navigation from "../components/Navigation"
import url from "../config"

class FoodListPage extends Component {
    constructor(props) {
        super(props)

        this.handleSortFilterInput = this.handleSortFilterInput.bind(this)
        this.state = {
            foodCategoryList: []
        }
    }

    async componentWillMount() {
        await this.props.getFoodListData()
        let categoryList = await fetch(`${url}category`).then(r => r.json()).then(arr => arr.map((category) => category.category))
        this.setState({
            foodCategoryList: categoryList
        })
        
    }

    createCustomSearchField = (props) => {
        return (
            <SearchField
                className="seach-food-list"
                placeholder={"Поиск"} />
        );
    }

    async handleSortFilterInput(){
        await this.props.getFoodListData(this.category.value, this.foodSort.value)
    }
    render() {

        const selectRowProp = {
            mode: 'radio',
            bgColor: '#A9E2F3',

            hideSelectColumn: true,
            clickToSelect: true,
            clickToExpand: false,
            onSelect: this.handleRowSelect,

        };

        const options = {
            expandRowBgColor: "#F8E6E0",
            onRowClick: this.onRowClick,
            onRowDoubleClick: this.onRowDoubleClick,
            searchPosition: "left",
            searchField: this.createCustomSearchField
        }
        
        return (
            <Container fluid className="page-container">
                <Navigation history={this.props.history} />

                <div className="food-list-content-wrapper">

                    <Form className="food-list-form">
                        <Form.Group as={Row} className="food-list-form-category">
                            <Form.Label column sm={3} md={4} lg={4}>
                                Категория:
                             </Form.Label>
                            <Col sm={9} md={8} lg={8}>
                                <Form.Control as="select"  ref={c => this.category = c} onChange={this.handleSortFilterInput}>
                                    <option value="all">Все </option>
                                    {this.state.foodCategoryList.map((category, index) => {
                                        return (<option key={index} value={category}>{category}</option>)
                                    })}
                                </Form.Control>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="food-list-form-sort">
                            <Form.Label column sm={4} md={4} lg={4}>
                               Сортировать по:
                             </Form.Label>
                            <Col sm={8} md={8} lg={8}>
                                <Form.Control as="select" ref={c => this.foodSort = c} onChange={this.handleSortFilterInput}>
                                    <option value="name">Имя</option> 
                                    <option value="protein">Содержание белка </option> 
                                    <option value="fat">Содержание жиров </option> 
                                    <option value="carbohydrate">Содержание углеводов </option> 
                                    <option value="calories">Калорийность</option> 
                                    <option value="category">Категория </option> 
                                </Form.Control>
                            </Col>
                        </Form.Group>
                    </Form>


                    <BootstrapTable data={this.props.foodList} version="4" selectRow={selectRowProp} options={options}
                        hover
                        condensed
                        search={true}
                        multiColumnSearch={true}
                        pagination
                    >

                        <TableHeaderColumn isKey dataField="name" width="150px" dataAlign="center" columnTitle>Имя</TableHeaderColumn>
                        <TableHeaderColumn dataField="protein" width="10%" dataAlign="center">Белки, г.</TableHeaderColumn>
                        <TableHeaderColumn dataField="fat" width="10%" dataAlign="center">Жиры, г.</TableHeaderColumn>
                        <TableHeaderColumn dataField="carbohydrate" width="10%" dataAlign="center">Углеводы, г.</TableHeaderColumn>
                        <TableHeaderColumn dataField="calories" width="10%" dataAlign="center">Калории</TableHeaderColumn>
                        <TableHeaderColumn dataField="category" width="150px" dataAlign="center">Категория</TableHeaderColumn>
                    </BootstrapTable>
                     <div className="food-list-disclaimer"><p>* Данные на 100г. продукта</p></div>
                </div>
            </Container>
        )
    }
}

let mapStateToProps = state => ({ foodList: state.data.foodList.foodList })
let mapDispatchToProps = { getFoodListData, foodListDefault }
let ConnnectedFoodListPage = connect(mapStateToProps, mapDispatchToProps)(FoodListPage)
export default ConnnectedFoodListPage