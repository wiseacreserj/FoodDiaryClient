const chartDataReducer  = (state, action) => {
    if (state === undefined || action.type === "CHART_DEFAULT" ) 
        return {data: [{}], status: "DEFAULT"}
    if (action.type === "CHART_DATA_PENDING" )
        return {data:state.chart, status: "PENDING"}
    if (action.type === "CHART_DATA_RESOLVED")
        return {data:[...action.payload], status: "RESOLVED"}
    if (action.type === "CHART_DATA_ERROR")
        return {data: state.chart, status: "ERROR"}       
    return state
}

export default chartDataReducer