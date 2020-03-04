import React, { Component } from 'react'
import {withRouter} from "react-router-dom"

class Home extends Component {
    render(){
        return(
            <div>
                this is the home page
            </div>
        )
    }
}

export default withRouter(Home)