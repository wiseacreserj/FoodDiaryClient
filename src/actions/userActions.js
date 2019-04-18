import url from "../config"
import { setNavAdmin, setNavUser, setNavDefault } from "./navActions"
import {mealsDefault} from "./mealActions"
import {modalsDefault} from "./modalActions"
import {modalsDataDefault} from "./modalDataActions"
import { chartDefault } from "./chartDataActions";

let userLoginPending = () => ({ type: "USER_LOGIN_PENDING" })
let userLogoutPending = () => ({ type: "USER_LOGOUT_PENDING" })
let userLogin = (user) => ({ type: "USER_LOGIN", payload: user })
let userLogout = () => ({ type: "USER_LOGOUT" })
let userRejected = () => ({ type: "USER_REJECTED" })

let login = (login, password) =>
    async dispatch => {
        dispatch(userLoginPending())
        try {
            let result = await fetch(`${url}login`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ login: login, password: password })
            }).then(r => r.json())
            await dispatch(userLogin(result))
            if (result.role === "user"){
                await dispatch(setNavUser())
            } else {
                await dispatch(setNavAdmin())
            }
            


        }
        catch (e) {
            dispatch(userRejected())
        }
    }

let logout = () =>
    async dispatch => {
    
        await dispatch(userLogoutPending())
        try {

            await fetch(`${url}logout`).then(r => r.json())
            await dispatch(userLogout())
            await dispatch(setNavDefault())
            await dispatch(mealsDefault())
            await dispatch(modalsDefault())
            await dispatch(modalsDataDefault())
            await dispatch(chartDefault())
           await localStorage.clear() 
        } catch (e) {
           
        }
    }

export { login, logout, userLogin, userLogout }