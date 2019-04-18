import url from "../config"



let foodListDefault = () => ({ type: "FOOD_LIST_DEFAULT" })
let foodListPending = () => ({ type: "FOOD_LIST_PENDING" })
let foodListResolved = chartData => ({ type: "FOOD_LIST_RESOLVED", payload: chartData})
let foodListError = () => ({ type: "FOOD_LIST_ERROR" })


let getFoodListData = (category="all", sort="name") =>
    async dispatch => {
        await dispatch(foodListPending())
        try {
            let result = await fetch(`${url}foods?category=${category}&sort=${sort}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(r => r.json())
            await dispatch(foodListResolved(result))
        } catch (e) {
            await dispatch(foodListError())
        }
    }

  

export { getFoodListData, foodListDefault }