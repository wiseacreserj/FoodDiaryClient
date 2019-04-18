

let foodsDefault = () => ({ type: "FOODS_DEFAULT" })
let foodsResolved = foods => ({ type: "FOODS_RESOLVED", payload: foods })



export {foodsResolved,  foodsDefault, }