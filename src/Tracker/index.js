import React, { Component } from 'react'
import {withRouter, Link} from "react-router-dom"
import "./tracker.css"

class Tracker extends Component{

    render(){
        const items = this.props.userItems.map((item, i) => {
            return(
                <div className="tracker-line" key={i}>
                    <div className="info-container">
                        <div className={`item ${item.class}`}>
                            {item.item}
                        </div>                
                        <div className="expiration">
                            {item.expiration}
                        </div>
                        <div className="days">
                            {item.days}
                        </div>
                        <button className="remove-button" value={i} onClick={this.props.deleteItem}>Remove</button>
                    </div>
                </div>
            )
        })
        return(
            <div id="tracker-container">
                {
                    this.props.isLoggedIn
                    ?
                    <div id="tracker-background-layer">
                        <div className="header">
                            Expiration Tracker
                        </div>
                        <div className="tracker-input">
                            <form>
                                <input placeholder="Item" name="addItem" onChange={this.props.handleChange} value={this.props.addItem} className="tracker-add" maxlength="40"></input>
                                <input placeholder="Expiration" name="addDate" onChange={this.props.handleChange} type="date" value={this.props.addDate} className="tracker-add"></input>
                                <button onClick={this.props.handleAddItem} id="add-button">Add</button>
                            </form>
                        </div>
                        <div className="header-container">
                            <div className="tracker-headers">
                                <div id="item-header">
                                    Item
                                </div>
                                <div id="expiration-header">
                                    Expiration Date
                                </div>
                                <div id="days-header">
                                    Days Left
                                </div>
                            </div>
                        </div>
                        {items}
                    </div>
                    :
                    <div id="not-logged">
                        <div id="not-logged-text">
                            Please <Link to="/">Log In</Link>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default withRouter(Tracker)