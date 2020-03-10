import React, { Component } from 'react'
import {withRouter, Link} from "react-router-dom"

class Register extends Component {
    render(){
        return(
            <div>
                <div>Register</div>
                <form>
                    <input placeholder="First Name"></input>
                    <input placeholder="Last Name"></input>
                    <input placeholder="Email"></input>
                    <input placeholder="Password"></input>
                    <button type="submit">Register</button>
                </form>
            </div> 
        )
    }
}

export default withRouter(Register)