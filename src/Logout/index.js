import React, { Component } from 'react'
import {withRouter} from "react-router-dom"

class Logout extends Component {
    render(){
        return(
            <div>
                <button onClick={this.props.handleLogout}>Logout</button>
            </div>
        )
    }
}

export default withRouter(Logout)