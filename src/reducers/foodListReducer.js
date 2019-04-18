const foodListReducer  = (state, action) => {
    if (state === undefined || action.type === "FOOD_LIST_DEFAULT" ) 
        return {foodList: [], status: "DEFAULT"}
    if (action.type === "FOOD_LIST_PENDING" )
        return {foodList:state.foodList, status: "PENDING"}
    if (action.type === "FOOD_LIST_RESOLVED")
        return {foodList:[...action.payload], status: "RESOLVED"}
    if (action.type === "FOOD_LIST_ERROR")
        return {data: state.chart, status: "ERROR"}       
    return state
}

export default foodListReducer