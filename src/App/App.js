import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Stitch, RemoteMongoClient } from "mongodb-stitch-browser-sdk";
import './App.css';
import Home from './pages/Home';
import List from './pages/List';
import Registration from "./pages/Registration";
import NewPost from "./pages/NewPost";
import PostStream from "./pages/PostStream";

const APP_ID = "gather-your-party-qnzcm";
export const STITCH_CLIENT = Stitch.initializeDefaultAppClient(APP_ID);
export const MDB = STITCH_CLIENT.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas');

class App extends Component {
  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/list' component={List}/>
          <Route path="/register" component={Registration}/>
          <Route path="/new-post" component={NewPost}/>
          <Route path="/posts" component={PostStream}/>
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
