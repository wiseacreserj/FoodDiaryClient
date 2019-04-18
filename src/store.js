import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import userReducer from "./reducers/userReducer";
import navReducer from "./reducers/navReducer";
import tableHeadReducer from "./reducers/tableHeadReducer"
import mealReducer from "./reducers/mealReducer"
import foodReducer from "./reducers/foodReducer"
import chartDataReducer from "./reducers/chartDataReducer"
import modalsStatusReducer from "./reducers/modalsStatusReducer"
import modalsDataReducer from "./reducers/modalsDataReducer"
import foodListReducer from './reducers/foodListReducer';



const reducers = combineReducers({
    user: userReducer,
    ui: combineReducers({
        nav: navReducer,
        thead: tableHeadReducer,
        modals: combineReducers({
          status: modalsStatusReducer,
          data: modalsDataReducer,
        }) 
    }),
   data: combineReducers({
        meal: mealReducer,
        food: foodReducer,
        chart: chartDataReducer,
        foodList: foodListReducer
   })
})

const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {}



const store = createStore(reducers,  persistedState, composeWithDevTools(applyMiddleware(thunk)) )

store.subscribe(()=>{
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
  })

export default store