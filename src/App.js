import React, { Component } from 'react'
import {withRouter, Switch, Route} from "react-router-dom"
import Home from "./Home"
import Register from "./Register"
import Tracker from "./Tracker"

class App extends Component {
  state = {
    isLoggedIn: false,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    registerError: "",
    userId: "",
    addItem: "",
    addDate: "",
    userItems: []
  }

  handleChange = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  handleRegister = async (e) => {
    try{
      e.preventDefault()
      this.setState({
        registerError: ""
      })
      await fetch(`/user/register`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(this.state),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(async res => {
        const response = await res.json()
        console.log(response, "this is the repsonse from the server")
        if(response.message === "Success."){
          this.setState({
            registerError: "",
            userId: response.userId
          })
          this.props.history.push(`${this.state.userId}/tracker`)
        }
        else{
          this.setState({
            registerError: response.message
          })
        }
      })
    }
    catch(err){
      console.log(err)
    }
  }

  handleAddItem = async (e) => {

  }

  render(){
    return(
      <div>
        <Switch>
          <Route exact path={"/"} render={() => <Home/>}/>
          <Route exact path={"/register"} render={() => <Register handleChange = {this.handleChange} handleRegister = {this.handleRegister} registerError={this.state.registerError}/>}/>
          <Route exact path={"/:userId/tracker"} render={() => <Tracker userId = {this.state.userId} handleChange = {this.handleChange} handleAddItem = {this.handleAddItem} addDate={this.state.addDate} addItem={this.state.addItem}/>}/>
        </Switch>
      </div>
    )
  }
}

export default withRouter(App);
