import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn,  SearchField } from 'react-bootstrap-table'
import { getDate } from "../utils/utils"
import FoodTable from "./FoodTable"
import { foodsDefault, foodsResolved } from "../actions/foodActions"
import { initEditMealModal } from "../actions/modalDataActions"
import { connect } from "react-redux"


class MealTable extends Component {
    constructor(props) {
        super(props)
        this.handleRowSelect = this.handleRowSelect.bind(this)
        this.onRowClick = this.onRowClick.bind(this)
        this.onRowDoubleClick = this.onRowDoubleClick.bind(this)
        this.state = {
            expanding: []
        }
    }

      createCustomSearchField = (props) => {
        return (
          <SearchField
           className="meal-table-seach-field"
            placeholder={ "Поиск"}/>
        );
      }

    expandComponent(row) {
        return <FoodTable data={row.food}></FoodTable>
    }


    onRowClick(row) {
        this.props.initEditMealModal(row)
    }

    onRowDoubleClick(row) {
        if (this.state.expanding.includes(row.index)) {
            this.setState({
                expanding: []
            })
        } else {
            this.setState({
                expanding: [row.index]
            })
        }


    }

    handleRowSelect(row, isSelected, e) {
        
        this.props.foodsResolved(row.food)
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

        const modifiedData = this.props.data.map((meal, index) => {
            let modifiedMeal = {
                ...meal,
                proteinReceived: Math.round(meal.proteinReceived * 100) / 100,
                fatReceived: Math.round(meal.fatReceived * 100) / 100,
                carbohydrateReceived: Math.round(meal.carbohydrateReceived * 100) / 100,
                caloriesReceived: Math.round(meal.caloriesReceived * 100) / 100,
                createdAt: (getDate)(meal.createdAt),
                index: index + 1
            }
            return modifiedMeal
        })

        const options = {
            expandRowBgColor: "#F8E6E0",
            onRowClick: this.onRowClick,
            onRowDoubleClick: this.onRowDoubleClick,
            expanding: this.state.expanding,
            searchPosition: "left",
            searchField: this.createCustomSearchField

        }
        return (
            <BootstrapTable data={modifiedData} version="4" selectRow={selectRowProp} options={options}
                expandableRow={() => { return true }}
                expandComponent={this.expandComponent}
                hover
                condensed
                search={true}
                multiColumnSearch={true}
                pagination


            >
                <TableHeaderColumn isKey dataField="index" width="5%" dataAlign="center">№</TableHeaderColumn>
                <TableHeaderColumn dataField="name" width="150px" dataAlign="center">Имя</TableHeaderColumn>
                <TableHeaderColumn dataField="proteinReceived" width="10%" dataAlign="center">Белки, г.</TableHeaderColumn>
                <TableHeaderColumn dataField="fatReceived" width="10%" dataAlign="center">Жиры, г.</TableHeaderColumn>
                <TableHeaderColumn dataField="carbohydrateReceived" width="10%" dataAlign="center">Углеводы, г.</TableHeaderColumn>
                <TableHeaderColumn dataField="caloriesReceived" width="10%" dataAlign="center">Калории</TableHeaderColumn>
                <TableHeaderColumn dataField="createdAt" width="150px" dataAlign="center">Дата</TableHeaderColumn>
            </BootstrapTable>
        )
    }

}

let mapStateToProps = state => ({})
let mapDispatchToProps = ({ foodsDefault, foodsResolved, initEditMealModal })
let ConnectedMealTable = connect(mapStateToProps, mapDispatchToProps)(MealTable)
export default ConnectedMealTable