import React, { Component } from 'react'
import {withRouter} from "react-router-dom"
import "./register.css"

class Register extends Component {
    render(){
        return(
            <div id="register-container">
                <div id="register-background-layer">
                    <div id="register-information">
                        <div id="register-header">Register</div>
                        <form>
                            <input placeholder="First Name" name="firstName" onChange={this.props.handleChange}></input><br/>
                            <input placeholder="Last Name" name="lastName" onChange={this.props.handleChange}></input><br/>
                            <input placeholder="Email" name="email" onChange={this.props.handleChange}></input><br/>
                            <input placeholder="Password" name="password" type="password" onChange={this.props.handleChange}></input><br/>
                            <button type="submit" onClick={this.props.handleRegister} id="register-button">Register</button>
                        </form>
                        {this.props.registerError}
                    </div>
                </div>
            </div> 
        )
    }
}

export default withRouter(Register)