const tableHeadReducer = (state, action) => {
    if (state === undefined) {
        return {
            meal: ["#", "Прием пищи", "Белки", "Жиры", "Углеводы", "Калории",  "Дата"],
            food: ["#", "Продукт", "Белки", "Жиры", "Углеводы", "Калории", "Порция"]
        }
    }
    return state
}

export default tableHeadReducer