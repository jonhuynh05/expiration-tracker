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
    username: "",
    email: "",
    password: ""
  }
  render(){
    return(
      <div>
        <Switch>
          <Route exact path={"/"} render={() => <Home/>}/>
          <Route exact path={"/register"} render={() => <Register/>}/>
          <Route exact path={"/tracker"} render={() => <Tracker/>}/>
        </Switch>
      </div>
    )
  }
}

export default withRouter(App);
