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
    loginError: "",
    userId: "5e680245c59ed90a3f69fc1b",
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

  async getTrackers() {
    try{
      const trackers = await (await fetch(`/user`)).json()
      this.setState({
        userItems: trackers
      })
    }
    catch(err){
      console.log(err)
    }
  }

  handleLogin = async (e) => {
    try{
      e.preventDefault()
      this.setState({
        loginError: ""
      })
      await fetch(`/user/login`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(this.state),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(async res => {
        const response = await res.json()
        if(response.firstName){
          this.setState({
            userId: response.userId,
            userItems: response.trackers
          })
          this.props.history.push(`${this.state.userId}/tracker`)
        }
        else{
          this.setState({
            loginError: response
          })
        }
      })
    }    
    catch(err){
      console.log(err)
    }
  }

  handleAddItem = async (e) => {
    e.preventDefault()
    await fetch(`/tracker/${this.state.userId}/new`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json"
      }
    })
    this.getTrackers()
  }

  deleteItem = async() => {
    try{
      console.log("delete item")
    }
    catch(err){
      console.log(err)
    }
  }

  render(){
    return(
      <div>
        <Switch>
          <Route exact path={"/"} render={() => <Home handleChange={this.handleChange} handleLogin={this.handleLogin} loginError={this.state.loginError}/>}/>
          <Route exact path={"/register"} render={() => <Register handleChange = {this.handleChange} handleRegister = {this.handleRegister} registerError={this.state.registerError}/>}/>
          <Route exact path={"/:userId/tracker"} render={() => <Tracker userId = {this.state.userId} handleChange = {this.handleChange} handleAddItem = {this.handleAddItem} addDate={this.state.addDate} addItem={this.state.addItem} handleAddItem={this.handleAddItem} userItems={this.state.userItems} deleteItem={this.deleteItem}/>}/>
        </Switch>
      </div>
    )
  }
}

export default withRouter(App);
