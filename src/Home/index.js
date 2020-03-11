import React, { Component } from 'react'
import {withRouter, Link} from "react-router-dom"

class Home extends Component {
    render(){
        return(
            <div>
                <div>Is Your Food Expired?</div>
                <div>Login</div>
                <form>
                    <input placeholder="Email" name="email" onChange={this.props.handleChange}></input>
                    <input placeholder="Password" name="password" onChange={this.props.handleChange}></input>
                    <button type="submit" onClick={this.props.handleLogin}>Login</button>
                </form>
                {this.props.loginError}
                <div>Don't have an account? <Link to="/register">Register</Link></div>
            </div>
        )
    }
}

export default withRouter(Home)