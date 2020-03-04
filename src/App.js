import React, { Component } from 'react'
import {withRouter, Switch, Route} from "react-router-dom"
import Home from "./Home"
import Register from "./Register"

class App extends Component {
  render(){
    return(
      <div>
        <Switch>
          <Route exact path={"/"} render={() => <Home/>}/>
          <Route exact path={"/register"} render={() => <Register/>}/>
        </Switch>
      </div>
    )
  }
}

export default withRouter(App);
