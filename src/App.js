import React, { Component } from 'react'
import {withRouter, Switch, Route} from "react-router-dom"
import Home from "./Home"
import Register from "./Register"
import Tracker from "./Tracker"
import Logout from "./Logout"

class App extends Component {
  state = {
    isLoggedIn: false,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    registerError: "",
    loginError: "",
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
      let now = new Date()
      let day = now.getDate()
      let month = now.getMonth() + 1
      if(month < 10){
        month = `0${month}`
      }
      let fullYear = now.getFullYear()
      let comparisonDate = []
      comparisonDate.push(fullYear, month, day)
      comparisonDate = Number(comparisonDate.join(""))
      const trackers = await (await fetch(`/user`)).json()
      for(let i = 0; i < trackers.length; i++){
        let expirationComparison
        expirationComparison = Number(trackers[i].expiration.split("-").join(""))
        let check
        check = comparisonDate - expirationComparison
        if(check < 0 && check > -3){
          trackers[i].class = "almost-expired"
        }
        else if (check >= 0){
          trackers[i].class = "expired"
        }
        else{
          trackers[i].class = "still-good"
        }
        let year = []
        for(let j = 5; j < 10; j++){
          year.push(trackers[i].expiration[j])
          if(j === 9){
            year.push("-")
          }
        }
        for (let k = 0; k < 4; k++){
          year.push(trackers[i].expiration[k])
        }
        year = year.join("")
        trackers[i].expiration = year
      }
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
            isLoggedIn: true
          })
          this.getTrackers()
          // for(let i = 0; i < this.state.userItems.length; i++){
          //   let year = []
          //   for(let j = 5; j < 10; j++){
          //     year.push(this.state.userItems[i].expiration[j])
          //     if(j === 9){
          //       year.push("-")
          //     }
          //   }
          //   for (let k = 0; k < 4; k++){
          //     year.push(this.state.userItems[i].expiration[k])
          //   }
          //   year = year.join("")
          //   response.trackers[i].expiration = year
          // }
          // this.setState({
          //   userItems: response.trackers
          // })
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

  handleLogout = async () => {
    await fetch(`/user/logout`)
    .then(async res => {
      this.setState({
        isLoggedIn: false
      })
      this.props.history.push(`/`)
    })
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
    this.setState({
      addItem: "",
      addDate: ""
    })
    this.getTrackers()
  }

  deleteItem = async(e) => {
    try{
      console.log(e.currentTarget.value)
      await fetch(`/tracker/${this.state.userId}/delete`, {
        method: "DELETE",
        credentials: "include",
        body: JSON.stringify(this.state.userItems[e.currentTarget.value]),
        headers:{
          "Content-Type": "application/json"
        }
      })
      .then(async res => {
        this.getTrackers()
      })
    }
    catch(err){
      console.log(err)
    }
  }

  render(){
    return(
      <div>
        <Switch>
          <Route exact path={"/"} render={() => <Home handleChange={this.handleChange} handleLogin={this.handleLogin} handleLogout={this.handleLogout} loginError={this.state.loginError} isLoggedIn={this.state.isLoggedIn} userId={this.state.userId}/>}/>
          <Route exact path={"/register"} render={() => <Register handleChange = {this.handleChange} handleRegister = {this.handleRegister} registerError={this.state.registerError}/>}/>
          <Route exact path={"/:userId/tracker"} render={() => <Tracker userId = {this.state.userId} handleChange = {this.handleChange} handleAddItem = {this.handleAddItem} addDate={this.state.addDate} addItem={this.state.addItem} handleAddItem={this.handleAddItem} userItems={this.state.userItems} deleteItem={this.deleteItem} isLoggedIn={this.state.isLoggedIn}/>}/>
        </Switch>
        {
          this.state.isLoggedIn === false
          ?
          null
          :
          <Logout handleLogout={this.handleLogout}/>
        }
      </div>
    )
  }
}

export default withRouter(App);
