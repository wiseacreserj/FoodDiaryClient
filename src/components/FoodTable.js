import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { getCalories, getProtein, getFat, getCarbohydrate } from "../utils/foodUtils"

class FoodTable extends Component {
    

    
    render() {

        const options = {
            onRowClick: this.onRowClick,
            
        }
        const modifiedData = this.props.data.map((food, index) => {
            let modifiedFood = {
                ...food,
                portion: food.meal_food.portion,
                index: index + 1,
                protein: Math.round((getProtein)(food.protein, food.meal_food.portion) * 100) / 100 ,
                fat: Math.round((getFat)(food.fat, food.meal_food.portion) * 100) / 100 ,
                carbohydrate: Math.round((getCarbohydrate)(food.carbohydrate, food.meal_food.portion) * 100) / 100 ,
                calories: Math.round((getCalories)(food.calories, food.meal_food.portion) * 100) / 100 
            }
            return modifiedFood
        })
        

        return (
            <BootstrapTable data={modifiedData} options={options} >
                <TableHeaderColumn isKey dataField="index" width="50px" dataAlign="center" >№</TableHeaderColumn>
                <TableHeaderColumn dataField="name" width="20%" dataAlign="center">Название продукта</TableHeaderColumn>
                <TableHeaderColumn dataField="protein" width="10%" dataAlign="center">Белки, г.</TableHeaderColumn>
                <TableHeaderColumn dataField="fat" width="10%" dataAlign="center">Жиры, г.</TableHeaderColumn>
                <TableHeaderColumn dataField="carbohydrate" width="10%" dataAlign="center">Углеводы, г.</TableHeaderColumn>
                <TableHeaderColumn dataField="calories" width="10%" dataAlign="center">Калории</TableHeaderColumn>
                <TableHeaderColumn dataField="portion" width="10%" dataAlign="center">Порция, г.</TableHeaderColumn>
            </BootstrapTable>
        )
    }
}

export default FoodTable