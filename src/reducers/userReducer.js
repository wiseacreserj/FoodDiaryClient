const userReducer = (state, action) => {
    if (state === undefined) {
        return { user: {},status: "anonymous" } 
    }
    if (action.type === "USER_LOGIN") {
        return {
            user: action.payload,
            status: "logged_in", 
        }
    }
    if (action.type === "USER_LOGOUT") {
        return { 
            user: {},
            status: "anonymous" }
    } 

    if (action.type === "USER_REJECTED"){
        return {
            user: {},
            status: "rejected"
        }
    }

    return state
}

export default userReducer