let modalsDataDefault = () => ({ type: "MODALS_DATA_DEFAULT" })
let setEditModalState = (meal) =>({type: "SET_EDIT_MODAL_STATE", payload:meal}) 

let initEditMealModal = (meal) =>
    async dispatch => {
       await  dispatch(setEditModalState(meal))
    }

export {modalsDataDefault, initEditMealModal}