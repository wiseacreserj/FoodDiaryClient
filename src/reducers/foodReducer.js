const foodReducer  = (state, action) => {
    if (state === undefined || action.type === "FOODS_DEFAULT" ) 
        return {foods: [], status: "DEFAULT"}
    if (action.type === "FOODS_PENDING" )
        return {foods:state.foods, status: "PENDING"}
    if (action.type === "FOODS_RESOLVED")
        return {foods:[...action.payload], status: "RESOLVED"}
    if (action.type === "FOODS_ERROR")
        return {foods: state.foods, status: "ERROR"}       
    return state
}

export default foodReducer