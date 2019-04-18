import url from "../config"


let mealsDefault = () => ({ type: "MEALS_DEFAULT" })
let mealsPending = () => ({ type: "MEALS_PENDING" })
let mealsResolved = meals => ({ type: "MEALS_RESOLVED", payload: meals })
let mealsError = () => ({ type: "MEALS_ERROR" })


let getMeals = (rangeFrom, rangeTo) =>
    async dispatch => {
        
        await dispatch(mealsPending())
        try {
            let result = await fetch(`${url}meal?rangeFrom=${rangeFrom}&rangeTo=${rangeTo}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(r => r.json())
            await dispatch(mealsResolved(result))
           
        } catch (e) {
            await dispatch(mealsError())
        }
    }


export { getMeals, mealsDefault }