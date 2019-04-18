import React, { Component } from 'react';
import Navigation from "../components/Navigation"
import LoginForm from "../components/LoginForm"

class LoginPage extends Component {
  
    
    
    render() {
        return ( 
            <div>
            <Navigation history={this.props.history} />
                <LoginForm history={this.props.history} />
            </div>                        
        )
    }
}

export default LoginPage