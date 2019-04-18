const mealReducer  = (state, action) => {
    if (state === undefined || action.type === "MEALS_DEFAULT" ) 
        return {meals: [], status: "DEFAULT"}
    if (action.type === "MEALS_PENDING" )
        return {meals:state.meals, status: "PENDING"}
    if (action.type === "MEALS_RESOLVED")
        return {meals:[...action.payload], status: "RESOLVED"}
    if (action.type === "MEALS_ERROR")
        return {meals: state.meals, status: "ERROR"}       
    return state
}

export default mealReducer


