function  getCalories (caloriesByFood, portion) {
    return caloriesByFood / 100  * portion
}

function  getProtein (proteinByFood, portion) {
    return Number(proteinByFood) / 100  * portion
}

function  getFat (fatByFood, portion) {
    return fatByFood / 100  * portion
}

function  getCarbohydrate (carbohydrateByFood, portion) {
    return carbohydrateByFood / 100  * portion
}

export {getCalories, getProtein, getFat, getCarbohydrate}