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
                    <div className="item">
                        {item.item}
                    </div>                
                    <div className="expiration">
                        {item.expiration}
                    </div>
                    {/* <input type="date" value={item.expiration} disabled></input> */}
                    <button value={i} onClick={this.props.deleteItem}>Remove</button>
                </div>
            )
        })
        return(
            <div>
                <div className="header">
                    Expiration Tracker
                </div>
                <div>
                    welcome userid: {this.props.userId}
                </div>
                <div className="tracker-input">
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