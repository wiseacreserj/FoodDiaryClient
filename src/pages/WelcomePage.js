import React, { Component } from 'react';
import Navigation from "../components/Navigation"


class WelcomePage extends Component  {

        render(){
            return (
                <div className="page-container">
                    <Navigation history={this.props.history}/>
                
                    <div className="welcome-page-content">
                    <h1>Добро пожаловать! </h1>
                    </div>

                </div>
            )
        }
        r
    
}

export default WelcomePage