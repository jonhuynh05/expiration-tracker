import React, { Component } from 'react'
import {withRouter, Link} from "react-router-dom"
import "./home.css"

class Home extends Component {
    render(){
        return(
            <div id="home-container">
                {
                    this.props.isLoggedIn === false
                    ?
                    <>
                        <div id="site-name">Expiration Tracker</div>
                        {/* <div id="login">Login</div> */}
                        <form>
                            <input placeholder="Email" name="email" onChange={this.props.handleChange}></input>
                            <input placeholder="Password" name="password" type="password" onChange={this.props.handleChange}></input>
                            <button type="submit" onClick={this.props.handleLogin}id="login-button">Login</button>
                        </form>
                        {this.props.loginError}
                        <div id="register-link">Don't have an account? <Link to="/register">Register</Link></div>
                        </>
                    :
                    // this.props.history.push(`/${this.props.userId}/tracker`)
                    null
                }
            </div>
        )
    }
}

export default withRouter(Home)