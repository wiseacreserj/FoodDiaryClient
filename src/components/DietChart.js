import React, { Component } from 'react';

import { connect } from "react-redux"
import {getChartData, chartDefault} from "../actions/chartDataActions"
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


let intervalId

class DietChart extends Component {
    constructor(props){
        super(props)

        this.state = {
            options:{
                title: {
                    text: 'Калории и БЖУ'
                },
                xAxis: [{
                    categories:this.props.chartData.map((data) => data.date).reverse(),
                    crosshair: true
                }],
                yAxis: [{
                    labels: {
                        format: '{value} кал.'
                    },
                    title: {
                        text: 'Калории'
                    }
                },
                {
                    labels:{
                        format:'{value} г.'
                    },
                    title: {
                        text: 'БЖУ'
                    },
                    opposite: true
                },
                
            
                ],
                series: [
                    {
                        name:"Калории",
                        type: "spline",
                        yAxis: 0,
                        data: this.props.chartData.map((data) => data.calories).reverse()
                    },
                    {
                        name:"Норма калорий",
                        color: '#FF0040',
                        type: "spline",
                        yAxis: 0,
                        dashStyle: "shortdot",
                        marker:{
                            enabled: false,
                        },
                        data: this.props.chartData.map((data) => data.caloriesNorm)
                    },
                    {
                        name:"Белки",
                        color: '#02FB6D',
                        type: "spline",
                        yAxis: 1,
                        data:this.props.chartData.map((data) => data.protein).reverse()
                    },
                    {
                        name:"Жиры",
                        color:"#F4F40D",
                        type: "spline",
                        yAxis: 1,
                        data: this.props.chartData.map((data) => data.fat).reverse()
                    },
                    {
                        name:"Углеводы",
                        color:"#857B7B",
                        type: "spline",
                        yAxis: 1,
                        data: this.props.chartData.map((data) => data.carbohydrate).reverse()
                    }
                ]
            }
        }

    }

    
  
   async componentWillMount(){ 
       intervalId =  setInterval( () =>{
            this.setState({
                options: {
                    xAxis:{
                        categories:this.props.chartData.map((data) => data.date).reverse()
                    },
                    series: [
                        {
                            data: this.props.chartData.map((data) => data.calories).reverse()
                        },
                        {
                            data: this.props.chartData.map((data) => data.caloriesNorm)
                        },
                        {
                            data: this.props.chartData.map((data) => data.protein).reverse()
                        },
                        {
                            data: this.props.chartData.map((data) => data.fat).reverse()
                        },
                        {
                            data: this.props.chartData.map((data) => data.carbohydrate).reverse()
                        },
    
                    ]
                } 
            })
        } , 3000)
       
        
    }

    async componentWillUnmount(){
        clearInterval(intervalId)
    }

    render(){
        
        return(
            <HighchartsReact highcharts={Highcharts} options={this.state.options} />
        )
    }
}

let mapStateToProps = state => ({chartData: state.data.chart.data})
let mapDispatchToProps = {getChartData, chartDefault}
let ConnectedDietChart = connect(mapStateToProps, mapDispatchToProps)(DietChart)
export default ConnectedDietChart