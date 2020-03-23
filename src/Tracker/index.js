import React, { Component } from 'react'
import {withRouter} from "react-router-dom"
import "./tracker.css"

class Tracker extends Component{
    // async componentDidMount() {
    //     for(let i = 0; i < this.props.userItems.length; i++){
    //         console.log(this.props.userItems)
    //     }
    // }
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
                        <button className="remove-button" value={i} onClick={this.props.deleteItem}>Remove</button>
                    </div>
                </div>
            )
        })
        return(
            <div id="tracker-container">
                <div className="header">
                    Expiration Tracker
                </div>
                <div className="tracker-input">
                    <form>
                        <input placeholder="Item" name="addItem" onChange={this.props.handleChange} value={this.props.addItem}></input>
                        <input placeholder="Expiration" name="addDate" onChange={this.props.handleChange} type="date" value={this.props.addDate}></input>
                        <button onClick={this.props.handleAddItem}>Add</button>
                    </form>
                </div>
                {items}
            </div>
        )
    }
}

export default withRouter(Tracker)