const modalsStatusReducer = (state, action) => {
    if (state === undefined || action.type === "MODALS_STATUS_DEFAULT"){
        return {modal: { editMealModal: false, addMealModal: false }}
    }
    if (action.type === "EDIT_MEAL_MODAL_SHOW"){
        return {modal: {...state.modal, editMealModal: true}}
    }
    if (action.type === "EDIT_MEAL_MODAL_HIDE"){
        return {modal: {...state.modal, editMealModal: false}}
    }
    if (action.type === "ADD_MEAL_MODAL_SHOW"){
        return {modal: {...state.modal, addMealModal: true}}
    }
    if (action.type === "ADD_MEAL_MODAL_HIDE"){
        return {modal: {...state.modal, addMealModal: false}}
    }
    return state
}

export default modalsStatusReducer