import React, { Component } from 'react'
import {withRouter} from "react-router-dom"
import "./logout.css"

class Logout extends Component {
    render(){
        return(
            <div id="logout-container">
                <button onClick={this.props.handleLogout}id="logout-button">Logout</button>
            </div>
        )
    }
}

export default withRouter(Logout)