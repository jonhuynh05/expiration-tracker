import React, { Component } from 'react'
import {withRouter} from "react-router-dom"
import "./tracker.css"

class Tracker extends Component{
    render(){
        const items = this.props.userItems.map((item, i) => {
            return(
                <div className="tracker-line" key={i}>
                    <div>
                        {item.item}
                    </div>                
                    <div>
                        {item.expiration}
                    </div>
                    <button onClick={this.props.deleteItem}>Remove</button>
                </div>
            )
        })
        return(
            <div>
                <div className="header">
                    When's My Stuff Expiring?
                </div>
                <div>
                    welcome userid: {this.props.userId}
                </div>
                <div className="tracker-line">
                    <form>
                        <input placeholder="Item" name="addItem" onChange={this.props.handleChange}></input>
                        <input placeholder="Expiration" name="addDate" onChange={this.props.handleChange} type="date"></input>
                        <button onClick={this.props.handleAddItem}>Add</button>
                    </form>
                </div>
                <div>
                    {items}
                </div>
            </div>
        )
    }
}

export default withRouter(Tracker)