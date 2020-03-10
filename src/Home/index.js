import React, { Component } from 'react'
import {withRouter, Link} from "react-router-dom"

class Home extends Component {
    render(){
        return(
            <div>
                <div>Is Your Food Expired?</div>
                <div>Login</div>
                <form>
                    <input placeholder="Email"></input>
                    <input placeholder="Password"></input>
                    <button type="submit">Login</button>
                </form>
                <div>Don't have an account? <Link to="/register">Register</Link></div>
            </div>
        )
    }
}

export default withRouter(Home)