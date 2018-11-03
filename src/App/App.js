import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Stitch } from "mongodb-stitch-browser-sdk";
import './App.css';
import Home from './pages/Home';
import List from './pages/List';
import Registration from "./pages/Registration"

const APP_ID = "gather-your-party-qnzcm";
export const STITCH_CLIENT = Stitch.initializeDefaultAppClient(APP_ID);

class App extends Component {
  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/list' component={List}/>
          <Route path="/register" component={Registration}/>
        </Switch>
      </div>
    )
    return (
      <Switch>
        <App/>
      </Switch>
    );
  }
}

export default App;
