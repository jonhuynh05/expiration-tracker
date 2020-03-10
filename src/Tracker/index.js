import React, { Component } from 'react'
import {withRouter} from "react-router-dom"
import "./tracker.css"

class Tracker extends Component{
    render(){
        return(
            <div>
                <div className="header">
                    When's My Stuff Expiring?
                </div>
                <div className="tracker-line">
                    <form>
                        <input placeholder="Item" name="itemName"></input>
                        <input placeholder="Expiration" name="expiration" type="date"></input>
                        <button>Add</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(Tracker)