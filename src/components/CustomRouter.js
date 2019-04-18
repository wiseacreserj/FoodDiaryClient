import React, { Component } from 'react';
import { Router, Route, } from 'react-router-dom';
import PrivateRoute from "react-private-route"
import { connect } from 'react-redux';
import WelcomePage from "../pages/WelcomePage"
import LoginPage from "../pages/LoginPage"
import DietPage from '../pages/DietPage.js';
import RegistrationPage  from "../pages/RegistrationPage"
import ProfilePage from "../pages/ProfilePage"
import FoodListPage from '../pages/FoodListPage';

class CustomRouter extends Component {
 
    
    render(){
       
        return(

            <Router history={this.props.history}>
            <div>
              <Route path="/registration" component={RegistrationPage} exact />
              <PrivateRoute path="/profile" component={ProfilePage} isAuthenticated={this.props.status === "logged_in"}  redirect="/login"  exact />
              <Route path="/login" component={LoginPage} exact />
              <PrivateRoute path="/diet" component={DietPage} exact  isAuthenticated={this.props.status === "logged_in"}  redirect="/login" />
              <PrivateRoute path="/food" component={FoodListPage} isAuthenticated={this.props.status === "logged_in"}  redirect="/login" exact />
              <Route path="/" component={WelcomePage} exact />
            </div>
        </Router>
           
        )
    }
}

let mapStateToProps = state => ({user: state.user.user, status: state.user.status})
let ConnectedACustomRouter = connect(mapStateToProps)(CustomRouter)

export default ConnectedACustomRouter