const modalsDataReducer = (state, action) => {
    if (state === undefined || action.type === "MODALS_DATA_DEFAULT") {
        return {
            editModalState: {
                initData: {food:[{foodId:0, name: "", meal_food:{portion:0}}]}
            }
        }
    }
    if (action.type === "SET_EDIT_MODAL_STATE") {
        return {
            editModalState: { ...state.editModalState, initData:action.payload }
        }
    }
    return state
}

export default modalsDataReducer