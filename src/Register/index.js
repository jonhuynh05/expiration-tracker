import React, { Component } from 'react'
import {withRouter, Link} from "react-router-dom"

class Register extends Component {
    render(){
        return(
            <div>
                <div>Register</div>
                <form>
                    <input placeholder="First Name" name="firstName" onChange={this.props.handleChange}></input>
                    <input placeholder="Last Name" name="lastName" onChange={this.props.handleChange}></input>
                    <input placeholder="Email" name="email" onChange={this.props.handleChange}></input>
                    <input placeholder="Password" name="password" onChange={this.props.handleChange}></input>
                    <button type="submit" onClick={this.props.handleRegister}>Register</button>
                </form>
            </div> 
        )
    }
}

export default withRouter(Register)