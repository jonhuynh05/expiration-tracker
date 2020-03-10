import React, { Component } from 'react'
import {withRouter} from "react-router-dom"
import "./tracker.css"

class Tracker extends Component{
    render(){
        return(
            <div>
                this is the tracker
            </div>
        )
    }
}

export default withRouter(Tracker)